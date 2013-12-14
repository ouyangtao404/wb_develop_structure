/**
* 合并且编译less文件为css到合并文件
*/
var combineCssPath = '../wb/publish/combineCss.css';
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
        var str = '';
        for(var i in files) {
            str += read.readFile(files[i]) + '\n\r';
        }
        var fileContent = less.render(str);
        fs.appendFileSync(combineCssPath, fileContent);
    });
}
exports.init = init;