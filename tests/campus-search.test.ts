import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSearchUrl } from '../lib/campus-services.ts';

test('campus search restricts the external query to the university domain', () => {
  const url = new URL(buildSearchUrl('  奖学金  ', 'campus')!);
  assert.equal(url.origin, 'https://www.baidu.com');
  assert.equal(url.searchParams.get('wd'), 'site:cdut.edu.cn 奖学金');
});
test('web search preserves special characters as query text rather than parameters', () => {
  const url = new URL(buildSearchUrl('校园 & 学习 #1', 'web')!);
  assert.equal(url.searchParams.get('wd'), '校园 & 学习 #1');
  assert.equal([...url.searchParams].length, 1);
});
test('empty and local queries do not open external search pages', () => {
  assert.equal(buildSearchUrl('  ', 'web'), null);
  assert.equal(buildSearchUrl('图书馆', 'site'), null);
});
