import test from 'node:test';
import assert from 'node:assert/strict';
import { calendarDays, addRecentSearch } from '../lib/portal-state.ts';
test('calendar aligns Sunday first and includes leap day',()=>{
  assert.deepEqual(calendarDays(2024,2).slice(0,5),[null,null,null,null,1]);
  assert.equal(calendarDays(2024,2).filter(Boolean).length,29);
  assert.equal(calendarDays(2026,11)[0],1);
});
test('recent searches trim, deduplicate and keep newest eight',()=>{
  assert.deepEqual(addRecentSearch(['地图','课表'],'  课表 '),['课表','地图']);
  assert.deepEqual(addRecentSearch(['地图'],'   '),['地图']);
  assert.equal(addRecentSearch(['a','b','c','d','e','f','g','h'],'新问题').length,8);
});
