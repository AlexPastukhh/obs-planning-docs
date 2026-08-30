(() => {
  const priorAgent = globalThis.__OBS_CHAT_BRIDGE_AGENT__;
  if (priorAgent?.dispose) priorAgent.dispose("Replaced by a fresh ChatGPT bridge agent.");
  const agentInstanceId = crypto.randomUUID();
  let runtimeGeneration = null, currentTask = null, abortReason = null, heartbeatTimer = null, active = true, messageListener = null;
  const TERMINAL = ["Cancelled","NoChanges","FailedBeforeSend","PreparedUnsent","Sent","Attached","UnknownAfterSend"];
  const BRIDGE_PROTOCOL_VERSION = 5;
  const CHAT_CONTEXT_STORAGE_KEY = "obsPlanningHelper:chatContextCaptures:v1";
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  function capturedChatContext(token) {
    try {
      const raw = sessionStorage.getItem(CHAT_CONTEXT_STORAGE_KEY); if (!raw) return null;
      const store = JSON.parse(raw), capture = store?.schemaVersion === 1 ? store.captures?.[token] : null;
      if (!capture || capture.chatContextToken !== token || typeof capture.conversationKey !== "string" || !/^[A-Za-z0-9_-]{8,}$/.test(capture.conversationKey)) return null;
      if (typeof capture.observedTitle !== "string" || !capture.observedTitle.trim() || typeof capture.capturedAt !== "string" || !capture.capturedAt.trim()) return null;
      return {chatContextToken: token, conversationKey: capture.conversationKey, observedTitle: capture.observedTitle, capturedAt: capture.capturedAt};
    } catch { return null; }
  }

  function contextInvalid(error) {
    const text = String(error?.message || error || "");
    return /Extension context invalidated|Cannot read properties of undefined \(reading ['"](?:onMessage|sendMessage|connect)['"]\)/i.test(text);
  }
  function staleAgent(error) { return /Stale ChatGPT bridge (?:runtime generation|agent instance)/i.test(String(error?.message || error || "")); }
  function shouldDispose(error) { return contextInvalid(error) || staleAgent(error); }
  function dispose(reason = "ChatGPT bridge agent stopped.") {
    if (!active) return;
    active = false; abortReason = reason;
    if (heartbeatTimer !== null) { clearInterval(heartbeatTimer); heartbeatTimer = null; }
    if (messageListener) {
      try { globalThis.chrome?.runtime?.onMessage?.removeListener(messageListener); } catch {}
      messageListener = null;
    }
  }
  function runtimeApi() {
    const api = globalThis.chrome?.runtime;
    if (!api?.sendMessage) { const error = new Error("Extension context invalidated."); dispose(error.message); throw error; }
    return api;
  }
  async function registerAgent() {
    try {
      const response = await runtimeApi().sendMessage({type: "OBS_AGENT_REGISTER", agentInstanceId, conversationKey: currentConversation() || ""});
      if (!response?.ok || typeof response.runtimeGeneration !== "string" || !response.runtimeGeneration) throw new Error(response?.error || "ChatGPT bridge agent registration failed.");
      runtimeGeneration = response.runtimeGeneration;
      return response;
    } catch (error) { if (shouldDispose(error)) dispose(error?.message || "ChatGPT bridge agent is stale."); throw error; }
  }
  globalThis.__OBS_CHAT_BRIDGE_AGENT__ = {agentInstanceId, dispose};

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
    if (typeof task.autoSend !== "boolean") throw new Error("Invalid attachment auto-send contract from Replacement Package App.");
    if (task.kind === "reviewDiff" && task.autoSend !== true) throw new Error("ReviewDiff task must request automatic Send.");
    if (!task.autoSend) return null;
    const retryMs = Number(task.sendRetryIntervalMs);
    if (!Number.isSafeInteger(retryMs) || retryMs < 1000 || retryMs > 60000) throw new Error("Invalid attachment Send contract from Replacement Package App. Restart/update the app and reload the extension.");
    return retryMs;
  }

  async function sha256Hex(bytes) { const hash = await crypto.subtle.digest("SHA-256", bytes); return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, "0")).join(""); }
  function base64ToBytes(value) { const binary = atob(value); const bytes = new Uint8Array(binary.length); for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i); return bytes; }
  async function verifiedPayload(task) {
    const bytes = await new Promise((resolve, reject) => {
      let port;
      try { port = runtimeApi().connect({name: "OBS_PAYLOAD_STREAM"}); }
      catch (error) { if (shouldDispose(error)) dispose(error?.message || "ChatGPT bridge agent is stale."); throw error; }
      let expectedSize = null, received = 0, output = null, settled = false;
      const finishError = error => { if (settled) return; settled = true; try { port.disconnect(); } catch {} reject(error instanceof Error ? error : new Error(String(error))); };
      port.onDisconnect.addListener(() => { if (!settled) finishError(new Error(globalThis.chrome?.runtime?.lastError?.message || "Payload stream disconnected before completion.")); });
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
      port.postMessage({type: "START", task, runtimeGeneration, agentInstanceId});
    });
    const sha = await sha256Hex(bytes); if (sha.toLowerCase() !== String(task.artifactSha256 || "").toLowerCase()) throw new Error("Artifact changed during delivery."); return bytes;
  }
  function currentConversation() { return OBSChatGPTAdapter.conversationKey(); }
  async function runtime(message) {
    if (!active) throw new Error(abortReason || "ChatGPT bridge agent is inactive.");
    if (!runtimeGeneration) throw new Error("ChatGPT bridge agent is not registered yet.");
    try {
      const r = await runtimeApi().sendMessage({...message, runtimeGeneration, agentInstanceId});
      if (!r?.ok) throw new Error(r?.error || "Bridge request failed.");
      return r;
    } catch (error) { if (shouldDispose(error)) dispose(error?.message || "ChatGPT bridge agent is stale."); throw error; }
  }
  async function result(task, status, message) { return runtime({type: "OBS_TASK_RESULT", taskId: task.taskId, status, message: message || ""}); }
  async function stageTask(task, stage) { return runtime({type: "OBS_TASK_STAGE", taskId: task.taskId, stage}); }
  async function heartbeatTask(task) { const r = await runtime({type: "OBS_TASK_HEARTBEAT", taskId: task.taskId}); if (TERMINAL.includes(r.status)) { abortReason = `Task became ${r.status}.`; throw new Error(abortReason); } return r.status; }
  async function guard(task) { OBSChatGPTAdapter.assertConversation(task.conversationKey); if (abortReason) throw new Error(abortReason); await heartbeatTask(task); OBSChatGPTAdapter.assertConversation(task.conversationKey); }

  async function observeAttachmentTransition(task, prepared, milliseconds) {
    const deadline = Date.now() + milliseconds;
    while (Date.now() < deadline) {
      const state = OBSChatGPTAdapter.attachmentSendState(prepared, task.conversationKey);
      if (state.state === "sent") return "sent";
      if (state.state === "contaminated") return "contaminated";
      if (state.state === "missing") {
        const grace = Date.now() + Math.max(2000, Math.min(milliseconds, 10000));
        while (Date.now() < grace) {
          await sleep(200);
          const after = OBSChatGPTAdapter.attachmentSendState(prepared, task.conversationKey);
          if (after.state === "sent") return "sent";
          if (after.state === "contaminated") return "contaminated";
          if (after.state === "prepared") return "prepared";
        }
        return "missing";
      }
      await sleep(Math.min(250, Math.max(1, deadline - Date.now())));
    }
    return OBSChatGPTAdapter.attachmentSendState(prepared, task.conversationKey).state;
  }

  async function sendPreparedAttachmentWithRetry(task, prepared, retryMs, onSendArmed, onSendNotClicked, onPossibleSend) {
    let possibleSendRecorded = false;
    const markPossibleSend = async () => {
      if (possibleSendRecorded) return;
      possibleSendRecorded = true;
      await onPossibleSend();
    };
    while (true) {
      await guard(task);
      const state = OBSChatGPTAdapter.attachmentSendState(prepared, task.conversationKey);
      if (state.state === "sent") { await markPossibleSend(); return true; }
      if (state.state === "contaminated") throw new Error("ChatGPT composer changed after attachment preparation; automatic Send was stopped before clicking Send.");
      if (state.state === "missing") return false;
      if (!possibleSendRecorded) await onSendArmed();
      let attempt;
      try {
        attempt = await runtime({type: "OBS_ATTACHMENT_SEND_ATTEMPT", taskId: task.taskId, conversationKey: task.conversationKey, fileName: prepared.fileName});
      } catch (error) {
        throw error;
      }
      if (attempt.status === "clicked") await markPossibleSend();
      else if (!possibleSendRecorded) await onSendNotClicked();
      if (attempt.status === "wrong-conversation") throw new Error("ChatGPT tab left the selected conversation.");
      if (attempt.status === "composer-dirty") throw new Error("ChatGPT composer changed after attachment preparation; automatic Send was stopped before clicking Send.");
      if (attempt.status === "attachment-missing") return false;
      const observed = await observeAttachmentTransition(task, prepared, retryMs);
      if (observed === "sent") { await markPossibleSend(); return true; }
      if (observed === "contaminated") throw new Error("ChatGPT composer changed after attachment preparation; automatic Send was stopped before clicking Send.");
      if (observed === "missing") return false;
    }
  }

  async function executeTask(task) {
    if (currentTask) return; currentTask = task; abortReason = null; let preparedConfirmed = false, preparingStaged = false, sendArmed = false, possibleSend = false;
    try {
      const sendRetryMs = validateTaskContract(task);
      OBSChatGPTAdapter.assertConversation(task.conversationKey); const bytes = await verifiedPayload(task); await guard(task);
      if (task.kind === "reviewDiff" && !bytes.length) throw new Error("Empty ReviewDiff should have been suppressed by the Java bridge.");
      const label = task.kind === "reviewDiff" ? "ReviewDiff" : "Snapshot ZIP";
      const contentType = task.kind === "reviewDiff" ? "text/x-diff" : "application/zip";
      if (task.autoSend) { await OBSChatGPTAdapter.requireEmptyAttachmentComposer(task.conversationKey); await guard(task); }
      if (task.kind === "snapshot") { await stageTask(task, "Preparing"); preparingStaged = true; await guard(task); }
      const blob = new Blob([bytes], {type: contentType});
      const prepared = await OBSChatGPTAdapter.prepareAttachment(blob, task.fileName, contentType, task.conversationKey, async () => guard(task));
      preparedConfirmed = true;
      if (!preparingStaged) { await stageTask(task, "Preparing"); preparingStaged = true; await guard(task); }
      if (!task.autoSend) { await result(task, "Attached", `${label} attached; Send was intentionally not clicked.`); return; }
      await OBSChatGPTAdapter.waitForAttachmentSendReady(prepared, task.conversationKey); await guard(task);
      const confirmed = await sendPreparedAttachmentWithRetry(task, prepared, sendRetryMs,
        async () => { await stageTask(task, "SendArmed"); sendArmed = true; },
        async () => { await stageTask(task, "SendNotClicked"); sendArmed = false; },
        async () => {
          if (possibleSend) return;
          await stageTask(task, "SendClicked");
          possibleSend = true;
          sendArmed = false;
        });
      if (confirmed) await result(task, "Sent", `${label} send confirmed after the prepared attachment left the composer and a post-baseline user turn appeared; exact-filename attachment-surface proof is used when available.`);
      else if (possibleSend) await result(task, "UnknownAfterSend", `A Send click was attempted, but no post-baseline user turn could be confirmed after the prepared ${label} attachment left the composer.`);
      else await result(task, "PreparedUnsent", `The prepared ${label} attachment disappeared before any automatic Send click was attempted.`);
    } catch (error) {
      const status = (possibleSend || sendArmed) ? "UnknownAfterSend" : (preparingStaged || preparedConfirmed) ? "PreparedUnsent" : "FailedBeforeSend"; try { await result(task, status, error?.message || String(error)); } catch {}
    } finally { currentTask = null; abortReason = null; }
  }

  function heartbeatTick() {
    if (!active) return;
    const key = currentConversation();
    if (key) runtime({type: "OBS_HEARTBEAT", conversationKey: key}).catch(error => { if (shouldDispose(error)) dispose(error?.message || "ChatGPT bridge agent is stale."); });
    if (currentTask) runtime({type: "OBS_TASK_HEARTBEAT", taskId: currentTask.taskId})
      .then(r => { if (r?.status && TERMINAL.includes(r.status)) abortReason = `Task became ${r.status}.`; })
      .catch(error => { if (shouldDispose(error)) dispose(error?.message || "ChatGPT bridge agent is stale."); else abortReason = error?.message || "Task heartbeat failed."; });
  }

  async function startAgent() {
    await registerAgent();
    if (!active) return;
    messageListener = (message, sender, sendResponse) => {
      if (message?.type === "OBS_PING") {
        const sameGeneration = message.runtimeGeneration === runtimeGeneration;
        sendResponse({ok: sameGeneration, runtimeGeneration, agentInstanceId, stale: !sameGeneration});
        return false;
      }
      if (message?.type === "OBS_CHAT_CONTEXT_LOOKUP") {
        if (message.runtimeGeneration !== runtimeGeneration) { sendResponse({ok: false, error: "Stale ChatGPT bridge runtime generation."}); return false; }
        const token = String(message.chatContextToken || ""), capture = capturedChatContext(token);
        sendResponse({ok: true, found: !!capture, capture}); return false;
      }
      if (message?.type === "OBS_TASK" && message.task) {
        if (message.runtimeGeneration !== runtimeGeneration) { sendResponse({ok: false, error: "Stale ChatGPT bridge runtime generation."}); return false; }
        if (currentTask) {
          const same = currentTask.taskId === message.task.taskId;
          sendResponse({ok: same, alreadyRunning: same, error: same ? "" : "Another ChatGPT bridge task is already running in this tab."});
          return false;
        }
        try { validateTaskContract(message.task); } catch (error) { sendResponse({ok: false, error: error?.message || String(error)}); return false; }
        executeTask(message.task); sendResponse({ok: true}); return false;
      }
    };
    runtimeApi().onMessage.addListener(messageListener);
    heartbeatTimer = setInterval(heartbeatTick, 2000);
    heartbeatTick();
  }

  startAgent().catch(error => {
    if (shouldDispose(error)) dispose(error?.message || "ChatGPT bridge agent is stale.");
    else { console.warn(`[OBS ChatGPT Bridge] Agent startup failed: ${error?.message || String(error)}`, error); dispose(error?.message || "ChatGPT bridge agent startup failed."); }
  });
})();
