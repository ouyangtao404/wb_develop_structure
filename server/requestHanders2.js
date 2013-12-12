/**
 * 处理程序
 */
var page404 = '../html/404.html';
var pageList = '../html/list.html';
var layoutDir = '../wb/layout/';

//模块
var fs = require('fs');
var jade = require('jade');
var modLoad = require('./modLoad');
var read = require('./read');

function entry(pathname, response, request) {
    //请求模板list
    if(pathname == '/' || pathname == '') {
        getFileTile(layoutDir, function(str) {
            var htmlStr = read.readFile(pageList);
            var reg = /(<body>)[\s\S]*(<\/body>)/;
            var body = htmlStr.replace(reg, function(word, $1, $2) {
                return $1 + str + $2;
            });
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(body);
            response.end();
        });
        return;
    }
    // 渲染文件
    var body = '';
    try {
        body = read.readFile(layoutDir + pathname);
    } catch(e) {
        body = read.readFile(page404);
    }
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}
/**
 * 获取layout文件名list
 * @param path
 * @param handleFile
 */
function getFileTile(path, callback) {
    var str = '';
    read.readDir(path, function(item) {
        var tmpPath = './' + item;
        str += '<a class="file" href="'+ tmpPath +'">'+ item +'</a><br/>';
    }, function() {
        callback(str);
    });
}

exports.entry = entry;