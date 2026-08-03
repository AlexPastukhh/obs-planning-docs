(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const FEEDBACK_SEVERITIES = Object.freeze({ INFO: 'info', SUCCESS: 'success', WARNING: 'warning', ERROR: 'error' });
  const FEEDBACK_SCOPES = Object.freeze({ GLOBAL: 'global', NOTES: 'notes', FILES: 'files', CATEGORIES: 'categories', PICKER: 'picker' });

  function text(value) { return String(value == null ? '' : value); }
  function createFeedback(input = {}) {
    const severity = Object.values(FEEDBACK_SEVERITIES).includes(input.severity) ? input.severity : FEEDBACK_SEVERITIES.ERROR;
    const scope = Object.values(FEEDBACK_SCOPES).includes(input.scope) ? input.scope : FEEDBACK_SCOPES.GLOBAL;
    const id = text(input.id).trim() || `feedback-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
    const actions = (Array.isArray(input.actions) ? input.actions : []).map((action) => ({
      id: text(action && action.id).trim(),
      label: text(action && action.label).trim(),
      kind: text(action && action.kind).trim() || 'button'
    })).filter((action) => action.id && action.label);
    const partialResults = (Array.isArray(input.partialResults) ? input.partialResults : []).map((result) => ({
      target: text(result && result.target),
      status: text(result && result.status) || 'unknown',
      message: text(result && result.message)
    }));
    return {
      id,
      scope,
      severity,
      title: text(input.title).trim() || (severity === 'error' ? 'Action failed' : 'Status'),
      message: text(input.message).trim(),
      target: text(input.target).trim(),
      details: text(input.details).trim(),
      actions,
      partialResults,
      dismissible: input.dismissible !== false,
      createdAt: text(input.createdAt).trim() || new Date().toISOString()
    };
  }

  function feedbackFromError(error, input = {}) {
    const value = error instanceof Error ? error : new Error(text(error) || 'Unknown error.');
    return createFeedback({
      ...input,
      severity: FEEDBACK_SEVERITIES.ERROR,
      message: input.message || value.message || 'Unknown error.',
      details: input.details || text(value.kind || value.name || ''),
      actions: input.actions || value.feedbackActions || [],
      partialResults: input.partialResults || value.partialResults || []
    });
  }

  function replaceFeedback(items, feedback) {
    const normalized = createFeedback(feedback);
    return [...(Array.isArray(items) ? items : []).filter((item) => item && item.id !== normalized.id), normalized];
  }

  function dismissFeedback(items, id) {
    return (Array.isArray(items) ? items : []).filter((item) => item && item.id !== id);
  }

  function feedbackForScope(items, scope) {
    return (Array.isArray(items) ? items : []).filter((item) => item && (item.scope === scope || item.scope === FEEDBACK_SCOPES.GLOBAL));
  }

  return { FEEDBACK_SEVERITIES, FEEDBACK_SCOPES, createFeedback, feedbackFromError, replaceFeedback, dismissFeedback, feedbackForScope };
});
