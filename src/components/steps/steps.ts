import type { Component } from "vue";
import JudysMagicCastOn from "./JudysMagicCastOn.vue";
import ToeIncreasesStep from "./ToeIncreasesStep.vue";
import FootStep from "./FootStep.vue";
import GussetIncreasesStep from "./GussetIncreasesStep.vue";
import HeelTurnStep from "./HeelTurnStep.vue";
import HeelFlapStep from "./HeelFlapStep.vue"; // you already have this one
import LegStep from "./LegStep.vue";
import CuffStep from "./CuffStep.vue";
import FinishingStep from "./FinishingStep.vue";

export interface Step {
  title: string;
  id: string;
  component?: Component;
}

export const steps: Step[] = [
  {
    id: "judys-magic-cast-on",
    title: "Judy's Magic Cast On",
    component: JudysMagicCastOn,
  },
  { id: "toe-increases", title: "Toe Increases", component: ToeIncreasesStep },
  { id: "foot", title: "Foot", component: FootStep },
  {
    id: "gusset-increases",
    title: "Gusset Increases",
    component: GussetIncreasesStep,
  },
  { id: "heel-turn", title: "Heel Turn", component: HeelTurnStep },
  { id: "heel-flap", title: "Heel Flap", component: HeelFlapStep },
  { id: "leg", title: "Leg", component: LegStep },
  { id: "cuff", title: "Cuff", component: CuffStep },
  { id: "finishing", title: "Finishing", component: FinishingStep },
];
