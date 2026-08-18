if (!globalThis.__OBS_CHAT_BRIDGE_CONTENT__) {
  globalThis.__OBS_CHAT_BRIDGE_CONTENT__ = true;
  let currentTask = null, abortReason = null;

  async function sha256Hex(bytes) { const hash = await crypto.subtle.digest("SHA-256", bytes); return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, "0")).join(""); }
  function base64ToBytes(value) { const binary = atob(value); const bytes = new Uint8Array(binary.length); for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i); return bytes; }
  async function verifiedPayload(task) {
    const bytes = await new Promise((resolve, reject) => {
      const port = chrome.runtime.connect({name: "OBS_PAYLOAD_STREAM"});
      let expectedSize = null, received = 0, output = null, settled = false;
      const finishError = error => { if (settled) return; settled = true; try { port.disconnect(); } catch {} reject(error instanceof Error ? error : new Error(String(error))); };
      port.onDisconnect.addListener(() => { if (!settled) finishError(new Error(chrome.runtime.lastError?.message || "Payload stream disconnected before completion.")); });
      port.onMessage.addListener(message => {
        try {
          if (message?.type === "ERROR") { finishError(new Error(message.error || "Artifact fetch failed.")); return; }
          if (message?.type === "META") {
            expectedSize = Number(message.size); if (!Number.isSafeInteger(expectedSize) || expectedSize < 0 || expectedSize !== Number(task.artifactSize)) throw new Error("Artifact size changed during delivery.");
            output = new Uint8Array(expectedSize); return;
          }
          if (message?.type === "CHUNK") {
            if (!output || Number(message.offset) !== received) throw new Error("Artifact stream chunk order changed during delivery.");
            const chunk = base64ToBytes(String(message.data || "")); if (received + chunk.length > output.length) throw new Error("Artifact stream exceeded expected size.");
            output.set(chunk, received); received += chunk.length; return;
          }
          if (message?.type === "DONE") {
            if (!output || received !== expectedSize) throw new Error("Artifact stream ended before expected size.");
            settled = true; try { port.disconnect(); } catch {} resolve(output); return;
          }
        } catch (error) { finishError(error); }
      });
      port.postMessage({type: "START", task});
    });
    const sha = await sha256Hex(bytes); if (sha.toLowerCase() !== String(task.artifactSha256 || "").toLowerCase()) throw new Error("Artifact changed during delivery."); return bytes;
  }
  function currentConversation() { return OBSChatGPTAdapter.conversationKey(); }
  async function runtime(message) { const r = await chrome.runtime.sendMessage(message); if (!r?.ok) throw new Error(r?.error || "Bridge request failed."); return r; }
  async function result(task, status, message) { return runtime({type: "OBS_TASK_RESULT", taskId: task.taskId, status, message: message || ""}); }
  async function stageTask(task, stage) { return runtime({type: "OBS_TASK_STAGE", taskId: task.taskId, stage}); }
  async function heartbeatTask(task) { const r = await runtime({type: "OBS_TASK_HEARTBEAT", taskId: task.taskId}); if (["Cancelled","NoChanges","FailedBeforeSend","PreparedUnsent","Sent","Attached","UnknownAfterSend"].includes(r.status)) { abortReason = `Task became ${r.status}.`; throw new Error(abortReason); } return r.status; }
  async function guard(task) { OBSChatGPTAdapter.assertConversation(task.conversationKey); if (abortReason) throw new Error(abortReason); await heartbeatTask(task); OBSChatGPTAdapter.assertConversation(task.conversationKey); }

  async function executeTask(task) {
    if (currentTask) return; currentTask = task; abortReason = null; let preparingStaged = false, sendStaged = false;
    try {
      OBSChatGPTAdapter.assertConversation(task.conversationKey); const bytes = await verifiedPayload(task); await guard(task);
      if (task.kind === "reviewDiff") {
        const text = new TextDecoder("utf-8", {fatal: true}).decode(bytes); if (!text.length) throw new Error("Empty ReviewDiff should have been suppressed by the Java bridge.");
        await OBSChatGPTAdapter.requireEmptyReviewComposer(task.conversationKey);
        await stageTask(task, "Preparing"); preparingStaged = true;
        const prepared = await OBSChatGPTAdapter.pasteReviewDiff(text, task.conversationKey); await guard(task);
        const confirmed = await OBSChatGPTAdapter.sendPrepared(prepared, task.conversationKey, async () => { await stageTask(task, "SendClicked"); sendStaged = true; }, async () => guard(task));
        if (confirmed) await result(task, "Sent", `ReviewDiff sent as ${prepared.mode}.`); else await result(task, "UnknownAfterSend", "Send was clicked but the outgoing message could not be confirmed.");
      } else if (task.kind === "snapshot") {
        if (task.autoSend) throw new Error("Snapshot task unexpectedly requested auto-send."); const blob = new Blob([bytes], {type: "application/zip"});
        await stageTask(task, "Preparing"); preparingStaged = true;
        await OBSChatGPTAdapter.attachSnapshot(blob, task.fileName, task.conversationKey, async () => guard(task)); await result(task, "Attached", "Snapshot ZIP attached; Send was intentionally not clicked.");
      } else throw new Error(`Unsupported task kind: ${task.kind}`);
    } catch (error) {
      const status = sendStaged ? "UnknownAfterSend" : preparingStaged ? "PreparedUnsent" : "FailedBeforeSend"; try { await result(task, status, error?.message || String(error)); } catch {}
    } finally { currentTask = null; abortReason = null; }
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.type === "OBS_PING") { sendResponse({ok: true}); return false; }
    if (message?.type === "OBS_TASK" && message.task) {
      if (currentTask) {
        const same = currentTask.taskId === message.task.taskId;
        sendResponse({ok: same, alreadyRunning: same, error: same ? "" : "Another ChatGPT bridge task is already running in this tab."});
        return false;
      }
      executeTask(message.task); sendResponse({ok: true}); return false;
    }
  });

  setInterval(() => {
    const key = currentConversation(); if (key) chrome.runtime.sendMessage({type: "OBS_HEARTBEAT", conversationKey: key}).catch(() => {});
    if (currentTask) chrome.runtime.sendMessage({type: "OBS_TASK_HEARTBEAT", taskId: currentTask.taskId}).then(r => { if (r?.status && ["Cancelled","NoChanges","FailedBeforeSend","PreparedUnsent","Sent","Attached","UnknownAfterSend"].includes(r.status)) abortReason = `Task became ${r.status}.`; }).catch(e => { abortReason = e?.message || "Task heartbeat failed."; });
  }, 2000);

  const initialKey = currentConversation(); if (initialKey) chrome.runtime.sendMessage({type: "OBS_HEARTBEAT", conversationKey: initialKey}).catch(() => {});
}
