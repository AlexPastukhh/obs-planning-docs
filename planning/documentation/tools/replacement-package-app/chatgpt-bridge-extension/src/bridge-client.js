const OBSBridgeClient = (() => {
  const BASE = "http://127.0.0.1:17831";
  async function restrictStorage() {
    if (chrome.storage?.local?.setAccessLevel) {
      await chrome.storage.local.setAccessLevel({accessLevel: "TRUSTED_CONTEXTS"});
    }
  }
  async function token() {
    await restrictStorage();
    const state = await chrome.storage.local.get(["bridgeToken"]);
    return String(state.bridgeToken || "").trim();
  }
  async function request(path, options = {}) {
    const t = await token();
    if (!t) throw new Error("Bridge pairing token is not configured.");
    const headers = new Headers(options.headers || {});
    headers.set("X-OBS-Bridge-Token", t);
    if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    const response = await fetch(BASE + path, {...options, headers, cache: "no-store"});
    const text = await response.text();
    let data = {};
    if (text) { try { data = JSON.parse(text); } catch { data = {message: text}; } }
    if (!response.ok) throw new Error(data.message || data.error || `Bridge HTTP ${response.status}`);
    return data;
  }
  restrictStorage().catch(() => {});
  return {BASE, request, restrictStorage};
})();
