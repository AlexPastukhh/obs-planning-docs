importScripts("bridge-client.js");
let inventoryPromise = null, lastInventoryAt = 0;
const CONTENT_READY_TIMEOUT_MS = 8000;
const CONTENT_READY_POLL_MS = 150;
const PAYLOAD_CHUNK_BYTES = 512 * 1024;

function ordinaryConversation(urlString) {
  try {
    const url = new URL(urlString);
    if (url.origin !== "https://chatgpt.com") return null;
    const match = url.pathname.match(/^\/c\/([A-Za-z0-9_-]{8,})\/?$/);
    return match ? {conversationKey: match[1], url: `https://chatgpt.com/c/${match[1]}`} : null;
  } catch { return null; }
}
function cleanTitle(title, key) {
  const value = String(title || "").replace(/\s*[|–—-]\s*ChatGPT\s*$/i, "").trim();
  return value || `Chat ${key.slice(0, 8)}`;
}
function errorMessage(error) { return error instanceof Error ? error.message : String(error); }
async function recordDiagnostic(context, error) {
  const message = errorMessage(error);
  console.warn(`[OBS ChatGPT Bridge] ${context}: ${message}`, error);
  try { await chrome.storage.local.set({lastBridgeDiagnostic: {at: new Date().toISOString(), context, message}}); } catch (storageError) { console.warn("[OBS ChatGPT Bridge] Cannot persist diagnostic", storageError); }
}
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
async function chatTabs() { return chrome.tabs.query({url: "https://chatgpt.com/*"}); }
async function buildInventory(tabs) {
  const grouped = new Map();
  for (const tab of tabs) {
    if (typeof tab.id !== "number") continue;
    const c = ordinaryConversation(tab.url || ""); if (!c) continue;
    let item = grouped.get(c.conversationKey);
    if (!item) { item = {conversationKey: c.conversationKey, title: cleanTitle(tab.title, c.conversationKey), url: c.url, tabIds: []}; grouped.set(c.conversationKey, item); }
    item.tabIds.push(tab.id);
    const candidate = cleanTitle(tab.title, c.conversationKey); if (candidate && candidate !== "ChatGPT") item.title = candidate;
  }
  return [...grouped.values()];
}
async function pingContentScript(tabId) {
  try { const r = await chrome.tabs.sendMessage(tabId, {type: "OBS_PING"}); return r?.ok === true; }
  catch { return false; }
}
async function ensureContentScript(tabId) {
  const deadline = Date.now() + CONTENT_READY_TIMEOUT_MS;
  let lastInjectionError = null;
  while (Date.now() < deadline) {
    if (await pingContentScript(tabId)) return true;
    try {
      await chrome.scripting.executeScript({target: {tabId}, files: ["src/chatgpt-adapter.js", "src/content.js"]});
      lastInjectionError = null;
    } catch (error) {
      lastInjectionError = error;
    }
    if (await pingContentScript(tabId)) return true;
    await sleep(Math.min(CONTENT_READY_POLL_MS, Math.max(0, deadline - Date.now())));
  }
  const suffix = lastInjectionError ? ` Last injection error: ${errorMessage(lastInjectionError)}` : "";
  throw new Error(`Content script did not become ready for tab ${tabId}.${suffix}`);
}
async function taskRequest(taskId, action, tabId, conversationKey, extra = {}) {
  return OBSBridgeClient.request(`/v1/tasks/${encodeURIComponent(taskId)}/${action}`, {method: "POST", body: JSON.stringify({tabId, conversationKey, ...extra})});
}
async function claimForTab(tabId, conversationKey) {
  const result = await OBSBridgeClient.request("/v1/tasks/claim", {method: "POST", body: JSON.stringify({tabId, conversationKey})});
  if (!result.task) return false;
  try {
    const response = await chrome.tabs.sendMessage(tabId, {type: "OBS_TASK", task: result.task});
    if (response?.ok !== true) throw new Error(response?.error || "Content script rejected the claimed task.");
    return true;
  } catch (error) {
    try { await taskRequest(result.task.taskId, "release", tabId, conversationKey, {message: `Claim delivery to ChatGPT tab failed before preparation: ${errorMessage(error)}`}); }
    catch (releaseError) { await recordDiagnostic(`Cannot release task ${result.task.taskId} after tab delivery failure`, releaseError); }
    throw error;
  }
}
async function readyAndClaim(tab) {
  if (typeof tab.id !== "number") return;
  const c = ordinaryConversation(tab.url || ""); if (!c) return;
  try { await ensureContentScript(tab.id); await claimForTab(tab.id, c.conversationKey); }
  catch (error) { await recordDiagnostic(`Tab ${tab.id} readiness/claim`, error); }
}
async function syncInventory(force = false) {
  const now = Date.now(); if (!force && now - lastInventoryAt < 900) return; if (inventoryPromise) return inventoryPromise;
  inventoryPromise = (async () => {
    const tabs = await chatTabs(), conversations = await buildInventory(tabs);
    await OBSBridgeClient.request("/v1/inventory", {method: "POST", body: JSON.stringify({conversations})});
    lastInventoryAt = Date.now();
    await Promise.all(tabs.map(readyAndClaim));
  })().catch(async error => { await recordDiagnostic("Inventory sync", error); throw error; }).finally(() => { inventoryPromise = null; });
  return inventoryPromise;
}

function validPayloadUrl(value, taskId) {
  try {
    const url = new URL(String(value || ""));
    return url.origin === OBSBridgeClient.BASE && url.pathname === `/v1/tasks/${taskId}/payload` && url.searchParams.has("ticket");
  } catch { return false; }
}
async function sha256Hex(bytes) {
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, "0")).join("");
}
function bytesToBase64(bytes) {
  let binary = "";
  const block = 0x8000;
  for (let i = 0; i < bytes.length; i += block) binary += String.fromCharCode(...bytes.subarray(i, Math.min(bytes.length, i + block)));
  return btoa(binary);
}
async function streamVerifiedPayload(port, task) {
  const senderTab = port.sender?.tab;
  const c = ordinaryConversation(senderTab?.url || "");
  if (!c || c.conversationKey !== task?.conversationKey) throw new Error("Payload stream request came from the wrong ChatGPT conversation.");
  if (typeof task?.taskId !== "string" || !validPayloadUrl(task.payloadUrl, task.taskId)) throw new Error("Invalid loopback payload URL.");
  const response = await fetch(task.payloadUrl, {cache: "no-store"});
  if (!response.ok) throw new Error(`Artifact fetch failed: HTTP ${response.status}`);
  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  if (bytes.byteLength !== Number(task.artifactSize)) throw new Error("Artifact size changed during delivery.");
  const sha = await sha256Hex(buffer);
  if (sha.toLowerCase() !== String(task.artifactSha256 || "").toLowerCase()) throw new Error("Artifact changed during delivery.");
  port.postMessage({type: "META", size: bytes.byteLength});
  for (let offset = 0; offset < bytes.length; offset += PAYLOAD_CHUNK_BYTES) {
    const chunk = bytes.subarray(offset, Math.min(bytes.length, offset + PAYLOAD_CHUNK_BYTES));
    port.postMessage({type: "CHUNK", offset, data: bytesToBase64(chunk)});
  }
  port.postMessage({type: "DONE"});
}

chrome.runtime.onConnect.addListener(port => {
  if (port.name !== "OBS_PAYLOAD_STREAM") return;
  let started = false;
  port.onMessage.addListener(message => {
    if (started || message?.type !== "START") return;
    started = true;
    streamVerifiedPayload(port, message.task).catch(async error => {
      await recordDiagnostic(`Payload stream ${message?.task?.taskId || "unknown"}`, error);
      try { port.postMessage({type: "ERROR", error: errorMessage(error)}); } catch {}
    });
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = sender.tab?.id, c = ordinaryConversation(sender.tab?.url || "");
  if (message?.type === "OBS_HEARTBEAT" && typeof tabId === "number" && c && c.conversationKey === message.conversationKey) {
    syncInventory().then(() => sendResponse({ok: true})).catch(e => sendResponse({ok: false, error: errorMessage(e)})); return true;
  }
  if (message?.type === "OBS_TASK_HEARTBEAT" && typeof tabId === "number" && c) {
    taskRequest(message.taskId, "heartbeat", tabId, c.conversationKey).then(r => sendResponse({ok: true, status: r.status})).catch(e => sendResponse({ok: false, error: errorMessage(e)})); return true;
  }
  if (message?.type === "OBS_TASK_STAGE" && typeof tabId === "number" && c) {
    taskRequest(message.taskId, "stage", tabId, c.conversationKey, {stage: message.stage}).then(() => sendResponse({ok: true})).catch(e => sendResponse({ok: false, error: errorMessage(e)})); return true;
  }
  if (message?.type === "OBS_TASK_RESULT" && typeof tabId === "number" && c) {
    taskRequest(message.taskId, "result", tabId, c.conversationKey, {status: message.status, message: message.message || ""}).then(() => sendResponse({ok: true})).catch(e => sendResponse({ok: false, error: errorMessage(e)})); return true;
  }
  if (message?.type === "OBS_TASK_RELEASE" && typeof tabId === "number") {
    const key = c?.conversationKey || message.conversationKey || "";
    taskRequest(message.taskId, "release", tabId, key, {message: message.message || ""}).then(r => sendResponse({ok: true, status: r.status})).catch(e => sendResponse({ok: false, error: errorMessage(e)})); return true;
  }
  if (message?.type === "OBS_SYNC_NOW") { syncInventory(true).then(() => sendResponse({ok: true})).catch(e => sendResponse({ok: false, error: errorMessage(e)})); return true; }
});

chrome.tabs.onRemoved.addListener(tabId => {
  OBSBridgeClient.request("/v1/tabs/release", {method: "POST", body: JSON.stringify({tabId, message: "Claimed ChatGPT tab was closed."})}).catch(error => recordDiagnostic(`Release closed tab ${tabId}`, error));
  void syncInventory(true).catch(() => {});
});
chrome.tabs.onUpdated.addListener(() => { void syncInventory(true).catch(() => {}); });
chrome.tabs.onCreated.addListener(() => { void syncInventory(true).catch(() => {}); });
chrome.runtime.onStartup.addListener(() => { OBSBridgeClient.restrictStorage().catch(error => recordDiagnostic("Restrict storage on startup", error)); void syncInventory(true).catch(() => {}); });
chrome.runtime.onInstalled.addListener(() => {
  OBSBridgeClient.restrictStorage().catch(error => recordDiagnostic("Restrict storage after install/reload", error));
  chrome.runtime.openOptionsPage().catch(error => recordDiagnostic("Open Options after install/reload", error));
  void syncInventory(true).catch(() => {});
});
chrome.action.onClicked.addListener(() => chrome.runtime.openOptionsPage());
OBSBridgeClient.restrictStorage().catch(error => recordDiagnostic("Restrict storage during service worker bootstrap", error));
void syncInventory(true).catch(() => {});
