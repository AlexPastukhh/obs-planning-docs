import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  HARD_INTEGRITY_TEST_NOTE,
  integrityMessage,
  exactCaseExists,
  resolveRepoRef,
  assertCanonicalOwnerIdentity,
  buildSemanticComponentOwnerIndex
} from './support/methodology-integrity.mjs';

/*
 * HARD METHODOLOGY INTEGRITY TEST SUPPORT
 *
 * A failure means a declared authority/reference/projection may be inconsistent; it does not
 * automatically mean the intended methodology change is wrong. Inspect canonical authority first.
 * Do not weaken/update the test merely to make it pass. Tests validate declarations; they do not
 * define methodology authority. See TESTING.METHODOLOGY-INTEGRITY.
 */

function fixture(){
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'methodology-integrity-'));
  fs.mkdirSync(path.join(root,'owners'),{recursive:true});
  fs.writeFileSync(path.join(root,'owners','A.md'),'<a id="owner-a"></a>\n# A\n\nResponsibility ID: `OWNER.A`\n\n<a id="owner-a-detail"></a>\n## Detail\n\n<a id="owner-b"></a>\n## B\n\nResponsibility ID: `OWNER.B`\n');
  fs.writeFileSync(path.join(root,'owners','Lens.md'),'<a id="lens-x"></a>\n# Lens X\n');
  fs.writeFileSync(path.join(root,'owners','UC.md'),'<a id="uc-demo"></a>\n# UC-DEMO — Demo\n');
  return root;
}

test('shared methodology-integrity resolver has explicit repair guidance and stable invariant diagnostics',()=>{
  assert.match(HARD_INTEGRITY_TEST_NOTE,/Do not weaken or update the test merely to make it pass/);
  const message=integrityMessage({invariant:'DEMO',source:'x',problem:'broken'});
  assert.match(message,/Was the canonical methodology change intentional/);
  assert.match(message,/Do not update\/weaken the test merely to make it pass/);
});

test('shared resolver proves exact-case path and Markdown/explicit anchor resolution independently of relation parsers',()=>{
  const root=fixture();
  assert.equal(exactCaseExists(root,'owners/A.md'),true);
  assert.equal(exactCaseExists(root,'owners/a.md'),false);
  assert.equal(resolveRepoRef(root,'source.md','owners/A.md#owner-a').rel,'owners/A.md');
  assert.equal(resolveRepoRef(root,'source.md','owners/A.md#owner-a',{anchorMode:'explicit'}).fragment,'owner-a');
  assert.throws(()=>resolveRepoRef(root,'source.md','owners/a.md#owner-a'),/Methodology Integrity/);
  assert.throws(()=>resolveRepoRef(root,'source.md','owners/A.md#missing'),/missing markdown anchor/);
});

test('canonical owner identity binds id to path while relation policy distinguishes canonical owner anchor from read entrypoint',()=>{
  const root=fixture();
  const componentOwners=buildSemanticComponentOwnerIndex([{kind:'LENS',ownerRef:{semanticId:'LENS-X',path:'owners/Lens.md',anchor:'lens-x'}}]);
  assert.doesNotThrow(()=>assertCanonicalOwnerIdentity({repoRoot:root,componentOwners,source:'fixture',responsibilityId:'OWNER.A',path:'owners/A.md',anchor:'owner-a'}));
  assert.doesNotThrow(()=>assertCanonicalOwnerIdentity({repoRoot:root,componentOwners,source:'fixture',responsibilityId:'OWNER.A',path:'owners/A.md',anchor:'owner-a-detail'}));
  assert.doesNotThrow(()=>assertCanonicalOwnerIdentity({repoRoot:root,componentOwners,source:'fixture',responsibilityId:'OWNER.A',path:'owners/A.md',anchor:'owner-a',anchorRole:'canonical-owner'}));
  assert.throws(()=>assertCanonicalOwnerIdentity({repoRoot:root,componentOwners,source:'fixture',responsibilityId:'OWNER.A',path:'owners/A.md',anchor:'owner-a-detail',anchorRole:'canonical-owner'}),/canonical owner anchor is/);
  assert.throws(()=>assertCanonicalOwnerIdentity({repoRoot:root,componentOwners,source:'fixture',responsibilityId:'OWNER.A',path:'owners/A.md',anchor:'owner-b'}),/canonical owner anchor of OWNER\.B/);
  assert.doesNotThrow(()=>assertCanonicalOwnerIdentity({repoRoot:root,componentOwners,source:'fixture',responsibilityId:'LENS-X',path:'owners/Lens.md',anchor:'lens-x'}));
  assert.doesNotThrow(()=>assertCanonicalOwnerIdentity({repoRoot:root,componentOwners,source:'fixture',responsibilityId:'LENS-X',path:'owners/Lens.md',anchor:'lens-x',anchorRole:'canonical-owner'}));
  assert.doesNotThrow(()=>assertCanonicalOwnerIdentity({repoRoot:root,componentOwners,source:'fixture',responsibilityId:'UC-DEMO',path:'owners/UC.md',anchor:'uc-demo'}));
  assert.throws(()=>assertCanonicalOwnerIdentity({repoRoot:root,componentOwners,source:'fixture',responsibilityId:'OWNER.A',path:'owners/Lens.md',anchor:'lens-x'}),/OWNER\.A is not declared as a Responsibility ID/);
  assert.throws(()=>assertCanonicalOwnerIdentity({repoRoot:root,componentOwners,source:'fixture',responsibilityId:'LENS-X',path:'owners/A.md',anchor:'owner-a'}),/resolves canonically to owners\/Lens\.md/);
});
