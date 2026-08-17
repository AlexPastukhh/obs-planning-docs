importScripts("bridge-client.js");
let inventoryPromise = null, lastInventoryAt = 0;

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
async function ensureContentScript(tabId) {
  try { const r = await chrome.tabs.sendMessage(tabId, {type: "OBS_PING"}); if (r?.ok) return; } catch {}
  try { await chrome.scripting.executeScript({target: {tabId}, files: ["src/chatgpt-adapter.js", "src/content.js"]}); } catch {}
}
async function syncInventory(force = false) {
  const now = Date.now(); if (!force && now - lastInventoryAt < 900) return; if (inventoryPromise) return inventoryPromise;
  inventoryPromise = (async () => {
    const tabs = await chatTabs(), conversations = await buildInventory(tabs);
    try { await OBSBridgeClient.request("/v1/inventory", {method: "POST", body: JSON.stringify({conversations})}); lastInventoryAt = Date.now(); } catch {}
    await Promise.all(tabs.filter(t => typeof t.id === "number" && ordinaryConversation(t.url || "")).map(t => ensureContentScript(t.id)));
  })().finally(() => { inventoryPromise = null; });
  return inventoryPromise;
}
async function claimForTab(tabId, conversationKey) {
  try {
    const result = await OBSBridgeClient.request("/v1/tasks/claim", {method: "POST", body: JSON.stringify({tabId, conversationKey})});
    if (result.task) await chrome.tabs.sendMessage(tabId, {type: "OBS_TASK", task: result.task});
  } catch {}
}
async function taskRequest(taskId, action, tabId, conversationKey, extra = {}) {
  return OBSBridgeClient.request(`/v1/tasks/${encodeURIComponent(taskId)}/${action}`, {method: "POST", body: JSON.stringify({tabId, conversationKey, ...extra})});
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = sender.tab?.id, c = ordinaryConversation(sender.tab?.url || "");
  if (message?.type === "OBS_HEARTBEAT" && typeof tabId === "number" && c && c.conversationKey === message.conversationKey) {
    syncInventory().then(() => claimForTab(tabId, c.conversationKey)).then(() => sendResponse({ok: true})).catch(e => sendResponse({ok: false, error: e.message})); return true;
  }
  if (message?.type === "OBS_TASK_HEARTBEAT" && typeof tabId === "number" && c) {
    taskRequest(message.taskId, "heartbeat", tabId, c.conversationKey).then(r => sendResponse({ok: true, status: r.status})).catch(e => sendResponse({ok: false, error: e.message})); return true;
  }
  if (message?.type === "OBS_TASK_STAGE" && typeof tabId === "number" && c) {
    taskRequest(message.taskId, "stage", tabId, c.conversationKey, {stage: message.stage}).then(() => sendResponse({ok: true})).catch(e => sendResponse({ok: false, error: e.message})); return true;
  }
  if (message?.type === "OBS_TASK_RESULT" && typeof tabId === "number" && c) {
    taskRequest(message.taskId, "result", tabId, c.conversationKey, {status: message.status, message: message.message || ""}).then(() => sendResponse({ok: true})).catch(e => sendResponse({ok: false, error: e.message})); return true;
  }
  if (message?.type === "OBS_TASK_RELEASE" && typeof tabId === "number") {
    const key = c?.conversationKey || message.conversationKey || "";
    taskRequest(message.taskId, "release", tabId, key, {message: message.message || ""}).then(r => sendResponse({ok: true, status: r.status})).catch(e => sendResponse({ok: false, error: e.message})); return true;
  }
  if (message?.type === "OBS_SYNC_NOW") { syncInventory(true).then(() => sendResponse({ok: true})).catch(e => sendResponse({ok: false, error: e.message})); return true; }
});

chrome.tabs.onRemoved.addListener(tabId => { OBSBridgeClient.request("/v1/tabs/release", {method: "POST", body: JSON.stringify({tabId, message: "Claimed ChatGPT tab was closed."})}).catch(() => {}); syncInventory(true); });
chrome.tabs.onUpdated.addListener(() => syncInventory(true));
chrome.tabs.onCreated.addListener(() => syncInventory(true));
chrome.runtime.onStartup.addListener(() => { OBSBridgeClient.restrictStorage().catch(() => {}); syncInventory(true); });
chrome.runtime.onInstalled.addListener(() => { OBSBridgeClient.restrictStorage().catch(() => {}); syncInventory(true); });
chrome.action.onClicked.addListener(() => chrome.runtime.openOptionsPage());
OBSBridgeClient.restrictStorage().catch(() => {}); syncInventory(true);
