import { describe, test, expect } from "vitest";
import { getToeUpValues, type Gauge } from "./toe-up";

/**
 * NOTE:
 * - These expectations are computed from your formulas and match the table you screenshotted.
 * - We assert all fields that depend only on x-gauge & circumference,
 *   and include a couple of explicit checks for heelAndGussetLength (needs y-gauge).
 */

type Case = {
  circIn: number;
  gauge: Gauge;
  // expected values from the table / formulas
  sockStitches: number;
  castOnStitches: number;
  gussetStitchesPerSide: number;
  stitchCountBeforeHeelTurn: number;
  heelStitches: number;
  heelBaseStitches: number;
  legStartStitches: number;
  heelAndGussetLength: number;
};

// Fixtures
const cases: Case[] = [
  {
    circIn: 5,
    gauge: { x: 7.5, y: 9 },
    sockStitches: 34,
    castOnStitches: 14,
    gussetStitchesPerSide: 7,
    stitchCountBeforeHeelTurn: 48,
    heelStitches: 17,
    heelBaseStitches: 7,
    legStartStitches: 36,
    heelAndGussetLength: 2.5,
  },
];

describe("getToeUpValues", () => {
  test.each(cases)(
    'computes values for circ=$circIn", x=$gauge.x, y=$gauge.y',
    ({ circIn, gauge, ...exp }) => {
      const v = getToeUpValues(gauge, circIn, false);

      // fields independent of y
      expect(v.sockStitches).toBe(exp.sockStitches);
      expect(v.castOnStitches).toBe(exp.castOnStitches);
      expect(v.gussetStitchesPerSide).toBe(exp.gussetStitchesPerSide);
      expect(v.stitchCountBeforeHeelTurn).toBe(exp.stitchCountBeforeHeelTurn);
      expect(v.heelStitches).toBe(exp.heelStitches);
      expect(v.heelBaseStitches).toBe(exp.heelBaseStitches);
      expect(v.legStartStitches).toBe(exp.legStartStitches);
      expect(v.heelAndGussetLength).toBe(exp.heelAndGussetLength);
    },
  );

  test("narrow foot flag affects cast-on rounding as expected", () => {
    const circIn = 9;
    const gauge: Gauge = { x: 8, y: 12 };
    const wide = getToeUpValues(gauge, circIn, false);
    const narrow = getToeUpValues(gauge, circIn, true);

    // With S=64, quarterIncrease=10.75 → ceil*4=44 (diff) vs floor*4=40
    expect(wide.castOnStitches).toBe(24); // 64 - 44
    expect(narrow.castOnStitches).toBe(20); // 64 - 40
  });
});
