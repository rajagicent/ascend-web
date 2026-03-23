/* eslint-disable @typescript-eslint/no-explicit-any */
export type ComponentType =
  | "RADIO"
  | "SELECT"
  | "INPUT"
  | "HEIGHT"
  | "WEIGHT"
  | "EVENT"
  | "NAME"
  | "EQUIPMENT"
  | "WEIGHTS_SETUP"
  | "INJURY";

  ;

export type SelectionType = "single" | "multiple";

export type Option =
  | { label: string; value: string }
  | string;

export interface Question {
  id: string;

  // 🔥 NEW (replaces "type")
  component: ComponentType;

  label: string;
  subLabel?:string;

  // 🔥 for radio / select
  selection?: SelectionType;

  // options flexible (string or object)
  options?: Option[];

  // auto move to next step
  autoNext?: boolean;
}

export interface State {
  currentStep: string;
  answers: Record<string, any>;
}