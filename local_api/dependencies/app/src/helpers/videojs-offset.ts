import videojs from "video.js";
// import {version as VERSION} from '../package.json';
const VERSION = "2.1.2"; //commit: https://github.com/cladera/videojs-offset/commit/6fd6c018d9eddd5ba7e92c2a7fd99c150e48b63e

// Default options for the plugin.
const defaults = {};

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Checks whether the clip should be ended.
 *
 * @function onPlayerTimeUpdate
 *
 */
const onPlayerTimeUpdate = function(this: videojs.Player) {
  const curr = this.currentTime();

  if (curr < 0) {
    this.currentTime(0);
    this.play();
  }
  //@ts-ignore
  if (this._offsetEnd > 0 && curr > this._offsetEnd - this._offsetStart) {
    this.off("timeupdate", onPlayerTimeUpdate);
    this.pause();
    this.trigger("ended");

    // Re-bind to timeupdate next time the video plays
    this.one("play", () => {
      this.on("timeupdate", onPlayerTimeUpdate);
    });
    //@ts-ignore
    if (!this._restartBeginning) {
      //@ts-ignore
      this.currentTime(this._offsetEnd - this._offsetStart);
    } else {
      this.trigger("loadstart");
      this.currentTime(0);
    }
  }
};
/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player.
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const onPlayerReady = (
  player: videojs.Player,
  options: videojs.PlayerOptions
) => {
  player.one("play", () => {
    player.on("timeupdate", onPlayerTimeUpdate);
  });
};

export interface offsetOptions {
  start: string;
  end: string;
  restart_beginning: boolean;
}

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function offset
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const offset = function(this: videojs.Player, options: offsetOptions) {
  options = options || {};
  const Player: any = this.constructor;

  //@ts-ignore
  this._offsetStart = parseFloat(options.start >= 0 ? options.start : "0");
  //@ts-ignore
  this._offsetEnd = parseFloat(options.end || "0");
  //@ts-ignore
  this._restartBeginning = options.restart_beginning || false;
  // console.log(
  //   "offset==plugin==initialize. ",
  //   //@ts-ignore
  //   this._offsetStart,
  //   //@ts-ignore
  //   this._offsetEnd
  // );

  if (!Player.__super__ || !Player.__super__.__offsetInit) {
    Player.__super__ = {
      __offsetInit: true,
      duration: Player.prototype.duration,
      currentTime: Player.prototype.currentTime,
      bufferedPercent: Player.prototype.bufferedPercent,
      remainingTime: Player.prototype.remainingTime,
      buffered: Player.prototype.buffered
    };

    Player.prototype.duration = function() {
      if (this._offsetEnd !== undefined && this._offsetStart !== undefined) {
        if (this._offsetEnd > 0) {
          return this._offsetEnd - this._offsetStart;
        }
        return (
          Player.__super__.duration.apply(this, arguments) - this._offsetStart
        );
      }
      return Player.__super__.duration.apply(this, arguments);
    };

    Player.prototype.currentTime = function(seconds: number) {
      if (seconds !== undefined) {
        if (this._offsetStart !== undefined) {
          return Player.__super__.currentTime.call(
            this,
            seconds + this._offsetStart
          );
        }
        return Player.__super__.currentTime.call(this, seconds);
      }

      if (this._offsetStart !== undefined) {
        return Player.__super__.currentTime.apply(this) - this._offsetStart;
      }
      return Player.__super__.currentTime.apply(this);
    };

    Player.prototype.remainingTime = function() {
      return this.duration() - this.currentTime();
    };

    Player.prototype.startOffset = function() {
      return this._offsetStart;
    };

    Player.prototype.endOffset = function() {
      if (this._offsetEnd > 0) {
        return this._offsetEnd;
      }
      return this.duration();
    };

    Player.prototype.buffered = function() {
      const buff = Player.__super__.buffered.call(this);
      const ranges = [];

      for (let i = 0; i < buff.length; i++) {
        ranges[i] = videojs.createTimeRanges(
          Math.max(0, buff.start(i) - this._offsetStart),
          Math.min(
            Math.max(0, buff.end(i) - this._offsetStart),
            this.duration()
          )
        );
      }

      return videojs.createTimeRanges(ranges);
    };
  }

  this.ready(() => {
    //@ts-ignore
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
registerPlugin("offset", offset);
// Include the version number.
offset.VERSION = VERSION;

export default offset;
