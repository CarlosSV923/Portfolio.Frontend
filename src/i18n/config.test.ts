import { describe, expect, it } from "vitest";

import { isLanguage, matchLanguage, otherLanguage } from "./config";

describe("matchLanguage", () => {
  it("falls back to Spanish without a header", () => {
    expect(matchLanguage(null)).toBe("es");
    expect(matchLanguage("")).toBe("es");
  });

  it("matches a supported language ignoring the region", () => {
    expect(matchLanguage("en-US,en;q=0.9")).toBe("en");
    expect(matchLanguage("es-EC")).toBe("es");
  });

  it("skips unsupported languages and honors weights", () => {
    expect(matchLanguage("fr-FR,fr;q=0.9,en;q=0.8,es;q=0.7")).toBe("en");
    expect(matchLanguage("es;q=0.4,en;q=0.6")).toBe("en");
  });

  it("ignores languages with zero weight", () => {
    expect(matchLanguage("en;q=0,fr")).toBe("es");
  });
});

describe("isLanguage", () => {
  it("accepts only supported languages", () => {
    expect(isLanguage("es")).toBe(true);
    expect(isLanguage("en")).toBe(true);
    expect(isLanguage("fr")).toBe(false);
    expect(isLanguage("EN")).toBe(false);
  });
});

describe("otherLanguage", () => {
  it("returns the alternate language", () => {
    expect(otherLanguage("es")).toBe("en");
    expect(otherLanguage("en")).toBe("es");
  });
});
