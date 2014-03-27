/**
 * 服务启动文件
 */
var ip = '127.0.0.1';
var ip = "10.32.185.94";
var port = 8888;
var host = ip + ':' + port;

//模块
var http = require('http');
var url = require('url');
var requestHanders = require('./requestHanders');
var combine = require('./combine');
var jade2html = require('./jade2html');
var less2css = require('./less2css');

(function(){
    function onRequest(request, response) {
        jade2html.start(function() {
            combine.combine(function() {
                var pathname = url.parse(request.url).pathname;
                requestHanders.entry(pathname, response, request);
            });
        });

        //test.less->test.less.css,可选
        less2css.init();
    }
    http.createServer(onRequest).listen(port);
    console.log('Server has started! path is '+ ip + ':' + port);
})();
<<<<<<< HEAD


var options = {
    host: 'www.google.com', port: 80,
    path: '/upload', method: 'POST'
};
var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res. headers));
    res.setEncoding('utf8'); res.on('data', function (chunk) {
        console.log('BODY: ' + chunk); });
});
req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});
=======
>>>>>>> b75fcd0eb2385fdd471c352b941fae3f7de31528
