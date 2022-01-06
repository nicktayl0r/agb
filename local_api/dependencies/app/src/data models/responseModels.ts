export interface Response {
  rubricID: string;
  responseData:
  | SharedDataResponse
  | WidgetResponse
  | RevisableWidgetResponse
  | RadioGroupResponse;
  fireOnceID: string; // If you want the response to only fire once, give it an ID to write into the store
}

export type numericalDescriptor = "none" | "numCorrect" | "numAttempts" | "incorrectAfterNumAttempts";

export interface SharedDataResponse {
  readonly responseType: "sharedData";
  sharedDataKey: string;
  descriptor: numericalDescriptor;
  numCorrectTotal?: number;
}

export type responseFormat = "comma" | "html" | "none";

export interface WidgetHeaderPair {
  header: string;
  widgetID: string;
  key: string;
}

export interface WidgetResponse {
  readonly responseType: "widget";
  format: responseFormat;
  headerPairs: WidgetHeaderPair[];
}

export interface RevisableWidgetResponse {
  readonly responseType: "revisableWidget";
  headerPair: WidgetHeaderPair;
}

export interface RadioGroupHeaderPair {
  header: string;
  group: string;
}

export interface RadioGroupResponse {
  readonly responseType: "radioGroup";
  format: responseFormat;
  headerPairs: RadioGroupHeaderPair[];
}

// responseData sent to the server will be an array of these in json
export interface ServerResponseDataJsonPair {
  header?: string;
  response: string;
}

export interface UserActivityAttemptReturn {
  progress: string;
  state: string;
  resourceActivityId: number;
}
