var walk = require('walk')
  , fs = require('fs')
  , path = require('path')
  , S = require('string')
  , _ = require('lodash')
  ;

function go () {
  "use strict";

  var walker  = walk.walk(__dirname, { followLinks: false })
    ;

  function renameIt (oldPath, newPath) {
    fs.rename(oldPath, newPath, function(err) {
      if (err) {
        console.log(err.message);
      }
    });
  }

  function cleanIt (name, isDirectory) {
    var lessWeirdName = S(name).replaceAll('.', ' ')
      , names = ['720p', '1080p', 'x264', 'x264-champions', 'x264-dimension', 'hdtv']
      ;

    lessWeirdName = lessWeirdName.split(' ').filter(function (word) {
      return names.indexOf(word.toLowerCase()) === -1;
    });

    if (isDirectory) {
      return `${lessWeirdName.join(' ')}`;
    } else {
      let swap = lessWeirdName.pop();
      swap = `${lessWeirdName[lessWeirdName.length-1]}.${swap}`;

      // fire shot in the air
      lessWeirdName.pop();

      lessWeirdName.push(swap);

      return `${lessWeirdName.join(' ')}`;
    }
  }

  function fileHandler(root, fileStat, next) {
    var old = path.resolve(root, fileStat.name)
      , newOne = path.resolve(root, cleanIt(fileStat.name))
      ;

    renameIt(old, newOne);

    next();
  }

  function errorsHandler(root, nodeStatsArray, next) {
    nodeStatsArray.forEach(function (n) {
      console.error("[ERROR] " + n.name);
      console.error(n.error.message || (n.error.code + ": " + n.error.path));
    });
    next();
  }

  function endHandler() {
    console.log("all done");
  }

  function directoryHandler (root, fileStat, next) {
    console.log('_______________________________');
    console.log(`DirectoryName    ${fileStat.name}`);
    console.log(`CleanedName      ${cleanIt(fileStat.name, true)}`);
    renameIt(path.resolve(root, fileStat.name), path.resolve(root, cleanIt(fileStat.name, true)));

    next();
  }

  walker.on("file", fileHandler);
  walker.on('directory', directoryHandler);
  walker.on("errors", errorsHandler); // plural
  walker.on("end", endHandler);
}

module.exports = go();