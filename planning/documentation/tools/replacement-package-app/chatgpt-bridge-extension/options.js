const token = document.getElementById("token"), status = document.getElementById("status");
OBSBridgeClient.restrictStorage().catch(() => {});
chrome.storage.local.get(["bridgeToken"]).then(v => token.value = v.bridgeToken || "");
document.getElementById("save").addEventListener("click", async () => {
  const value = token.value.trim();
  await OBSBridgeClient.restrictStorage();
  await chrome.storage.local.set({bridgeToken: value});
  try {
    const health = await OBSBridgeClient.request("/v1/health");
    status.textContent = `Connected to Replacement Package App bridge on port ${health.port}.`;
    await chrome.runtime.sendMessage({type: "OBS_SYNC_NOW"});
  } catch (e) { status.textContent = `Not connected: ${e.message}`; }
});
