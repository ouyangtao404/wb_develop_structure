/**
 * 合并文件
 */
var path = '../wb/mods/';
var combineJsPath = '../wb/publish/combineJs.js';
var combineCssPath = '../wb/publish/combineCss.css';
var globalConfig = 'globalConfig';
var cut = '\n\r';

//模块
var fs = require('fs');
var glob = require('glob');
var less = require('less');

var less2css = require('./less2css');
var read = require('./read');

function combine() {
    var options = {};
    less2css.init();

    combineLess(function() {
        combineJs(function() {
            combineCss();
        });
    });
}

function combineLess(callback) {
    glob(path + '*/assets/*.less', {}, function(err, files) {
        if(err) throw err;
        var globalStr = '';
        var str = '';
        for(var i in files) {
            if(files[i].indexOf('/'+ globalConfig +'/') !== -1) {
                globalStr += read.readFile(files[i]) + cut;
            } else {
                str += read.readFile(files[i]) + cut;
            }
        }
        var fileContent = globalStr + str;
        less.render(fileContent, function (e, fileContent) {
            fs.writeFile(combineCssPath, fileContent);
            callback && callback();
        });
    });
}
function combineJs(callback) {
    glob(path + '*/assets/*.js', {}, function(err, files) {
        if(err) throw err;
        var globalStr = '';
        var str = '';
        for(var i in files) {
            if(files[i].indexOf('/'+ globalConfig +'/') !== -1) {
                globalStr += read.readFile(files[i]) + cut;
            } else {
                str += read.readFile(files[i]) + cut;
            }
        }
        fs.writeFile(combineJsPath, globalStr + str);
        callback && callback();
    });
}
function combineCss(callback) {
    glob(path + '*/assets/*.css', {}, function(err, files) {
        if(err) throw err;
        var globalStr = '';
        var str = '';
        for(var i in files) {
            if(files[i].indexOf('/'+ globalConfig +'/') !== -1) {
                globalStr += read.readFile(files[i]) + cut;
            } else {
                str += read.readFile(files[i]) + cut;
            }
        }
        console.log(read.readFile(combineCssPath));
        fs.appendFileSync(combineCssPath, globalStr + str);
        callback && callback();
    });
}
exports.combine = combine;