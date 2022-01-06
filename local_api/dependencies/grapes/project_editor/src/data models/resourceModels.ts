
export interface ResourceIDs {
    resource_activity_id: number;
    resource_id: number;
}

export const trackCodeMap = {
    caseES: "trackE",
    handbookES: "trackEX",
    caseMS: "trackM",
    handbookMS: "trackMX",
    caseHS: "trackL",
    handbookHS: "trackH",
    caseAP: "trackAP",
    handbookAP: "trackA",
};


export type track =
    | "caseES"
    | "handbookES"
    | "caseMS"
    | "handbookMS"
    | "caseHS"
    | "handbookHS"
    | "caseAP"
    | "handbookAP";

export const trackEnum: track[] = [
    "caseES",
    "handbookES",
    "caseMS",
    "handbookMS",
    "caseHS",
    "handbookHS",
    "caseAP",
    "handbookAP",
];
