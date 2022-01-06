var ffprobe = require('ffprobe');

var path = require('path'), fs=require('fs');
var ffprobe = require('ffprobe'),
    ffprobeStatic = require('ffprobe-static');

function fromDir(startPath,filter){
    const webms = [];
    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            webms.push(filename);
        };
    };
    return webms
};

const webms = fromDir('../../project/assets','.webm');

test('check the codec of all webms', async () => {
  for(const webm of webms) {
    await ffprobe(webm, { path: ffprobeStatic.path })
    .then((info) => {
      info.streams[0].codec_name
      expect(info.streams[0].codec_name).toBe('vp9');
      console.info(webm, info.streams[0].codec_name);
    })
    .catch((err) => {
      console.error(err);
    });

  }
})