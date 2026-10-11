import test from "node:test";
import assert from "node:assert/strict";

import { createDemoOtp, hasDuplicateReservation } from "../lib/demo-storage.ts";

test("demo OTP is a six-digit local-only value", () => {
  assert.match(createDemoOtp(() => 0.123456), /^\d{6}$/);
  assert.equal(createDemoOtp(() => 0), "100000");
});

test("duplicate reservations match resource and time", () => {
  const records = [{ title: "东区图书馆二楼 08 号座位", time: "19:00–21:00" }];

  assert.equal(
    hasDuplicateReservation(records, {
      title: "东区图书馆二楼 08 号座位",
      time: "19:00–21:00",
    }),
    true,
  );
  assert.equal(
    hasDuplicateReservation(records, { title: "东区图书馆二楼 08 号座位", time: "14:00–16:00" }),
    false,
  );
});
