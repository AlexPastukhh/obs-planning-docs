if (!globalThis.__OBS_CHAT_BRIDGE_CONTENT__) {
  globalThis.__OBS_CHAT_BRIDGE_CONTENT__ = true;
  let currentTask = null, abortReason = null;
  const TERMINAL = ["Cancelled","NoChanges","FailedBeforeSend","PreparedUnsent","Sent","Attached","UnknownAfterSend"];
  const BRIDGE_PROTOCOL_VERSION = 2;
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  function validateTaskContract(task) {
    if (!task || typeof task !== "object") throw new Error("Invalid ChatGPT Bridge task contract.");
    if (Number(task.bridgeProtocolVersion) !== BRIDGE_PROTOCOL_VERSION) throw new Error(`ChatGPT Bridge version mismatch. Replacement Package App protocol ${BRIDGE_PROTOCOL_VERSION} is required; restart/update the app and reload the extension.`);
    if (!['reviewDiff','snapshot'].includes(task.kind)) throw new Error("Unsupported ChatGPT Bridge task kind.");
    if (typeof task.taskId !== "string" || !/^[0-9a-f-]{36}$/i.test(task.taskId)) throw new Error("Invalid ChatGPT Bridge task id.");
    if (typeof task.conversationKey !== "string" || !task.conversationKey) throw new Error("ChatGPT Bridge task conversation is missing.");
    if (typeof task.fileName !== "string" || !task.fileName.trim()) throw new Error("ChatGPT Bridge task filename is missing.");
    const size = Number(task.artifactSize);
    if (!Number.isSafeInteger(size) || size < 0) throw new Error("Invalid ChatGPT Bridge artifact size.");
    if (!/^[0-9a-f]{64}$/i.test(String(task.artifactSha256 || ""))) throw new Error("Invalid ChatGPT Bridge artifact fingerprint.");
    if (task.kind === "reviewDiff") {
      const retryMs = Number(task.sendRetryIntervalMs);
      if (task.autoSend !== true || !Number.isSafeInteger(retryMs) || retryMs < 1000 || retryMs > 60000) throw new Error("Invalid ReviewDiff send contract from Replacement Package App. Restart/update the app and reload the extension.");
      return retryMs;
    }
    if (task.autoSend !== false) throw new Error("Snapshot task unexpectedly requested auto-send.");
    return null;
  }

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
  async function heartbeatTask(task) { const r = await runtime({type: "OBS_TASK_HEARTBEAT", taskId: task.taskId}); if (TERMINAL.includes(r.status)) { abortReason = `Task became ${r.status}.`; throw new Error(abortReason); } return r.status; }
  async function guard(task) { OBSChatGPTAdapter.assertConversation(task.conversationKey); if (abortReason) throw new Error(abortReason); await heartbeatTask(task); OBSChatGPTAdapter.assertConversation(task.conversationKey); }

  async function observeReviewTransition(task, prepared, milliseconds) {
    const deadline = Date.now() + milliseconds;
    while (Date.now() < deadline) {
      const state = OBSChatGPTAdapter.reviewSendState(prepared, task.conversationKey);
      if (state.state === "sent") return "sent";
      if (state.state === "missing") {
        const grace = Date.now() + 2000;
        while (Date.now() < grace) {
          await sleep(200);
          const after = OBSChatGPTAdapter.reviewSendState(prepared, task.conversationKey);
          if (after.state === "sent") return "sent";
          if (after.state === "prepared") return "prepared";
        }
        return "missing";
      }
      await sleep(Math.min(250, Math.max(1, deadline - Date.now())));
    }
    return OBSChatGPTAdapter.reviewSendState(prepared, task.conversationKey).state;
  }

  async function sendPreparedReviewWithRetry(task, prepared, retryMs) {
    while (true) {
      await guard(task);
      const state = OBSChatGPTAdapter.reviewSendState(prepared, task.conversationKey);
      if (state.state === "sent") return true;
      if (state.state === "missing") return false;
      const attempt = await runtime({type: "OBS_REVIEW_SEND_ATTEMPT", taskId: task.taskId, conversationKey: task.conversationKey, fileName: prepared.fileName});
      if (attempt.status === "wrong-conversation") throw new Error("ChatGPT tab left the selected conversation.");
      const observed = await observeReviewTransition(task, prepared, retryMs);
      if (observed === "sent") return true;
      if (observed === "missing") return false;
    }
  }

  async function executeTask(task) {
    if (currentTask) return; currentTask = task; abortReason = null; let preparedConfirmed = false, preparingStaged = false, sendStaged = false;
    try {
      const reviewRetryMs = validateTaskContract(task);
      OBSChatGPTAdapter.assertConversation(task.conversationKey); const bytes = await verifiedPayload(task); await guard(task);
      if (task.kind === "reviewDiff") {
        if (!bytes.length) throw new Error("Empty ReviewDiff should have been suppressed by the Java bridge.");
        await OBSChatGPTAdapter.requireEmptyReviewComposer(task.conversationKey); await guard(task);
        const blob = new Blob([bytes], {type: "text/x-diff"});
        const prepared = await OBSChatGPTAdapter.prepareReviewDiffAttachment(blob, task.fileName, task.conversationKey, async () => guard(task));
        preparedConfirmed = true;
        await stageTask(task, "Preparing"); preparingStaged = true; await guard(task);
        await OBSChatGPTAdapter.waitForReviewSendReady(prepared, task.conversationKey); await guard(task);
        await stageTask(task, "SendClicked"); sendStaged = true;
        const confirmed = await sendPreparedReviewWithRetry(task, prepared, reviewRetryMs);
        if (confirmed) await result(task, "Sent", "ReviewDiff .diff attachment sent."); else await result(task, "UnknownAfterSend", "The prepared ReviewDiff attachment left the composer, but the outgoing message could not be confirmed.");
      } else if (task.kind === "snapshot") {
        if (task.autoSend) throw new Error("Snapshot task unexpectedly requested auto-send."); const blob = new Blob([bytes], {type: "application/zip"});
        await stageTask(task, "Preparing"); preparingStaged = true;
        await OBSChatGPTAdapter.attachSnapshot(blob, task.fileName, task.conversationKey, async () => guard(task)); await result(task, "Attached", "Snapshot ZIP attached; Send was intentionally not clicked.");
      } else throw new Error(`Unsupported task kind: ${task.kind}`);
    } catch (error) {
      const status = sendStaged ? "UnknownAfterSend" : (preparingStaged || preparedConfirmed) ? "PreparedUnsent" : "FailedBeforeSend"; try { await result(task, status, error?.message || String(error)); } catch {}
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
      try { validateTaskContract(message.task); } catch (error) { sendResponse({ok: false, error: error?.message || String(error)}); return false; }
      executeTask(message.task); sendResponse({ok: true}); return false;
    }
  });

  setInterval(() => {
    const key = currentConversation(); if (key) chrome.runtime.sendMessage({type: "OBS_HEARTBEAT", conversationKey: key}).catch(() => {});
    if (currentTask) chrome.runtime.sendMessage({type: "OBS_TASK_HEARTBEAT", taskId: currentTask.taskId}).then(r => { if (r?.status && TERMINAL.includes(r.status)) abortReason = `Task became ${r.status}.`; }).catch(e => { abortReason = e?.message || "Task heartbeat failed."; });
  }, 2000);

  const initialKey = currentConversation(); if (initialKey) chrome.runtime.sendMessage({type: "OBS_HEARTBEAT", conversationKey: initialKey}).catch(() => {});
}
