import test from 'node:test';
import assert from 'node:assert/strict';
import api from '../src/action-feedback.js';

test('feedback is contextual, persistent and carries retry or partial-result actions', () => {
  const item = api.feedbackFromError(Object.assign(new Error('Remote SHA changed.'), { kind: 'conflict', partialResults: [{ target: 'notes/a.md', status: 'completed' }] }), {
    id: 'category-save', scope: 'categories', title: 'Category was not saved', target: 'categories/programming.md', actions: [{ id: 'retry', label: 'Retry' }]
  });
  assert.equal(item.scope, 'categories');
  assert.equal(item.severity, 'error');
  assert.equal(item.message, 'Remote SHA changed.');
  assert.equal(item.target, 'categories/programming.md');
  assert.deepEqual(item.actions, [{ id: 'retry', label: 'Retry', kind: 'button' }]);
  assert.equal(item.partialResults[0].status, 'completed');
  assert.equal(item.dismissible, true);
});

test('feedback replacement and dismissal preserve unrelated scopes', () => {
  const a = api.createFeedback({ id: 'a', scope: 'notes', message: 'A' });
  const b = api.createFeedback({ id: 'b', scope: 'files', message: 'B' });
  const next = api.replaceFeedback([a, b], { id: 'a', scope: 'notes', severity: 'warning', message: 'A2' });
  assert.equal(next.length, 2);
  assert.equal(next.find((item) => item.id === 'a').message, 'A2');
  assert.deepEqual(api.feedbackForScope(next, 'files').map((item) => item.id), ['b']);
  assert.deepEqual(api.dismissFeedback(next, 'b').map((item) => item.id), ['a']);
});
