
import { ResourceIDs } from "../data models/resourceModels";

export type env = "devEnv" | "stageEnv" | "productionEnv";

export interface ServerEnv {
    caseHS: ResourceIDs;
    handbookHS: ResourceIDs;
    caseAP: ResourceIDs;
    handbookAP: ResourceIDs;
}
