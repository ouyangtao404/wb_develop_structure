/**
 * 处理程序
 */
var page404 = '../html/404.html';
var pageList = '../html/list.html';
var rootDir = '..';
var root = '/';

//模块
var fs = require('fs');
var read = require('./read');

function entry(pathname, response, request) {
    var contentType = request.headers.accept.split(',')[0];
    (contentType === '*/*') && (contentType ='text/html');

    var path = rootDir + pathname;

    //图片
    if(contentType.indexOf('image') !== -1) {
        fs.readFile(path, 'binary', function(error, file){
            if(error){
                response.writeHead(500,{"Content-Type":"text/plain"});
                response.write(error+ "\n");
                response.end();
            }else{
                response.writeHead(200,{"Content-Type":"image/png"});
                response.write(file, 'binary');
                response.end();
            }
        });
        return;
    }

    //文件
    var stat;

    try {
        stat =  fs.lstatSync(path);
    } catch(e) {
        var htmlStr = read.readFile(page404);
        response.writeHead(404, {'Content-Type': contentType});
        response.write(htmlStr);
        response.end();
        return;
    }

    if(stat.isFile()) {
        var htmlStr = read.readFile(path);
        response.writeHead(200, {'Content-Type': contentType});
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

    //目录末尾如果不是“/”则强制重定向到有它的路径
    if(!new RegExp(/\S*\/$/).test(pathname)) {
        pathname += '/';
        response.writeHead(301, {Location: pathname});
        response.end();
        return;
    }

    if (pathname !== '/') {
        var spt = pathname.match(/[^\/]+\//g);
        var last = spt[spt.length - 1];
        var backUrl = pathname.replace(last, '');
        str = '<li class="back">'
            + '<i class="icon"></i>'
            + '<a href="' + backUrl + '">返回上一层</a>'
            + '</li>\n';
    }

    for(; i<len; i++) {
        one = dirList[i];
        stat = fs.lstatSync(path + one);
        if(stat.isFile()) {
            str += '<li class="file">'
                + '<i class="icon"></i>'
                +'<a href="' + pathname + one + '">'
                + one
                + '</a>'
            + '</li>\n';
        } else {
            str += '<li class="dir">'
                + '<i class="icon"></i>'
                +'<a href="' + pathname + one + '/">'
                + one
                + '</a>'
            + '</li>\n';
        }
    }
    var htmlStr = read.readFile(pageList);
    var reg = /(<ul class="list">)[\s\S]*(<\/ul>)/;
    htmlStr = htmlStr.replace(reg, function(word, $1, $2) {
        return $1 + str + $2;
    });
    response.writeHead(200, {'Content-Type': contentType});
    response.write(htmlStr);
    response.end();
}
exports.entry = entry;