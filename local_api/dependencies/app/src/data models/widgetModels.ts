export type widgetValPrimitive = string | boolean | number | string [];

export interface AddRemoveClassDict {
  [key: string]: boolean; // true = add, false = remove
}

export interface EntriesDict {
  [key: string]: widgetValPrimitive | AddRemoveClassDict; // key = widget entry key
}

export interface WidgetsEntriesDict {
  [key: string]: EntriesDict; // key = widgetID
}

export interface PagesWidgetsEntriesDict {
  [key: string]: WidgetsEntriesDict; // key = pageID
}
