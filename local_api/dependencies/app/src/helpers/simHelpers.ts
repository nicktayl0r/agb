import { SimManager } from "@/managers/simManager";

let simManager: SimManager | undefined;
export function getSimManager() {
  if (!simManager) simManager = new SimManager();
  return simManager;
}
