import { Howl, Howler } from "howler";
import { equals, isEmpty } from "ramda";

import { soundType } from "@/data models/effectModels";
import { isFirefox } from "@/helpers/browserHelpers";
import { logMessage } from "@/helpers/debugHelpers";
import { getStore } from "@/helpers/storeHelpers";
import {
  commitAudioMuted,
  commitBGMusic,
  readAudioMuted,
  readBGMusic
} from "@/store/modules/userData";

interface howlerDictionary {
  [key: string]: Howl[];
}

const howlerDict: howlerDictionary = {};

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    for (const key in howlerDict) {
      const howlArray = howlerDict[key];
      for (const howl of howlArray)
      // howler doesn't have a way to check paused, but stop sets seek to 0, and page invisible is the only time we are pausing
      { if (howl.seek() !== 0) howl.play(); }
    }
  } else {
    for (const key in howlerDict) {
      const howlArray = howlerDict[key];
      for (const howl of howlArray) if (howl.playing()) howl.pause();
    }
  }
});

function srcsToDictKey(srcWebm: string, srcMp3: string) {
  return `${srcWebm}|${srcMp3}`;
}

export function playSound(
  srcWebm: string,
  srcMp3: string,
  type: soundType,
  resume?: boolean
) {
  if (readAudioMuted(getStore()) && type != "bgMusic") return;

  const srcKey = srcsToDictKey(srcWebm, srcMp3);

  const srcArray = [srcWebm, srcMp3];
  logMessage("srcArray", srcArray);

  if (type == "bgMusic") {
    const currentBGMusic = readBGMusic(getStore());
    const newMusic = !equals(currentBGMusic, srcArray);
    if (newMusic || resume) {
      //  if a different bg music is already playing, stop it
      if (!isEmpty(currentBGMusic)) stopSound(currentBGMusic[0], currentBGMusic[1]);

      commitBGMusic(getStore(), srcArray);
    }
  }
  const loop = type == "sfxContinuous" || type == "bgMusic";
  const html5 = type == "bgMusic"; // "This should be used for large audio files so that you don't have to wait for the full file to be downloaded and decoded before playing."

  if (howlerDict[srcKey]) {
    for (const h of howlerDict[srcKey]) {
      if (h.playing()) {
        if (loop) return; // if we have looping sound and it's already playing, we don't want another one
      } else {
        // we found an existing howler instance for this sound that isn't playing, play it and return
        h.loop(loop);
        h.play();
        return;
      }
    }
  } else {
    howlerDict[srcKey] = [];
  }

  const newHowl = new Howl({
    src: srcArray,
    loop,
    html5
  });
  if (type == "bgMusic") {
    // if our music fails to play, try again when the browser is unlocked
    newHowl.once("playerror", () => {
      if (isFirefox()) {
        // console.log("We got firefox");
        newHowl.once("play", () => {
          // console.log("on play, remove click listener");
          window.removeEventListener("click", resumeAudio);
        });
        window.addEventListener("click", resumeAudio);
      } else {
        newHowl.once("unlock", () => {
          playSound(srcWebm, srcMp3, type);
        });
      }
    });
  }
  howlerDict[srcKey].push(newHowl);
  newHowl.play();
}

// function handleError(event: Event, srcWebm: string, srcMp3: string, type: string) {

// }

export function stopSound(srcWebm: string, srcMp3: string) {
  const srcKey = srcsToDictKey(srcWebm, srcMp3);
  if (howlerDict[srcKey]) {
    for (const h of howlerDict[srcKey]) {
      h.stop();
    }
  }
  // if src == bgMusic in store, remove
  const currentBGMusic = readBGMusic(getStore());
  if (!isEmpty(currentBGMusic)) {
    if (currentBGMusic[0] == srcWebm && currentBGMusic[1] == srcMp3) commitBGMusic(getStore(), []);
  }
}

export function mute(val: boolean) {
  Howler.mute(val);
  commitAudioMuted(getStore(), val);
}

export function resumeAudio() {
  // console.log("resume audio");
  const currentBGMusic = readBGMusic(getStore());
  const muted = readAudioMuted(getStore());
  mute(muted);
  if (currentBGMusic[0] != undefined && currentBGMusic[1] != undefined) playSound(currentBGMusic[0], currentBGMusic[1], "bgMusic", true);
}
