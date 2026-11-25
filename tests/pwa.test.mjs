import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read=path=>fs.readFileSync(new URL('../'+path,import.meta.url));
const html=read('index.html').toString();
const manifest=JSON.parse(read('manifest.webmanifest').toString());
const sw=read('sw.js').toString();

test('HTML includes unchanged Supabase configuration and existing list storage keys',()=>{
  assert.match(html,/txnyhrotusrojlvqjeic\.supabase\.co/);
  assert.match(html,/la_gomera_shared_session_v2/);
  assert.match(html,/auth:\s*\{\s*persistSession:\s*true/);
  assert.match(html,/camp_join_list/);
  assert.match(html,/camp_create_list/);
});
test('checkboxes and data synchronization retained',()=>{
  for(const s of ['paulina_checked','nestor_checked','check_mode','camp_items','camp_categories','scheduleRefresh','subscribeCloud','Land Rover'])
    assert.ok(html.includes(s),s);
});
test('HTML inline scripts parse as JavaScript',()=>{
  const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
  assert.ok(scripts.length>=3);
  for(const match of scripts)assert.doesNotThrow(()=>new vm.Script(match[1]));
});
test('manifest points at separate project Pages',()=>{
  assert.equal(manifest.start_url,'/la-gomera-list/');
  assert.equal(manifest.scope,'/la-gomera-list/');
  assert.equal(manifest.display,'standalone');
  assert.equal(manifest.icons.length,2);
  assert.ok(html.includes('href="/la-gomera-list/manifest.webmanifest"'));
});
test('PWA worker serves separate path and does not cache Supabase responses',()=>{
  assert.doesNotThrow(()=>new vm.Script(sw));
  assert.ok(sw.includes('/la-gomera-list/'));
  assert.ok(!sw.includes('/camping-la-gomera/'));
  assert.match(sw,/url\.origin!==self\.location\.origin/);
  assert.match(sw,/Supabase data is never cached/);
});
test('icons are present and original PNG dimensions are valid',()=>{
  for(const size of [192,512]){
    const b=read('icons/icon-'+size+'.png');
    assert.equal(b.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
    assert.equal(b.readUInt32BE(16),size);
    assert.equal(b.readUInt32BE(20),size);
  }
});
test('no legacy root routing in new app',()=>{
  assert.ok(!html.includes('/camping-la-gomera/'));
  assert.ok(!html.includes("'/la-gomera.html'"));
  assert.ok(!sw.includes('/camping-la-gomera/'));
});
