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
var less2css = require('./less2css');

function combine() {
    var options = {};
    glob(path + '*/assets/*.js', options, function(err, files) {
        if(err) throw err;
        var str = '';
        for(var i in files) {
            str += read.readFile(files[i]) + '\n\r';
        }
        fs.appendFileSync(combineJsPath, str);
    });
    glob(path + '*/assets/*.css', options, function(err, files) {
        if(err) throw err;
        var str = '';
        for(var i in files) {
            str += read.readFile(files[i]) + '\n\r';
        }
        fs.appendFileSync(combineCssPath, str);
    });
    less2css.init();
}
exports.combine = combine;