const token = document.getElementById("token"), status = document.getElementById("status");
const BRIDGE_PROTOCOL_VERSION = 2;

function diagnosticSuffix(value) {
  const d = value?.lastBridgeDiagnostic;
  return d?.message ? `\nLast extension diagnostic (${d.context || "unknown"}, ${d.at || "unknown time"}): ${d.message}` : "";
}
async function testAndSync() {
  const health = await OBSBridgeClient.request("/v1/health");
  if (Number(health.bridgeProtocolVersion) !== BRIDGE_PROTOCOL_VERSION) throw new Error(`ChatGPT Bridge version mismatch. Replacement Package App protocol ${BRIDGE_PROTOCOL_VERSION} is required; restart/update the app and reload the extension.`);
  status.textContent = `Connected to Replacement Package App bridge on port ${health.port} (protocol ${health.bridgeProtocolVersion}).`;
  await chrome.runtime.sendMessage({type: "OBS_SYNC_NOW"});
}
async function load() {
  await OBSBridgeClient.restrictStorage();
  const value = await chrome.storage.local.get(["bridgeToken", "lastBridgeDiagnostic"]);
  token.value = value.bridgeToken || "";
  if (!token.value.trim()) { status.textContent = `Paste the pairing token from Replacement Package App and choose Save and test.${diagnosticSuffix(value)}`; return; }
  try { await testAndSync(); }
  catch (e) { status.textContent = `Not connected: ${e.message}${diagnosticSuffix(value)}`; }
}

document.getElementById("save").addEventListener("click", async () => {
  const value = token.value.trim();
  await OBSBridgeClient.restrictStorage();
  await chrome.storage.local.set({bridgeToken: value});
  try { await testAndSync(); }
  catch (e) {
    const diagnostics = await chrome.storage.local.get(["lastBridgeDiagnostic"]);
    status.textContent = `Not connected: ${e.message}${diagnosticSuffix(diagnostics)}`;
  }
});

load().catch(e => { status.textContent = `Extension options failed to initialize: ${e.message}`; });
