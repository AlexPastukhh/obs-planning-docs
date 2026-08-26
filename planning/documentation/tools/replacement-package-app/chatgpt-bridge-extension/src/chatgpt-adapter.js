globalThis.OBSChatGPTAdapter = (() => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  function conversationKey() { const match = location.pathname.match(/^\/c\/([A-Za-z0-9_-]{8,})\/?$/); return match ? match[1] : null; }
  function assertConversation(expected) { if (conversationKey() !== expected) throw new Error("ChatGPT tab left the selected conversation."); }
  function composer() { return document.querySelector("#prompt-textarea") || document.querySelector('div[contenteditable="true"][data-lexical-editor="true"]') || document.querySelector('div.ProseMirror[contenteditable="true"]') || document.querySelector('textarea[name="prompt-textarea"]'); }
  function rootFor(editor) { return editor?.closest("form") || editor?.parentElement?.parentElement?.parentElement || document.body; }
  function editorRawText(editor) { if (!editor) return ""; if ("value" in editor && typeof editor.value === "string") return editor.value; return editor.innerText ?? editor.textContent ?? ""; }
  function editorText(editor) { return editorRawText(editor).trim(); }
  function attachmentCandidates(root) {
    if (!root) return [];
    const nodes = root.querySelectorAll('[data-testid*="attachment" i],[data-testid*="file-preview" i],[class*="attachment" i],[class*="file-preview" i],[aria-busy="true"][data-testid*="file" i]');
    return [...nodes].filter(n => !["INPUT","BUTTON"].includes(n.tagName) && n.getAttribute("role") !== "button");
  }
  function attachmentPresent(root, fileName) {
    if (!root || !fileName) return false;
    const text = root.innerText || root.textContent || "";
    if (text.includes(fileName)) return true;
    return attachmentCandidates(root).some(n => ((n.innerText || n.textContent || "").includes(fileName)));
  }
  function userMessages() { return [...document.querySelectorAll('[data-message-author-role="user"]')]; }
  function userMessageCount() { return userMessages().length; }
  function nodeMentionsFile(node, fileName) {
    if (!node || !fileName) return false;
    const own = [node.innerText, node.textContent, node.getAttribute?.("title"), node.getAttribute?.("aria-label")].filter(Boolean).join("\n");
    if (own.includes(fileName)) return true;
    const descendants = node.querySelectorAll ? [...node.querySelectorAll('[title],[aria-label],[data-testid*="file" i],[class*="file" i]')] : [];
    return descendants.some(n => {
      const value = [n.innerText, n.textContent, n.getAttribute("title"), n.getAttribute("aria-label")].filter(Boolean).join("\n");
      return value.includes(fileName);
    });
  }
  function exactReviewTurnPresent(prepared) { return userMessages().slice(prepared.beforeUserMessages).some(message => nodeMentionsFile(message, prepared.fileName)); }
  function busy(root) { return !!root?.querySelector('[role="progressbar"],[aria-busy="true"],[data-state="loading"],[data-testid*="progress" i],[class*="upload" i][class*="progress" i]'); }
  function sendButton(root) { for (const selector of ['button[data-testid="send-button"]','button[data-testid*="send" i]','button[aria-label="Send prompt"]','button[aria-label^="Send" i]','button[aria-label^="Отправ" i]']) { const b = root?.querySelector(selector) || document.querySelector(selector); if (b) return b; } return null; }
  function readySendButton(root) { const b = sendButton(root); return b && b.isConnected && !b.disabled && b.getAttribute("aria-disabled") !== "true" && !busy(rootFor(composer()) || root) ? b : null; }
  async function waitFor(fn, timeout = 30000, interval = 100) { const end = Date.now() + timeout; let lastError; while (Date.now() < end) { try { const value = fn(); if (value) return value; } catch (e) { lastError = e; } await sleep(interval); } if (lastError) throw lastError; throw new Error("Timed out waiting for ChatGPT composer state."); }

  async function requireEmptyReviewComposer(expectedConversation) {
    assertConversation(expectedConversation);
    const editor = await waitFor(composer, 30000), root = rootFor(editor);
    assertConversation(expectedConversation);
    if (editorText(editor) || attachmentCandidates(root).length > 0) throw new Error("ChatGPT composer is not empty; automatic ReviewDiff delivery will not mix with an existing draft or attachment.");
  }

  async function findFileInput(expectedConversation) {
    assertConversation(expectedConversation);
    let input = document.querySelector('input[type="file"]');
    if (input) return input;
    const editor = await waitFor(composer, 30000), root = rootFor(editor);
    const attach = root.querySelector('button[data-testid*="file" i],button[aria-label*="Attach" i],button[aria-label*="file" i],button[aria-label*="прикреп" i]');
    if (attach) attach.click();
    return waitFor(() => document.querySelector('input[type="file"]'), 5000);
  }

  async function prepareAttachment(blob, fileName, contentType, expectedConversation, guard) {
    assertConversation(expectedConversation);
    const editor = await waitFor(composer, 30000);
    const beforeUserMessages = userMessageCount();
    const input = await findFileInput(expectedConversation);
    await guard(); assertConversation(expectedConversation);
    const file = new File([blob], fileName, {type: contentType, lastModified: Date.now()});
    const transfer = new DataTransfer(); transfer.items.add(file); input.files = transfer.files;
    const assigned = input.files?.[0];
    if (!assigned || assigned.name !== fileName || assigned.size !== blob.size) throw new Error("ChatGPT file input did not accept the exact prepared artifact.");
    input.dispatchEvent(new Event("input", {bubbles: true}));
    input.dispatchEvent(new Event("change", {bubbles: true}));
    await waitFor(() => { const liveEditor = composer(); return liveEditor && attachmentPresent(rootFor(liveEditor), fileName); }, 30000, 150);
    await waitFor(() => { const liveEditor = composer(); if (!liveEditor) return false; const liveRoot = rootFor(liveEditor); return attachmentPresent(liveRoot, fileName) && !busy(liveRoot); }, 120000, 250);
    assertConversation(expectedConversation);
    return {mode: "attachment", fileName, fileSize: blob.size, beforeUserMessages};
  }

  async function prepareReviewDiffAttachment(blob, fileName, expectedConversation, guard) {
    await requireEmptyReviewComposer(expectedConversation);
    return prepareAttachment(blob, fileName, "text/x-diff", expectedConversation, guard);
  }

  function reviewSendState(prepared, expectedConversation) {
    assertConversation(expectedConversation);
    if (exactReviewTurnPresent(prepared)) return {state: "sent", ready: false};
    const liveEditor = composer();
    if (!liveEditor) return {state: "missing", ready: false};
    const liveRoot = rootFor(liveEditor), present = attachmentPresent(liveRoot, prepared.fileName);
    if (editorText(liveEditor)) return {state: "contaminated", ready: false};
    if (!present) return {state: "missing", ready: false};
    return {state: "prepared", ready: !!readySendButton(liveRoot)};
  }

  async function waitForReviewSendReady(prepared, expectedConversation) {
    const deadline = Date.now() + 120000;
    while (Date.now() < deadline) {
      const state = reviewSendState(prepared, expectedConversation);
      if (state.state === "contaminated") throw new Error("ChatGPT composer changed after ReviewDiff preparation; automatic Send was stopped before clicking Send.");
      if (state.state === "sent") return;
      if (state.state === "missing") throw new Error("Prepared ReviewDiff attachment disappeared before automatic Send could begin.");
      if (state.ready) return;
      await sleep(Math.min(250, Math.max(1, deadline - Date.now())));
    }
    throw new Error("Timed out waiting for the prepared ReviewDiff attachment to become send-ready.");
  }

  async function attachSnapshot(blob, fileName, expectedConversation, guard) {
    await prepareAttachment(blob, fileName, "application/zip", expectedConversation, guard);
  }

  return {conversationKey, assertConversation, requireEmptyReviewComposer, prepareReviewDiffAttachment, reviewSendState, waitForReviewSendReady, attachSnapshot};
})();
