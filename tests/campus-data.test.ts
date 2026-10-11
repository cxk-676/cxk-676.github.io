import test from "node:test";
import assert from "node:assert/strict";

import {
  getCapacityStatus,
  migrateLostItems,
} from "../lib/campus-data.ts";
import { resolveAgentScene } from "../lib/agent-skills.ts";

test("activity capacity statuses use the fixed red, yellow, green thresholds", () => {
  assert.deepEqual(getCapacityStatus(86), { color: "red", label: "即将满额" });
  assert.deepEqual(getCapacityStatus(50), { color: "yellow", label: "报名中" });
  assert.deepEqual(getCapacityStatus(49), { color: "green", label: "余量充足" });
});

test("lost-item migration corrects only the seeded black thermos address", () => {
  const migrated = migrateLostItems([
    { id: "1", title: "黑色保温杯", place: "旧版地点" },
    { id: "seed-thermos", title: "黑色保温杯", place: "旧教学楼", isSeed: true },
    { id: "student-thermos", title: "黑色保温杯", place: "学生发布地点", isSeed: false },
  ]);

  assert.equal(migrated[0].place, "东区教学楼 E1A 一楼");
  assert.equal(migrated[1].place, "东区教学楼 E1A 一楼");
  assert.equal(migrated[2].place, "学生发布地点");
});

test("agent keywords route study and lunch requests and explain unknown requests", () => {
  assert.equal(resolveAgentScene("今晚找安静教室自习").id, "study");
  assert.equal(resolveAgentScene("中午吃什么，避开高峰").id, "lunch");
  assert.equal(resolveAgentScene("帮我办一个不存在的业务").id, "unknown");
});

test("registered scene IDs resolve without keyword matching", () => {
  assert.equal(resolveAgentScene("study").id, "study");
  assert.equal(resolveAgentScene("lunch").id, "lunch");
  assert.equal(resolveAgentScene("library").id, "library");
});
