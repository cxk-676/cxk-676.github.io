import test from 'node:test';
import assert from 'node:assert/strict';
import {getOfficialAnswer} from '../lib/official-knowledge.ts';
test('off-campus access question returns a sourced guide rather than fake seat availability',()=>{
  const answer=getOfficialAnswer('在家怎么访问图书馆数据库');
  assert.ok(answer);
  assert.equal(new URL(answer.source).hostname,'lib.cdut.edu.cn');
  assert.ok(answer.steps.some(line=>line.includes('WEBVPN')));
});
test('unsupported questions do not invent official instructions',()=>{
  assert.equal(getOfficialAnswer('明天教室实时占用情况'),null);
});

 test("off-campus dining does not match the library guide",()=>{assert.equal(getOfficialAnswer("校外吃饭推荐"),null);});
