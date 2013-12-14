/**
* 编译less文件为css到同一目录下
*/
var path = '../wb/mods/';

//模块
var less = require('less');
var fs = require('fs');
var glob = require('glob');
var read = require('./read');

function init() {
    var options = {};

    glob(path + '*/assets/*.less', options, function(err, files) {
        if(err) throw err;
        for(var i in files) {
            var fileContent = read.readFile(files[i]);

            less.render(fileContent, function (e, fileContent) {
                fs.writeFile(files[i]+'.css', fileContent);
            });
        }
    });
}
exports.init = init;