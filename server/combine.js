/**
 * 合并文件
 */
var path = '../wb/mods/';
var combineJsPath = '../wb/publish/combineJs.js';
var combineCssPath = '../wb/publish/combineCss.css';
//模块
var fs = require('fs');
var read = require('./read');
var glob = require('glob');
function combine() {
    var options = {};
    glob(path + '*/assets/*.js', options, function(err, files) {
        if(err) throw err;
        var str = '';
        for(var i in files) {
            str += read.readFile(files[i]) + '\n\r';
        }
        fs.writeFile(combineJsPath, str, function (err) {
            if(err) throw err;
        });
    });
    glob(path + '*/assets/*.css', options, function(err, files) {
        if(err) throw err;
        var str = '';
        for(var i in files) {
            str += read.readFile(files[i]) + '\n\r';
        }
        fs.writeFile(combineCssPath, str, function (err) {
            if(err) throw err;
        });
    });
}
exports.combine = combine;