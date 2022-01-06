import { AxiosRetryInstance } from "./requestHelpers";
import { logError, logInfo, logException } from "./debugHelpers";
import { Project } from "@/data models/projectModels";


let env = "";
let playerVersion: string = "";
let projectVersion: string = "";

export const EnvironmentOptions = {
  production: "production",
  staging: "staging",
  developement: "development",
  debug: "debug"
};

export function getEnv() {
  return env;
}

export function setEnv(environment: string) {
  env = environment;
  logInfo("set env", env);
}

interface EnvMap {
  [key: string]: "production" | "staging" | "development" | "debug"
}

export function setEnvByOrigin(origin: string) {
  const envMap: EnvMap = {
    "https://el-gizmos.s3.amazonaws.com": "production",
    "https://el-gizmos-stage.s3.amazonaws.com": "staging",
    "https://apps.elclouddev.net": "development",
    "https://apps.elcloudstage.net": "staging",
    "https://apps.explorelearning.com": "production",
  }

  const env = envMap[origin] || EnvironmentOptions.developement;

  setEnv(env)
}

export async function getPlayerVersion() {
  if (!playerVersion) {
    try {
      const resp = await AxiosRetryInstance.get("player-version.txt");
      playerVersion = resp.data.toString();
    } catch (err) {
      logException(err);
    }
  }
  return playerVersion || "";
}

export async function getProjectVersion() {
  if (!projectVersion) {
    try {
      const resp = await AxiosRetryInstance.get("project-version.txt");
      projectVersion = resp.data.toString();
    } catch (err) {
      logException(err);
    }
  }
  return projectVersion || "";
}

export async function getProjectData(): Promise<Project> {
  return new Promise((resolve, reject) => {
    AxiosRetryInstance.get("./data/project.json")
      .then(response => { resolve(response.data); })
      .catch(err => { logError(err); reject(); });
  });
}

export function getEnvPageURL(pageID: string) {
  // if (isDebug)
  //   return (
  //     "http://localhost:8000/project/pages/" + pageID + "/" + pageID + ".html"
  //   );
  // else
  return `./data/pages/${pageID}.html`;
}
