import { widgetValPrimitive } from "@/data models/widgetModels";

export interface RubricsDict {
  [key: string]: RubricState; //key is the rubricID
}

export interface RubricState {
  revisions: RubricRevision[];
  userActivityResponseID?: number;
  status: RubricStatus;
  response?: string;
  responseData?: string;
}

export enum RubricStatus {
  submitted = "submitted",
  received = "received",
  resubmit = "resubmit",
  rejected = "rejected"
}

export interface RubricRevision {
  [key: string]: widgetValPrimitive; //key is the header text
}
