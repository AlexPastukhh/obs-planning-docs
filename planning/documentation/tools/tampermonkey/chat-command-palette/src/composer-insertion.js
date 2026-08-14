(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsPlanningHelper = Object.assign(root.ObsPlanningHelper || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function isVisibleComposer(element) { return Boolean(element && element.getClientRects().length > 0 && !element.hasAttribute('disabled')); }
  function findComposer(doc = document) {
    for (const selector of ['#prompt-textarea[contenteditable="true"]','[data-testid="composer-textarea"][contenteditable="true"]','textarea[data-testid="composer-textarea"]']) {
      const element=doc.querySelector(selector); if (isVisibleComposer(element)) return { element, selector, fallback:false };
    }
    for (const selector of ['textarea[placeholder]','[contenteditable="true"][role="textbox"]']) {
      for (const element of doc.querySelectorAll(selector)) if (isVisibleComposer(element)) return { element, selector, fallback:true };
    }
    return { element:null, selector:null, fallback:true };
  }
  function getComposerText(element) { if (typeof HTMLTextAreaElement !== 'undefined' && (element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement)) return element.value || ''; return element.textContent || ''; }
  function moveCaretToEnd(element) { const selection=window.getSelection(); if (!selection) return; const range=document.createRange(); range.selectNodeContents(element); range.collapse(false); selection.removeAllRanges(); selection.addRange(range); }
  function dispatchInputEvent(element, data) { try { element.dispatchEvent(new InputEvent('input',{bubbles:true,composed:true,inputType:'insertText',data})); } catch (_) { element.dispatchEvent(new Event('input',{bubbles:true,composed:true})); } }
  function diagnostic(startedAt, foundAt, readAt, finishedAt, found, commandId, current, text, ok, reason) {
    console.debug('[OBS Planning Helper insertion]',{
      commandId,ok,reason,selector:found.selector,fallbackSelector:found.fallback,draftLength:current.length,bodyLength:text.length,
      findMs:Number((foundAt-startedAt).toFixed(2)),readMs:Number((readAt-foundAt).toFixed(2)),insertMs:Number((finishedAt-readAt).toFixed(2)),totalMs:Number((finishedAt-startedAt).toFixed(2))
    });
  }
  function insertIntoComposer(text, commandId=null) {
    const startedAt=performance.now(); const found=findComposer(); const foundAt=performance.now(); const composer=found.element;
    if (!composer) { console.debug('[OBS Planning Helper insertion]',{commandId,ok:false,reason:'composer-not-found',findMs:Number((foundAt-startedAt).toFixed(2)),bodyLength:text.length}); return {ok:false,reason:'composer-not-found'}; }
    let current=''; let readAt=foundAt;
    try {
      composer.focus(); current=getComposerText(composer); readAt=performance.now(); const hasText=current.trim().length>0; const addition=hasText?`\n\n${text}`:text;
      if (typeof HTMLTextAreaElement !== 'undefined' && (composer instanceof HTMLTextAreaElement || composer instanceof HTMLInputElement)) {
        const next=hasText?`${current}\n\n${text}`:text; const proto=composer instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype; const setter=Object.getOwnPropertyDescriptor(proto,'value')?.set; if (setter) setter.call(composer,next); else composer.value=next; dispatchInputEvent(composer,addition);
      } else {
        moveCaretToEnd(composer); let inserted=false; try { inserted=document.execCommand('insertText',false,addition); } catch (_) { inserted=false; }
        if (!inserted) { const rejectedAt=performance.now(); diagnostic(startedAt,foundAt,readAt,rejectedAt,found,commandId,current,text,false,'contenteditable-insert-rejected'); return {ok:false,reason:'contenteditable-insert-rejected'}; }
      }
      const finishedAt=performance.now(); diagnostic(startedAt,foundAt,readAt,finishedAt,found,commandId,current,text,true,undefined); return {ok:true};
    } catch (error) {
      const failedAt=performance.now(); diagnostic(startedAt,foundAt,readAt,failedAt,found,commandId,current,text,false,error instanceof Error ? error.message : String(error)); return {ok:false,reason:'composer-mutation-failed',error};
    }
  }
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (_) { const textarea=document.createElement('textarea'); textarea.value=text; textarea.style.position='fixed'; textarea.style.opacity='0'; document.body.appendChild(textarea); textarea.select(); let copied=false; try { copied=document.execCommand('copy'); } finally { textarea.remove(); } return copied; }
  }
  return { isVisibleComposer, findComposer, getComposerText, insertIntoComposer, copyText };
});
