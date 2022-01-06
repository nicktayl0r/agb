import Glossary from "@/components/Glossary.vue";

import { vueApp } from "..";

let glossary: Glossary | null;

export function setGlossary(_glossary: Glossary | null) {
  glossary = _glossary;
}

export function getGlossary(): Glossary | null {
  // const app = vueApp.$children[0].$children[0]; //vueApp -> AppLoader -> App (which contains Glossary)
  // if (app) {
  //     const glossary = app.$refs["glossary"] as Glossary;
  //     // @ts-ignore not sure why the linter is complaining about this, it works fine
  //     if (glossary) return glossary;
  // }
  // return null;

  return glossary;
}