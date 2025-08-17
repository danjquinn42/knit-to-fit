export type StepName = number;

export interface StepDef {
  name: StepName;
  label: string;
  // Vue component to render this step’s content
  component: any;
}
