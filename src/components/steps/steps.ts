// src/steps.ts
import type { Component } from "vue";
import JudysMagicCastOn from "./JudysMagicCastOn.vue";

export interface Step {
  title: string;
  id: string;
  // Pass the full values object from getToeUpValues(...) to this function.
  instructions?: (v: {
    castOnStitches: number;
    sockStitches: number;
    heelAndGussetLength: number;
    gussetStitchesPerSide: number;
    stitchCountBeforeHeelTurn: number;
    heelStitches: number;
    heelBaseStitches: number;
    legStartStitches: number;
  }) => string;
  component?: Component;
}

export const steps: Step[] = [
  // 1) Toe — Judy's Magic Cast-On (component step)
  {
    id: "judys-magic-cast-on",
    title: "Judy's Magic Cast On",
    component: JudysMagicCastOn,
  },

  // 2) Toe increases (Rounds 1–2 repeat) until Sock Stitches reached
  {
    id: "toe-increases",
    title: "Toe Increases",
    instructions: ({ sockStitches }) =>
      `
Knit 1 round even, distributing stitches as needed for your needles.

ROUND 1 (increase round): K1, M1, knit to 1 st before center of round, M1, k2, M1, knit to 1 st before end of round, M1, K1 — 4 stitches increased.

ROUND 2: Knit.

Repeat Rounds 1 and 2 until there are ${sockStitches} Sock Stitches total.
(Note: The first half of each round forms the instep; the second half forms the sole. Arrange stitches if necessary so the sole stitches are grouped together.)
`.trim(),
  },

  // 3) Foot — work even to length before gusset/heel
  {
    id: "foot",
    title: "Foot",
    instructions: ({ heelAndGussetLength }) =>
      `
Work even in rounds until the sock measures ${heelAndGussetLength.toFixed(2)}" (Heel/Gusset Length) less than the finished sock foot length (as in the tables), measured from cast-on at tip of toe.
`.trim(),
  },

  // 4) Gusset increases — setup + repeat sequence until gusset per side reached
  {
    id: "gusset-increases",
    title: "Gusset Increases",
    instructions: ({ gussetStitchesPerSide, stitchCountBeforeHeelTurn }) =>
      `
Note: Keep increased gusset stitches grouped with the sole stitches; markers are placed around the heel stitches, and increases are worked at the edges of the sole stitches.

SET-UP ROUND: Knit instep stitches; M1R, place marker for heel, knit to end of round, place second heel marker, M1L — 2 gusset stitches increased.

ROUND 2: Knit.

ROUND 3: Knit instep stitches; M1R, knit to end of round, M1L — 2 gusset stitches increased.

ROUND 4: Knit.

Repeat Rounds 3 and 4 until you’ve increased ${gussetStitchesPerSide} Gusset Stitches per Side (at each side of the marked heel stitches) — ${stitchCountBeforeHeelTurn} Total Sock Plus Gusset Stitches.
`.trim(),
  },

  // 5) Heel turn — short rows across Heel Stitches, stop when Heel Base Stitches remain unwrapped
  {
    id: "heel-turn",
    title: "Heel Turn",
    instructions: ({ heelStitches, sockStitches, heelBaseStitches }) =>
      `
The heel is worked back and forth in short-rows on ${heelStitches} Heel Stitches between the heel markers, which correspond to half of the initial ${sockStitches} Sock Stitches.

HEEL TURN ROW 1 (RS): Knit to 1 st before second marker, wrap the next stitch, turn work.
HEEL TURN ROW 2 (WS): Purl to 1 st before marker, wrap the next stitch, turn work.
HEEL TURN ROW 3 (RS): Knit to 1 st before last wrapped stitch, wrap the next stitch, turn work.
HEEL TURN ROW 4 (WS): Purl to 1 st before last wrapped stitch, wrap the next stitch, turn work.

Repeat Heel Rows 3 and 4 until ${heelBaseStitches} Heel Base Stitches remain unwrapped in the center of the heel stitches, ending with a wrong-side row.

Remove the heel markers.
`.trim(),
  },

  // 6) Heel flap — decrease gusset stitches while working rows back and forth
  {
    id: "heel-flap",
    title: "Heel Flap",
    instructions: ({ heelStitches, legStartStitches }) =>
      `
Decrease the gusset stitches while working the heel flap as follows.

HEEL FLAP ROW 1 (RS): Knit to first wrapped stitch, *knit the wrapped stitch together with its wrap; repeat from * until 1 wrapped stitch remains, work the remaining wrapped stitch (together with its wrap) and the first gusset stitch together as ssk, turn work — 1 gusset stitch decreased.

HEEL FLAP ROW 2 (WS): Slip 1 purlwise with yarn in front, purl to first wrapped stitch, *purl the wrapped stitch together with its wrap; repeat from * until 1 wrapped stitch remains, work the remaining wrapped stitch (together with its wrap) and the first gusset stitch together as p2tog, turn work — 1 gusset stitch decreased.

Working back and forth on the center heel stitches, always stopping 1 stitch before the gusset, continue to work ${heelStitches} (Heel Stitches) − 2 between the initial slipped stitch and the gusset decrease each row as follows.

HEEL FLAP ROW 3 (RS): Slip 1 purlwise with yarn in back, knit to 1 stitch before gusset stitches, ssk, turn work — 1 gusset stitch decreased.
HEEL FLAP ROW 4 (WS): Slip 1 purlwise with yarn in front, purl to 1 stitch before gusset stitches, p2tog, turn work — 1 gusset stitch decreased.

Repeat Rows 3 and 4 until all but 2 gusset stitches have been decreased (one on each side), ending with a right-side row — ${legStartStitches} Leg Start Stitches remain. The final 2 gusset stitches will be decreased during the first round of the leg to keep the top of the heel tidy and to prevent holes from forming.
`.trim(),
  },

  // 7) Leg — setup round decreases the last 2 gusset sts, then knit leg
  {
    id: "leg",
    title: "Leg",
    instructions: ({ sockStitches }) =>
      `
With right side still facing, rejoin for working in rounds as follows.

SET-UP ROUND: Slip 1 purlwise with yarn in back, knit to 1 stitch before first gusset stitch, ssk; knit across instep stitches; k2tog, knit to end of sole stitches — 2 gusset stitches decreased; ${sockStitches} Sock Stitches remain.

Continue in stockinette until leg measures about 2" (5 cm) less than desired total length (see sock leg length tables).
`.trim(),
  },

  // 8) Cuff
  {
    id: "cuff",
    title: "Cuff",
    instructions: () =>
      `
Work in k1, p1 ribbing for 2" (5 cm). Alternatively, work in ribbing for the entire length of the leg.

Using a stretchy method, bind off all stitches.
`.trim(),
  },

  // 9) Finishing
  {
    id: "finishing",
    title: "Finishing",
    instructions: () =>
      `
Cut yarn. Weave in loose ends. Block as desired.
`.trim(),
  },
];
