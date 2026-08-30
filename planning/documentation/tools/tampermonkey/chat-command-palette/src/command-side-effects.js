(function (root, factory) {
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ObsPlanningHelper=Object.assign(root.ObsPlanningHelper||{},api);
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const SIDE_EFFECT_MARKER='PLANNING_COMMAND_SIDE_EFFECT';
  const COMMAND_SIDE_EFFECTS=Object.freeze({
    'replacement_archive.create':Object.freeze(['capture-chat-context'])
  });

  function defaultRandomUUID(){
    const cryptoApi=globalThis.crypto;
    if(!cryptoApi||typeof cryptoApi.randomUUID!=='function')throw new Error('Command side effect requires crypto.randomUUID().');
    return cryptoApi.randomUUID();
  }

  function buildCaptureChatContextBody(chatContextToken){
    const token=String(chatContextToken||'').trim();
    if(!token)throw new TypeError('capture-chat-context requires a non-empty chatContextToken.');
    return[
      `[${SIDE_EFFECT_MARKER}]`,
      'effect:',
      '  capture-chat-context',
      '',
      'chatContextToken:',
      `  ${token}`,
      `[/${SIDE_EFFECT_MARKER}]`
    ].join('\n');
  }

  async function captureChatContextSideEffect(context={}){
    const randomUUID=typeof context.randomUUID==='function'?context.randomUUID:defaultRandomUUID;
    const chatContextToken=String(randomUUID()).trim();
    if(!chatContextToken)throw new Error('capture-chat-context generated an empty chatContextToken.');
    return{body:buildCaptureChatContextBody(chatContextToken),chatContextToken};
  }

  const DEFAULT_SIDE_EFFECT_HANDLERS=Object.freeze({
    'capture-chat-context':captureChatContextSideEffect
  });

  function normalizeEffectIds(value){
    if(value==null)return[];
    if(!Array.isArray(value))throw new TypeError('Command side-effect binding must be an array.');
    return value.map((item)=>String(item||'').trim()).filter(Boolean);
  }

  async function applyCommandSideEffects(commandId,commandBody,options={}){
    const id=String(commandId||'').trim(),base=String(commandBody==null?'':commandBody);
    const bindings=options.bindings||COMMAND_SIDE_EFFECTS,handlers=options.handlers||DEFAULT_SIDE_EFFECT_HANDLERS;
    const effectIds=normalizeEffectIds(bindings[id]);
    if(!effectIds.length)return base;
    const appended=[];
    for(const effectId of effectIds){
      const handler=handlers[effectId];
      if(typeof handler!=='function')throw new Error(`Unknown command side effect: ${effectId}`);
      const result=await handler({commandId:id,commandBody:base,randomUUID:options.randomUUID});
      const body=typeof result==='string'?result:result?.body;
      if(typeof body!=='string'||!body.trim())throw new Error(`Command side effect ${effectId} returned no body.`);
      appended.push(body);
    }
    return[base,...appended].join('\n\n');
  }

  return{SIDE_EFFECT_MARKER,COMMAND_SIDE_EFFECTS,DEFAULT_SIDE_EFFECT_HANDLERS,buildCaptureChatContextBody,captureChatContextSideEffect,applyCommandSideEffects};
});
