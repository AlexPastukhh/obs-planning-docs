import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const tests=fs.readdirSync(path.join(root,'tests')).filter(name=>name.endsWith('.test.mjs')).sort()
  .map(name=>path.join('tests',name));
if(!tests.length)throw new Error('No Planning Helper tests discovered');
const run=spawnSync(process.execPath,['--experimental-test-coverage','--test-reporter=lcov','--test',...tests],
  {cwd:root,encoding:'utf8',maxBuffer:32*1024*1024});
if(run.error)throw run.error;
if(run.status!==0){
  process.stderr.write(run.stderr||'');
  process.stderr.write(run.stdout.slice(-5000));
  throw new Error('Planning Helper tests or LCOV generation failed: '+run.status);
}
const sourceRoot='planning/documentation/tools/tampermonkey/chat-command-palette/';
let files=0;
const out=run.stdout.split('\n').map(line=>{
  if(!line.startsWith('SF:'))return line;
  const src=line.slice(3).replace(/\\/g,'/');
  if(path.isAbsolute(src)||src.split('/').includes('..'))
    throw new Error('LCOV path escaped package: '+src);
  files++;
  return 'SF:'+sourceRoot+src;
}).join('\n');
if(files<5||!out.includes('SF:'+sourceRoot+'src/rdg-lens-launcher.js')||
   !out.includes('SF:'+sourceRoot+'src/planning-helper-ui.js')||
   !out.includes('end_of_record'))
  throw new Error('LCOV missing expected Planning Helper source coverage');
const dir=path.join(root,'coverage');
fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'lcov.info'),out,'utf8');
console.log('LCOV generated from '+tests.length+' real Node test files; '+files+' source records');
