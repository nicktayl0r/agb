//Mock console
const { Console } = require('console');
const { Writable } = require('stream');
const outStream = new Writable({
  write(chunk: any, encoding: any, callback: any) {
    //console.log(chunk.toString());
    callback();
  }
});
// Custom simple logger
const logger = new Console({ stdout: outStream, stderr: outStream });
console = logger;