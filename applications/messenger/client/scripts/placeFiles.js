'use strict';

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var execSync = require('child_process').execSync;

var buildPath = path.resolve(__dirname, '../build');
var staticPath = path.resolve(__dirname, '../../static');
var webpackAssets = path.join(buildPath, 'webpack-assets.json');

function fixFavicon(callback) {
  fs.readFile(webpackAssets, (err, data) => {
    if (err) throw err;
    var assets = JSON.parse(data).assets;
    var favicon = assets.find(asset => {
      return asset.name.endsWith('favicon.ico');
    });
    if (favicon) {
      copyFavicon(favicon.name, finalize);
    } else {
      console.log(chalk.yellow('Warning: no favicon.ico'));
      finalize();
    }
  });

  function finalize() {
    removeAssetsData(callback);
  }
}

function copyFavicon(filename, callback) {
  var source = path.join(buildPath, filename);
  var destination = path.join(buildPath, 'favicon.ico');
  var sourceStream = fs.createReadStream(source);
  var destinationStream = fs.createWriteStream(destination);
  destinationStream.on('close', callback);
  sourceStream.pipe(destinationStream);
}

function removeAssetsData(callback) {
  fs.unlink(webpackAssets, callback);
}

module.exports = (callback) => {
  fixFavicon(() => {
    var staticIndex = path.join(staticPath, 'index.html');
    var wwwIndex = path.resolve(staticPath, '../www/html.template');
    execSync('rsync -a --delete ' + buildPath + '/ ' + staticPath);
    execSync('mv ' + staticIndex + ' ' + wwwIndex);
    callback();
  });
};