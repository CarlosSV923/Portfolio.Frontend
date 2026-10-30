import { describe, expect, it } from "vitest";

import { bindingKey, isHandledByTarget } from "./use-game-keys";

/** Stand-in for an element nested inside the given selector's match. */
const inside = (selector: string) =>
  ({
    closest: (query: string) => (query.includes(selector) ? {} : null),
  }) as unknown as EventTarget;

describe("bindingKey", () => {
  it("lowercases single characters and keeps key names", () => {
    expect(bindingKey("W")).toBe("w");
    expect(bindingKey(" ")).toBe(" ");
    expect(bindingKey("ArrowUp")).toBe("ArrowUp");
  });
});

describe("isHandledByTarget", () => {
  it("leaves Space and Enter to focused buttons and links", () => {
    expect(isHandledByTarget(" ", inside("button"))).toBe(true);
    expect(isHandledByTarget("Enter", inside("button"))).toBe(true);
  });

  it("still lets arrows and letters steer while a button has focus", () => {
    expect(isHandledByTarget("ArrowUp", inside("button"))).toBe(false);
    expect(isHandledByTarget("w", inside("button"))).toBe(false);
  });

  it("leaves every key to form fields", () => {
    expect(isHandledByTarget("ArrowUp", inside("input"))).toBe(true);
  });

  it("handles keys aimed at the page itself", () => {
    expect(isHandledByTarget(" ", null)).toBe(false);
    expect(isHandledByTarget(" ", inside("main"))).toBe(false);
  });
});
