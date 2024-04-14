import { assertEquals, assertThrows } from "@std/assert";
import { err, ok, safeTry, safeTrySync, unwrap } from "./mod.ts";

Deno.test("safeTry", async () => {
  // deno-lint-ignore require-await
  const result = await safeTry(async () => {
    return 42;
  });

  const expected = ok(42);

  assertEquals(result, expected);
});

Deno.test("safeTry with error", async () => {
  // deno-lint-ignore require-await
  const result = await safeTry(async () => {
    throw new Error("Boom!");
  });

  const expected = err(new Error("Boom!"));

  assertEquals(result, expected);
});

Deno.test("safeTrySync", () => {
  const result = safeTrySync(() => {
    return 42;
  });

  const expected = ok(42);

  assertEquals(result, expected);
});

Deno.test("safeTrySync with error", () => {
  const result = safeTrySync(() => {
    throw new Error("Boom!");
  });

  const expected = err(new Error("Boom!"));

  assertEquals(result, expected);
});

Deno.test("unwrap", () => {
  const result = ok(42);

  const expected = 42;

  assertEquals(unwrap(result), expected);
});

Deno.test("unwrap with error", () => {
  const result = err(new Error("Boom!"));

  assertThrows(() => unwrap(result), Error, "Boom!");
});
