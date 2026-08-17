globalThis.OBSChatGPTAdapter = (() => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  function conversationKey() { const match = location.pathname.match(/^\/c\/([A-Za-z0-9_-]{8,})\/?$/); return match ? match[1] : null; }
  function assertConversation(expected) { if (conversationKey() !== expected) throw new Error("ChatGPT tab left the selected conversation."); }
  function composer() { return document.querySelector("#prompt-textarea") || document.querySelector('div[contenteditable="true"][data-lexical-editor="true"]') || document.querySelector('div.ProseMirror[contenteditable="true"]') || document.querySelector('textarea[name="prompt-textarea"]'); }
  function rootFor(editor) { return editor?.closest("form") || editor?.parentElement?.parentElement?.parentElement || document.body; }
  function editorText(editor) { if (!editor) return ""; if ("value" in editor && typeof editor.value === "string") return editor.value.trim(); return (editor.innerText || editor.textContent || "").trim(); }
  function attachmentCandidates(root) {
    if (!root) return [];
    const nodes = root.querySelectorAll('[data-testid*="attachment" i],[data-testid*="file-preview" i],[class*="attachment" i],[class*="file-preview" i],[aria-busy="true"][data-testid*="file" i]');
    return [...nodes].filter(n => !["INPUT","BUTTON"].includes(n.tagName) && n.getAttribute("role") !== "button");
  }
  function userMessageCount() { return document.querySelectorAll('[data-message-author-role="user"]').length; }
  function busy(root) { return !!root?.querySelector('[role="progressbar"],[aria-busy="true"],[data-state="loading"],[data-testid*="progress" i],[class*="upload" i][class*="progress" i]'); }
  function sendButton(root) { for (const selector of ['button[data-testid="send-button"]','button[data-testid*="send" i]','button[aria-label="Send prompt"]','button[aria-label^="Send" i]','button[aria-label^="Отправ" i]']) { const b = root?.querySelector(selector) || document.querySelector(selector); if (b) return b; } return null; }
  async function requireEmptyReviewComposer(expectedConversation) { assertConversation(expectedConversation); const editor = await waitFor(composer, 30000), root = rootFor(editor); assertConversation(expectedConversation); if (editorText(editor) || attachmentCandidates(root).length > 0) throw new Error("ChatGPT composer is not empty; automatic ReviewDiff delivery will not mix with an existing draft or attachment."); }
  async function waitFor(fn, timeout = 30000, interval = 100) { const end = Date.now() + timeout; let lastError; while (Date.now() < end) { try { const value = fn(); if (value) return value; } catch (e) { lastError = e; } await sleep(interval); } if (lastError) throw lastError; throw new Error("Timed out waiting for ChatGPT composer state."); }
  function dispatchSyntheticPaste(editor, text) { try { const dt = new DataTransfer(); dt.setData("text/plain", text); return editor.dispatchEvent(new ClipboardEvent("paste", {clipboardData: dt, bubbles: true, cancelable: true})); } catch { return false; } }

  async function pasteReviewDiff(text, expectedConversation) {
    assertConversation(expectedConversation); const editor = await waitFor(composer, 30000), root = rootFor(editor); assertConversation(expectedConversation);
    if (editorText(editor) || attachmentCandidates(root).length > 0) throw new Error("ChatGPT composer is not empty; automatic ReviewDiff delivery will not mix with an existing draft or attachment.");
    const beforeAttachments = attachmentCandidates(root).length, beforeUserMessages = userMessageCount(); let lastMutation = Date.now(); const observer = new MutationObserver(() => { lastMutation = Date.now(); }); observer.observe(root, {subtree: true, childList: true, characterData: true, attributes: true});
    try {
      editor.focus(); await navigator.clipboard.writeText(text); let pasteIssued = false; try { pasteIssued = document.execCommand("paste"); } catch {} if (!pasteIssued) dispatchSyntheticPaste(editor, text);
      await waitFor(() => attachmentCandidates(root).length > beforeAttachments || editorText(editor).length > 0, 15000);
      const deadline = Date.now() + 15000;
      while (Date.now() < deadline) {
        assertConversation(expectedConversation);
        if (attachmentCandidates(root).length > beforeAttachments) { await waitFor(() => attachmentCandidates(root).length > beforeAttachments && !busy(root), 120000, 250); return {mode: "attachment", editor, root, beforeAttachments, beforeUserMessages}; }
        const b = sendButton(root); if (editorText(editor) && !busy(root) && b && !b.disabled && b.getAttribute("aria-disabled") !== "true" && Date.now() - lastMutation >= 1500) return {mode: "text", editor, root, beforeAttachments, beforeUserMessages};
        await sleep(100);
      }
      throw new Error("ChatGPT paste did not reach a stable text or attachment state.");
    } finally { observer.disconnect(); }
  }

  async function sendPrepared(prepared, expectedConversation, stageSend, guard) {
    const {editor, root, beforeAttachments, beforeUserMessages} = prepared; await guard(); assertConversation(expectedConversation);
    const button = await waitFor(() => { const b = sendButton(root); return b && !b.disabled && b.getAttribute("aria-disabled") !== "true" && !busy(root) ? b : null; }, 120000, 200);
    await guard(); assertConversation(expectedConversation); await stageSend(); assertConversation(expectedConversation); button.click();
    try { await waitFor(() => editorText(editor).length === 0 && attachmentCandidates(root).length <= beforeAttachments && !busy(root) && userMessageCount() > beforeUserMessages, 30000, 200); return true; } catch { return false; }
  }

  async function findFileInput(expectedConversation) { assertConversation(expectedConversation); let input = document.querySelector('input[type="file"]'); if (input) return input; const editor = await waitFor(composer, 30000), root = rootFor(editor); const attach = root.querySelector('button[data-testid*="file" i],button[aria-label*="Attach" i],button[aria-label*="file" i],button[aria-label*="прикреп" i]'); if (attach) attach.click(); return waitFor(() => document.querySelector('input[type="file"]'), 5000); }
  async function attachSnapshot(blob, fileName, expectedConversation, guard) { const input = await findFileInput(expectedConversation); const editor = await waitFor(composer, 30000), root = rootFor(editor); await guard(); assertConversation(expectedConversation); const file = new File([blob], fileName, {type: "application/zip", lastModified: Date.now()}); const transfer = new DataTransfer(); transfer.items.add(file); input.files = transfer.files; input.dispatchEvent(new Event("input", {bubbles: true})); input.dispatchEvent(new Event("change", {bubbles: true})); await waitFor(() => { const text = root.innerText || root.textContent || ""; return text.includes(fileName) || attachmentCandidates(root).some(n => (n.innerText || n.textContent || "").includes(fileName)); }, 30000, 150); await waitFor(() => !busy(root), 120000, 250); assertConversation(expectedConversation); }
  return {conversationKey, assertConversation, requireEmptyReviewComposer, pasteReviewDiff, sendPrepared, attachSnapshot};
})();
