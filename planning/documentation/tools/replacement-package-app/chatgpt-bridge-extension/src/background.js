importScripts("bridge-client.js");
let inventoryPromise = null, lastInventoryAt = 0;
const CONTENT_READY_TIMEOUT_MS = 8000;
const CONTENT_READY_POLL_MS = 150;
const PAYLOAD_CHUNK_BYTES = 512 * 1024;
const BRIDGE_PROTOCOL_VERSION = 5;
const RUNTIME_GENERATION_KEY = "obsBridgeRuntimeGeneration";
const agentInstances = new Map();
let runtimeGenerationPromise = null;
let contextLookupRevision = 0, contextLookupWaitPromise = null;
const rememberedContextLookups = new Map();

async function runtimeGeneration() {
  if (!runtimeGenerationPromise) runtimeGenerationPromise = (async () => {
    const current = await chrome.storage.session.get([RUNTIME_GENERATION_KEY]);
    let value = String(current[RUNTIME_GENERATION_KEY] || "");
    if (!/^[0-9a-f-]{36}$/i.test(value)) { value = crypto.randomUUID(); await chrome.storage.session.set({[RUNTIME_GENERATION_KEY]: value}); }
    return value;
  })();
  return runtimeGenerationPromise;
}
function validAgentInstanceId(value) { return typeof value === "string" && /^[0-9a-f-]{36}$/i.test(value); }
function acceptAgentInstance(tabId, agentInstanceId, replace = false) {
  if (!validAgentInstanceId(agentInstanceId)) return false;
  const current = agentInstances.get(tabId);
  if (replace || !current) { agentInstances.set(tabId, agentInstanceId); return true; }
  return current === agentInstanceId;
}
async function validateAgentEnvelope(message, tabId) {
  const generation = await runtimeGeneration();
  if (message?.runtimeGeneration !== generation) throw new Error("Stale ChatGPT bridge runtime generation.");
  if (!acceptAgentInstance(tabId, message?.agentInstanceId)) throw new Error("Stale ChatGPT bridge agent instance.");
  return generation;
}

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

function requireBridgeProtocol(value) {
  const got = Number(value);
  if (got !== BRIDGE_PROTOCOL_VERSION) throw new Error(`ChatGPT Bridge version mismatch. Replacement Package App protocol ${BRIDGE_PROTOCOL_VERSION} is required; restart/update the app and reload the extension.`);
  return got;
}
function validateClaimTask(task, conversationKey) {
  if (!task || typeof task !== "object") throw new Error("Invalid ChatGPT Bridge task contract.");
  requireBridgeProtocol(task.bridgeProtocolVersion);
  if (typeof task.taskId !== "string" || !/^[0-9a-f-]{36}$/i.test(task.taskId)) throw new Error("Invalid ChatGPT Bridge task id.");
  if (!['reviewDiff','snapshot'].includes(task.kind)) throw new Error("Unsupported ChatGPT Bridge task kind.");
  if (task.conversationKey !== conversationKey) throw new Error("ChatGPT Bridge task targets a different conversation.");
  if (typeof task.fileName !== "string" || !task.fileName.trim()) throw new Error("ChatGPT Bridge task filename is missing.");
  const size = Number(task.artifactSize);
  if (!Number.isSafeInteger(size) || size < 0) throw new Error("Invalid ChatGPT Bridge artifact size.");
  if (!/^[0-9a-f]{64}$/i.test(String(task.artifactSha256 || ""))) throw new Error("Invalid ChatGPT Bridge artifact fingerprint.");
  if (!validPayloadUrl(task.payloadUrl, task.taskId)) throw new Error("Invalid loopback payload URL.");
  if (typeof task.autoSend !== "boolean") throw new Error("Invalid attachment auto-send contract from Replacement Package App.");
  if (task.kind === "reviewDiff" && task.autoSend !== true) throw new Error("ReviewDiff task must request automatic Send.");
  if (task.autoSend) {
    const retryMs = Number(task.sendRetryIntervalMs);
    if (!Number.isSafeInteger(retryMs) || retryMs < 1000 || retryMs > 60000) throw new Error("Invalid attachment Send contract from Replacement Package App. Restart/update the app and reload the extension.");
  }
  return task;
}
function clickPreparedAttachmentSendMain(expectedConversation, fileName) {
  const match = location.pathname.match(/^\/c\/([A-Za-z0-9_-]{8,})\/?$/);
  if (!match || match[1] !== expectedConversation) return {status: "wrong-conversation"};
  const editor = document.querySelector("#prompt-textarea") || document.querySelector('div[contenteditable="true"][data-lexical-editor="true"]') || document.querySelector('div.ProseMirror[contenteditable="true"]') || document.querySelector('textarea[name="prompt-textarea"]');
  if (!editor) return {status: "composer-missing"};
  const root = editor.closest("form") || editor.parentElement?.parentElement?.parentElement || document.body;
  const editorValue = ("value" in editor && typeof editor.value === "string") ? editor.value : (editor.innerText ?? editor.textContent ?? "");
  if (String(editorValue).trim()) return {status: "composer-dirty"};
  const candidates = [...root.querySelectorAll('[data-testid*="attachment" i],[data-testid*="file-preview" i],[class*="attachment" i],[class*="file-preview" i],[aria-busy="true"][data-testid*="file" i]')].filter(n => !["INPUT","BUTTON"].includes(n.tagName) && n.getAttribute("role") !== "button");
  const rootText = root.innerText || root.textContent || "";
  const hasAttachment = rootText.includes(fileName) || candidates.some(n => ((n.innerText || n.textContent || "").includes(fileName)));
  if (!hasAttachment) return {status: "attachment-missing"};
  const isBusy = !!root.querySelector('[role="progressbar"],[aria-busy="true"],[data-state="loading"],[data-testid*="progress" i],[class*="upload" i][class*="progress" i]');
  if (isBusy) return {status: "not-ready"};
  let button = null;
  for (const selector of ['button[data-testid="send-button"]','button[data-testid*="send" i]','button[aria-label="Send prompt"]','button[aria-label^="Send" i]','button[aria-label^="Отправ" i]']) {
    button = root.querySelector(selector) || document.querySelector(selector);
    if (button) break;
  }
  if (!button || !button.isConnected || button.disabled || button.getAttribute("aria-disabled") === "true") return {status: "not-ready"};
  button.click();
  return {status: "clicked"};
}
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
  try {
    const generation = await runtimeGeneration();
    const r = await chrome.tabs.sendMessage(tabId, {type: "OBS_PING", runtimeGeneration: generation});
    if (r?.ok !== true || r.runtimeGeneration !== generation || !validAgentInstanceId(r.agentInstanceId)) return false;
    acceptAgentInstance(tabId, r.agentInstanceId, true);
    return true;
  } catch { return false; }
}
async function ensureContentScript(tabId) {
  const deadline = Date.now() + CONTENT_READY_TIMEOUT_MS;
  if (await pingContentScript(tabId)) return true;
  let injectionError = null;
  try {
    await chrome.scripting.executeScript({target: {tabId}, files: ["src/chatgpt-adapter.js", "src/content.js"]});
  } catch (error) {
    injectionError = error;
  }
  while (Date.now() < deadline) {
    if (await pingContentScript(tabId)) return true;
    await sleep(Math.min(CONTENT_READY_POLL_MS, Math.max(0, deadline - Date.now())));
  }
  const suffix = injectionError ? ` Injection error: ${errorMessage(injectionError)}` : "";
  throw new Error(`Content script did not become ready for tab ${tabId}.${suffix}`);
}
async function taskRequest(taskId, action, tabId, conversationKey, extra = {}) {
  return OBSBridgeClient.request(`/v1/tasks/${encodeURIComponent(taskId)}/${action}`, {method: "POST", body: JSON.stringify({tabId, conversationKey, ...extra})});
}
async function claimForTab(tabId, conversationKey) {
  const result = await OBSBridgeClient.request("/v1/tasks/claim", {method: "POST", body: JSON.stringify({bridgeProtocolVersion: BRIDGE_PROTOCOL_VERSION, tabId, conversationKey})});
  if (!result.task) return false;
  try {
    validateClaimTask(result.task, conversationKey);
  } catch (error) {
    try { await taskRequest(result.task.taskId, "result", tabId, conversationKey, {status: "FailedBeforeSend", message: errorMessage(error)}); }
    catch (resultError) { await recordDiagnostic(`Cannot record preflight failure for task ${result.task.taskId}`, resultError); }
    throw error;
  }
  try {
    const generation = await runtimeGeneration();
    const response = await chrome.tabs.sendMessage(tabId, {type: "OBS_TASK", runtimeGeneration: generation, task: result.task});
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
function replaceRememberedContextLookups(lookups) {
  rememberedContextLookups.clear();
  if (!Array.isArray(lookups)) return;
  for (const lookup of lookups) {
    const token = String(lookup?.chatContextToken || "");
    if (/^[0-9a-f-]{36}$/i.test(token)) rememberedContextLookups.set(token, lookup);
  }
}
async function resolveContextLookups(lookups, tabs) {
  if (!Array.isArray(lookups) || !lookups.length) return;
  const generation = await runtimeGeneration();
  for (const lookup of lookups) {
    const token = String(lookup?.chatContextToken || "");
    if (!/^[0-9a-f-]{36}$/i.test(token)) { rememberedContextLookups.delete(token); await recordDiagnostic("Context lookup contract", new Error("Invalid chatContextToken from Replacement Package App.")); continue; }
    const captures = [];
    for (const tab of tabs) {
      if (typeof tab.id !== "number") continue;
      try {
        await ensureContentScript(tab.id);
        const response = await chrome.tabs.sendMessage(tab.id, {type: "OBS_CHAT_CONTEXT_LOOKUP", runtimeGeneration: generation, chatContextToken: token});
        if (response?.ok === true && response.found === true && response.capture) captures.push(response.capture);
      } catch (error) { await recordDiagnostic(`Context lookup ${token.slice(0,8)} tab ${tab.id}`, error); }
    }
    const result = await OBSBridgeClient.request("/v1/chat-context/result", {method: "POST", body: JSON.stringify({bridgeProtocolVersion: BRIDGE_PROTOCOL_VERSION, chatContextToken: token, captures})});
    const status = String(result?.status || "");
    if (["Pending","WaitingAfterCutoff"].includes(status)) rememberedContextLookups.set(token, lookup); else rememberedContextLookups.delete(token);
  }
}
async function retryRememberedContextLookups() {
  if (!rememberedContextLookups.size) return;
  await resolveContextLookups([...rememberedContextLookups.values()], await chatTabs());
}
async function contextLookupWaitLoop() {
  for (;;) {
    try {
      const batch = await OBSBridgeClient.request("/v1/chat-context/wait", {method: "POST", body: JSON.stringify({bridgeProtocolVersion: BRIDGE_PROTOCOL_VERSION, afterRevision: contextLookupRevision, timeoutMs: 20000})});
      requireBridgeProtocol(batch.bridgeProtocolVersion);
      const revision = Number(batch.revision); if (!Number.isSafeInteger(revision) || revision < 0) throw new Error("Invalid chat-context lookup revision from Replacement Package App.");
      const previousRevision = contextLookupRevision;
      contextLookupRevision = revision;
      if (revision === previousRevision) continue;
      replaceRememberedContextLookups(batch.contextLookups || []);
      await retryRememberedContextLookups();
    } catch (error) {
      await recordDiagnostic("Chat-context request channel", error);
      await sleep(5000);
    }
  }
}
function ensureContextLookupWaitLoop() {
  if (!contextLookupWaitPromise) contextLookupWaitPromise = contextLookupWaitLoop().finally(() => { contextLookupWaitPromise = null; });
  return contextLookupWaitPromise;
}
async function syncInventory(force = false) {
  const now = Date.now(); if (!force && now - lastInventoryAt < 900) return; if (inventoryPromise) return inventoryPromise;
  inventoryPromise = (async () => {
    const tabs = await chatTabs(), conversations = await buildInventory(tabs);
    await OBSBridgeClient.request("/v1/inventory", {method: "POST", body: JSON.stringify({bridgeProtocolVersion: BRIDGE_PROTOCOL_VERSION, conversations})});
    lastInventoryAt = Date.now();
    await Promise.all(tabs.map(readyAndClaim));
  })().catch(async error => { await recordDiagnostic("Inventory sync", error); throw error; }).finally(() => { inventoryPromise = null; });
  return inventoryPromise;
}
async function syncInventoryAndRetryContext() { await syncInventory(true); await retryRememberedContextLookups(); }

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
    (async () => {
      const tabId = port.sender?.tab?.id;
      if (typeof tabId !== "number") throw new Error("Payload stream has no ChatGPT tab identity.");
      await validateAgentEnvelope(message, tabId);
      await streamVerifiedPayload(port, message.task);
    })().catch(async error => {
      await recordDiagnostic(`Payload stream ${message?.task?.taskId || "unknown"}`, error);
      try { port.postMessage({type: "ERROR", error: errorMessage(error)}); } catch {}
    });
  });
});

async function handleRuntimeMessage(message, sender) {
  const tabId = sender.tab?.id, c = ordinaryConversation(sender.tab?.url || "");
  if (message?.type === "OBS_SYNC_NOW") { await syncInventory(true); return {ok: true}; }
  if (message?.type === "OBS_AGENT_REGISTER") {
    const senderUrl = String(sender.tab?.url || "");
    if (typeof tabId !== "number" || !senderUrl.startsWith("https://chatgpt.com/")) throw new Error("ChatGPT bridge agent registration requires a chatgpt.com tab.");
    if (message.conversationKey && (!c || c.conversationKey !== message.conversationKey)) throw new Error("ChatGPT bridge agent registered from a different conversation.");
    if (!acceptAgentInstance(tabId, message.agentInstanceId, true)) throw new Error("Invalid ChatGPT bridge agent instance id.");
    return {ok: true, runtimeGeneration: await runtimeGeneration()};
  }
  if (typeof tabId !== "number") throw new Error("ChatGPT bridge message has no browser tab identity.");
  await validateAgentEnvelope(message, tabId);
  if (message?.type === "OBS_HEARTBEAT" && c && c.conversationKey === message.conversationKey) { await syncInventory(); return {ok: true}; }
  if (message?.type === "OBS_TASK_HEARTBEAT" && c) { const r = await taskRequest(message.taskId, "heartbeat", tabId, c.conversationKey); return {ok: true, status: r.status}; }
  if (message?.type === "OBS_TASK_STAGE" && c) { await taskRequest(message.taskId, "stage", tabId, c.conversationKey, {stage: message.stage}); return {ok: true}; }
  if (message?.type === "OBS_TASK_RESULT" && c) { await taskRequest(message.taskId, "result", tabId, c.conversationKey, {status: message.status, message: message.message || ""}); return {ok: true}; }
  if (message?.type === "OBS_TASK_RELEASE") {
    const key = c?.conversationKey || message.conversationKey || "";
    const r = await taskRequest(message.taskId, "release", tabId, key, {message: message.message || ""});
    return {ok: true, status: r.status};
  }
  if (message?.type === "OBS_ATTACHMENT_SEND_ATTEMPT" && c) {
    if (c.conversationKey !== message.conversationKey) throw new Error("ChatGPT tab left the selected conversation.");
    const results = await chrome.scripting.executeScript({target: {tabId}, world: "MAIN", func: clickPreparedAttachmentSendMain, args: [message.conversationKey, message.fileName]});
    const r = results?.[0]?.result; return {ok: true, status: r?.status || "not-ready"};
  }
  throw new Error("Unsupported ChatGPT bridge runtime message.");
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleRuntimeMessage(message, sender).then(sendResponse).catch(error => sendResponse({ok: false, error: errorMessage(error)}));
  return true;
});

chrome.tabs.onRemoved.addListener(tabId => {
  agentInstances.delete(tabId);
  OBSBridgeClient.request("/v1/tabs/release", {method: "POST", body: JSON.stringify({tabId, message: "Claimed ChatGPT tab was closed."})}).catch(error => recordDiagnostic(`Release closed tab ${tabId}`, error));
  void syncInventory(true).catch(() => {});
});
chrome.tabs.onUpdated.addListener(() => { void syncInventoryAndRetryContext().catch(() => {}); });
chrome.tabs.onCreated.addListener(() => { void syncInventoryAndRetryContext().catch(() => {}); });
chrome.runtime.onStartup.addListener(() => { OBSBridgeClient.restrictStorage().catch(error => recordDiagnostic("Restrict storage on startup", error)); void syncInventory(true).catch(() => {}); });
chrome.runtime.onInstalled.addListener(() => {
  OBSBridgeClient.restrictStorage().catch(error => recordDiagnostic("Restrict storage after install/reload", error));
  chrome.runtime.openOptionsPage().catch(error => recordDiagnostic("Open Options after install/reload", error));
  void syncInventory(true).catch(() => {});
});
chrome.action.onClicked.addListener(() => chrome.runtime.openOptionsPage());
OBSBridgeClient.restrictStorage().catch(error => recordDiagnostic("Restrict storage during service worker bootstrap", error));
void runtimeGeneration().then(async () => { ensureContextLookupWaitLoop(); await syncInventory(true); }).catch(error => recordDiagnostic("Bridge runtime bootstrap", error));
