let prefix = "[playcanvas-scripts]"
let debug = false;

export function isDebug() {
	return debug = debug || window.location.href.includes("playcanvas.com") || window.location.href.includes("?debug=true");
}

export let logMessage = isDebug() ? console.log.bind(window.console, prefix) : function(){};
export let logWarning = isDebug() ? console.warn.bind(window.console, prefix) : function(){};
export let logError = isDebug() ? console.error.bind(window.console, prefix) : function(){};
