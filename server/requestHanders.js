/**
 * 处理程序
 */
var page404 = '../html/404.html';
var pageList = '../html/list.html';
var layoutDir = '../wb/layout/';
var rootDir = '..';
var root = '/';

//模块
var fs = require('fs');
var jade = require('jade');
var walk = require('walk');
var read = require('./read');

function entry(pathname, response, request) {
    //文件
    var path = rootDir + pathname
        ,link =  pathname
        ,stat =  fs.lstatSync(path)
        ;
    if(stat.isFile()) {
        var htmlStr = read.readFile(path);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(htmlStr);
        response.end();
        return;
    }

    //目录
    var dirList = fs.readdirSync(path)
        ,i = 0
        ,len = dirList.length
        ,one
        ,stat
        ,str = ''
        ;

    if (pathname !== '/' && pathname !== '') {
        var spt = link.match(/[^\/]+\//g);
        var last = spt[spt.length - 1];
        var backUrl = link.replace(last, '');
        str = '<li class="back">'
            + '<i class="icon"></i>'
            + '<a href="' + backUrl + '">返回上一层</a>'
            + '</li>';
    }

    for(; i<len; i++) {
        one = dirList[i];
        stat = fs.lstatSync(path + one);
        cls = 'dir';
        if(stat.isFile()) {
            str += '<li class="file">'
                + '<i class="icon"></i>'
                +'<a href="' + link + one + '">'
                + one
                + '</a>'
            + '</li>';
        } else {
            str += '<li class="dir">'
                + '<i class="icon"></i>'
                +'<a href="' + link + one + '/">'
                + one
                + '</a>'
            + '</li>';
        }
    }
    var htmlStr = read.readFile(pageList);
    var reg = /(<ul class="list">)[\s\S]*(<\/ul>)/;
    htmlStr = htmlStr.replace(reg, function(word, $1, $2) {
        return $1 + str + $2;
    });
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(htmlStr);
    response.end();
}
exports.entry = entry;