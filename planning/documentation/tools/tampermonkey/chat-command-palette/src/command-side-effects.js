(function (root, factory) {
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const SIDE_EFFECT_MARKER='PLANNING_COMMAND_SIDE_EFFECT';
  const CHAT_CONTEXT_STORAGE_KEY='obsPlanningHelper:chatContextCaptures:v1';
  const UUID_V4=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const COMMAND_SIDE_EFFECTS=Object.freeze({
    'replacement_archive.create':Object.freeze(['capture-chat-context'])
  });

  function defaultRandomUUID(){
    const cryptoApi=globalThis.crypto;
    if(!cryptoApi||typeof cryptoApi.randomUUID!=='function')throw new Error('Command side effect requires crypto.randomUUID().');
    return cryptoApi.randomUUID();
  }

  function commandSideEffectIds(commandId){return [...(COMMAND_SIDE_EFFECTS[String(commandId||'').trim()]||[])];}

  function ordinaryChatContext(locationLike=globalThis.location,title=(globalThis.document&&globalThis.document.title)||''){
    const origin=String(locationLike?.origin||'');
    const pathname=String(locationLike?.pathname||'');
    const match=pathname.match(/^\/c\/([A-Za-z0-9_-]{8,})\/?$/);
    if(origin!=='https://chatgpt.com'||!match)throw new Error('Bind this invocation requires an ordinary https://chatgpt.com/c/<conversation> tab.');
    const conversationKey=match[1];
    const observedTitle=String(title||'').replace(/\s*[|–—-]\s*ChatGPT\s*$/i,'').trim()||`Chat ${conversationKey.slice(0,8)}`;
    return{conversationKey,observedTitle};
  }

  function readCaptureStore(storage=globalThis.sessionStorage){
    if(!storage||typeof storage.getItem!=='function'||typeof storage.setItem!=='function')throw new Error('Bind this invocation requires sessionStorage in the current ChatGPT tab.');
    const raw=storage.getItem(CHAT_CONTEXT_STORAGE_KEY);
    if(!raw)return{schemaVersion:1,captures:{}};
    try{
      const parsed=JSON.parse(raw);
      if(parsed&&parsed.schemaVersion===1&&parsed.captures&&typeof parsed.captures==='object'&&!Array.isArray(parsed.captures))return parsed;
    }catch(_){}
    throw new Error('Stored ChatGPT context capture data is invalid; clear this tab session before retrying binding.');
  }

  function persistChatContextCapture(chatContextToken,context={}){
    const token=String(chatContextToken||'').trim();
    if(!UUID_V4.test(token))throw new Error('capture-chat-context requires a UUID v4 chatContextToken.');
    const storage=context.storage||globalThis.sessionStorage;
    const chat=ordinaryChatContext(context.location||globalThis.location,context.title===undefined?(globalThis.document&&globalThis.document.title)||'':context.title);
    const store=readCaptureStore(storage);
    if(Object.prototype.hasOwnProperty.call(store.captures,token))throw new Error('capture-chat-context token already exists in this tab session.');
    const capturedAt=String(typeof context.now==='function'?context.now():new Date().toISOString());
    store.captures[token]={chatContextToken:token,conversationKey:chat.conversationKey,observedTitle:chat.observedTitle,capturedAt};
    storage.setItem(CHAT_CONTEXT_STORAGE_KEY,JSON.stringify(store));
    return store.captures[token];
  }

  function buildCaptureChatContextBody(chatContextToken){
    const token=String(chatContextToken||'').trim();
    if(!UUID_V4.test(token))throw new TypeError('capture-chat-context requires a UUID v4 chatContextToken.');
    return[
      `[${SIDE_EFFECT_MARKER}]`,
      'effect:',
      '  capture-chat-context',
      '',
      'chatContextToken:',
      `  ${token}`,
      '',
      'obsAction:',
      '  required:',
      '    true',
      '  field:',
      '    chatContextToken',
      '  exactValue:',
      `    ${token}`,
      '  scope:',
      '    this-invocation-only',
      '  carryForward:',
      '    false',
      `[/${SIDE_EFFECT_MARKER}]`
    ].join('\n');
  }

  async function captureChatContextSideEffect(context={}){
    const randomUUID=typeof context.randomUUID==='function'?context.randomUUID:defaultRandomUUID;
    const chatContextToken=String(randomUUID()).trim();
    if(!UUID_V4.test(chatContextToken))throw new Error('capture-chat-context generated an invalid UUID v4 chatContextToken.');
    const capture=persistChatContextCapture(chatContextToken,context);
    return{body:buildCaptureChatContextBody(chatContextToken),chatContextToken,capture};
  }

  const DEFAULT_SIDE_EFFECT_HANDLERS=Object.freeze({'capture-chat-context':captureChatContextSideEffect});

  function normalizeEffectIds(value){
    if(value==null)return[];
    if(!Array.isArray(value))throw new TypeError('Command invocation side effects must be an array.');
    return value.map((item)=>String(item||'').trim()).filter(Boolean);
  }

  async function applyCommandSideEffects(commandId,commandBody,options={}){
    const id=String(commandId||'').trim(),base=String(commandBody==null?'':commandBody);
    const allowed=normalizeEffectIds((options.bindings||COMMAND_SIDE_EFFECTS)[id]);
    const effectIds=normalizeEffectIds(options.effectIds);
    if(!effectIds.length)return base;
    for(const effectId of effectIds)if(!allowed.includes(effectId))throw new Error(`Command side effect ${effectId} is not registered for ${id||'<empty>'}.`);
    const handlers=options.handlers||DEFAULT_SIDE_EFFECT_HANDLERS,appended=[];
    for(const effectId of effectIds){
      const handler=handlers[effectId];
      if(typeof handler!=='function')throw new Error(`Unknown command side effect: ${effectId}`);
      const result=await handler({commandId:id,commandBody:base,randomUUID:options.randomUUID,storage:options.storage,location:options.location,title:options.title,now:options.now});
      const body=typeof result==='string'?result:result?.body;
      if(typeof body!=='string'||!body.trim())throw new Error(`Command side effect ${effectId} returned no body.`);
      appended.push(body);
    }
    return[base,...appended].join('\n\n');
  }

  return{SIDE_EFFECT_MARKER,CHAT_CONTEXT_STORAGE_KEY,UUID_V4,COMMAND_SIDE_EFFECTS,DEFAULT_SIDE_EFFECT_HANDLERS,commandSideEffectIds,ordinaryChatContext,readCaptureStore,persistChatContextCapture,buildCaptureChatContextBody,captureChatContextSideEffect,applyCommandSideEffects};
});
