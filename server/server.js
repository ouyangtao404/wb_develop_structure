/**
 * 服务器
 */
var ip = '127.0.0.1';
var port = 8888;
var host = ip + ':' + port;

//模块
var http = require('http');
var url = require('url');
var requestHanders = require('./requestHanders');
var combine = require('./combine');
var jade2html = require('./jade2html');

(function(){
    function onRequest(request, response) {
        combine.combine();
        jade2html.start();
        setTimeout(function() {
            var pathname = url.parse(request.url).pathname;
            requestHanders.entry( pathname, response, request);
        }, 100);
    }
    http.createServer(onRequest).listen(port);
    console.log('Server has started! path is '+ ip + ':' + port);
})();