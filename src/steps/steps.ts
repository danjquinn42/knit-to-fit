// src/steps.ts
import type { Component } from "vue";
import JudysMagicCastOn from "./JudysMagicCastOn.vue";

export interface Step {
  title: string;
  id: string;
  instructions?: (...args: any) => string;
  component?: Component;
}

export const steps: Step[] = [
  {
    id: "judys-magic-cast-on",
    title: "Judy's Magic Cast On",
    component: JudysMagicCastOn,
  },
  {
    id: "toe-increases",
    title: "Toe Increases",
    instructions: ({ sockStitches }: any) => `
      Knit 1 round even, distributing stitches depending on your needles.
      Round 1 (increase): K1, M1, knit to 1 st before center, M1, k2, M1, knit to 1 st before end, M1, K1 — 4 sts increased.
      Round 2: Knit even.
      Repeat until you have ${sockStitches} stitches total.
    `,
  },
  {
    id: "foot",
    title: "Foot",
    instructions: ({ footLength, heelLength }: any) => `
      Work even in rounds until sock measures ${footLength - heelLength} inches
      from cast-on (heel/instep shaping starts here).
    `,
  },
  {
    id: "gusset-increases",
    title: "Gusset Increases",
    instructions: ({ gussetStitches, totalSockStitches }: any) => `
      Set-up: Knit instep sts, M1R, place marker, knit sole sts, place marker, M1L.
      Round 2: Knit even.
      Round 3: Knit instep, M1R, knit to end of sole, M1L — 2 gusset sts increased.
      Repeat until ${gussetStitches} gusset stitches per side (${totalSockStitches} total).
    `,
  },
  {
    id: "heel-turn",
    title: "Heel Turn",
    instructions: ({ heelStitches }: any) => `
      Work short rows across ${heelStitches} heel stitches:
      Row 1 (RS): Knit to 1 st before marker, wrap & turn.
      Row 2 (WS): Purl to 1 st before marker, wrap & turn.
      Repeat until ${heelStitches / 2} remain unwrapped in center.
    `,
  },
  {
    id: "heel-flap",
    title: "Heel Flap",
    instructions: ({ heelStitches }: any) => `
      Decrease gusset sts while working heel flap rows.
      Repeat until only 2 gusset sts remain on each side.
    `,
  },
  {
    id: "leg",
    title: "Leg",
    instructions: ({ legLength }: any) => `
      Knit in stockinette until leg measures ${legLength} inches or as desired.
    `,
  },
  {
    id: "cuff",
    title: "Cuff",
    instructions: () => `
      Work in K1, P1 ribbing for 2" or desired length.
    `,
  },
  {
    id: "finishing",
    title: "Finishing",
    instructions: () => `
      Bind off with stretchy method, weave in ends, block your socks.
    `,
  },
];
