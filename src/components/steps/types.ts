export type StepName = number;

export interface StepDef {
  name: StepName;
  label: string;
  // Vue component to render this step’s content
  component: any;
}

export type ToeUpValues = {
  castOnStitches: number;
  sockStitches: number;
  heelAndGussetLength: number;
  gussetStitchesPerSide: number;
  stitchCountBeforeHeelTurn: number;
  heelStitches: number;
  heelBaseStitches: number;
  legStartStitches: number;
};
