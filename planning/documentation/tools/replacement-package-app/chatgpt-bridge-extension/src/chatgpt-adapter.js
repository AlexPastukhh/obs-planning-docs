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
  function userMessageCount() { return document.querySelectorAll('[data-message-author-role="user"]').length; }
  function busy(root) { return !!root?.querySelector('[role="progressbar"],[aria-busy="true"],[data-state="loading"],[data-testid*="progress" i],[class*="upload" i][class*="progress" i]'); }
  function sendButton(root) { for (const selector of ['button[data-testid="send-button"]','button[data-testid*="send" i]','button[aria-label="Send prompt"]','button[aria-label^="Send" i]','button[aria-label^="Отправ" i]']) { const b = root?.querySelector(selector) || document.querySelector(selector); if (b) return b; } return null; }
  function readySendButton(root) { const b = sendButton(root); return b && b.isConnected && !b.disabled && b.getAttribute("aria-disabled") !== "true" && !busy(rootFor(composer()) || root) ? b : null; }
  async function requireEmptyReviewComposer(expectedConversation) { assertConversation(expectedConversation); const editor = await waitFor(composer, 30000), root = rootFor(editor); assertConversation(expectedConversation); if (editorText(editor) || attachmentCandidates(root).length > 0) throw new Error("ChatGPT composer is not empty; automatic ReviewDiff delivery will not mix with an existing draft or attachment."); }
  async function waitFor(fn, timeout = 30000, interval = 100) { const end = Date.now() + timeout; let lastError; while (Date.now() < end) { try { const value = fn(); if (value) return value; } catch (e) { lastError = e; } await sleep(interval); } if (lastError) throw lastError; throw new Error("Timed out waiting for ChatGPT composer state."); }
  function directInsert(editor, text) {
    editor.focus();
    if ("value" in editor && typeof editor.value === "string") {
      const proto = editor instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
      if (!setter) throw new Error("ChatGPT text composer setter is unavailable.");
      setter.call(editor, text); editor.dispatchEvent(new InputEvent("input", {bubbles: true, inputType: "insertText", data: text})); return;
    }
    let inserted = false; try { inserted = document.execCommand("insertText", false, text); } catch {}
    if (!inserted) throw new Error("ChatGPT direct composer insertion was rejected.");
    editor.dispatchEvent(new InputEvent("input", {bubbles: true, inputType: "insertText", data: text}));
  }
  function exactPrepared(editor, text) { const raw = editorRawText(editor); return raw === text || (editor.innerText || "") === text || (editor.textContent || "") === text; }

  async function prepareReviewDiff(text, expectedConversation) {
    assertConversation(expectedConversation); const editor = await waitFor(composer, 30000), root = rootFor(editor); assertConversation(expectedConversation);
    if (editorText(editor) || attachmentCandidates(root).length > 0) throw new Error("ChatGPT composer is not empty; automatic ReviewDiff delivery will not mix with an existing draft or attachment.");
    const beforeAttachments = attachmentCandidates(root).length, beforeUserMessages = userMessageCount();
    directInsert(editor, text); assertConversation(expectedConversation);
    await waitFor(() => exactPrepared(editor, text), 15000, 100);
    await waitFor(() => readySendButton(root), 120000, 200);
    assertConversation(expectedConversation); if (!exactPrepared(editor, text)) throw new Error("ChatGPT composer content changed after direct preparation.");
    return {mode: "text", editor, root, beforeAttachments, beforeUserMessages};
  }

  async function sendPrepared(prepared, expectedConversation, stageSend, guard) {
    const {root, beforeAttachments, beforeUserMessages} = prepared; await guard(); assertConversation(expectedConversation);
    await waitFor(() => readySendButton(root), 120000, 200);
    await guard(); assertConversation(expectedConversation); await stageSend(); assertConversation(expectedConversation);
    const button = readySendButton(root); if (!button) throw new Error("ChatGPT Send control changed before the staged send could be clicked."); button.click();
    try { await waitFor(() => { const liveEditor = composer(); if (!liveEditor) return false; const liveRoot = rootFor(liveEditor); return editorText(liveEditor).length === 0 && attachmentCandidates(liveRoot).length <= beforeAttachments && !busy(liveRoot) && userMessageCount() > beforeUserMessages; }, 30000, 200); return true; } catch { return false; }
  }

  async function findFileInput(expectedConversation) { assertConversation(expectedConversation); let input = document.querySelector('input[type="file"]'); if (input) return input; const editor = await waitFor(composer, 30000), root = rootFor(editor); const attach = root.querySelector('button[data-testid*="file" i],button[aria-label*="Attach" i],button[aria-label*="file" i],button[aria-label*="прикреп" i]'); if (attach) attach.click(); return waitFor(() => document.querySelector('input[type="file"]'), 5000); }
  async function attachSnapshot(blob, fileName, expectedConversation, guard) { const input = await findFileInput(expectedConversation); const editor = await waitFor(composer, 30000), root = rootFor(editor); await guard(); assertConversation(expectedConversation); const file = new File([blob], fileName, {type: "application/zip", lastModified: Date.now()}); const transfer = new DataTransfer(); transfer.items.add(file); input.files = transfer.files; input.dispatchEvent(new Event("input", {bubbles: true})); input.dispatchEvent(new Event("change", {bubbles: true})); await waitFor(() => { const text = root.innerText || root.textContent || ""; return text.includes(fileName) || attachmentCandidates(root).some(n => (n.innerText || n.textContent || "").includes(fileName)); }, 30000, 150); await waitFor(() => !busy(root), 120000, 250); assertConversation(expectedConversation); }
  return {conversationKey, assertConversation, requireEmptyReviewComposer, prepareReviewDiff, sendPrepared, attachSnapshot};
})();
