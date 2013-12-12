/**
 * 编译jade，生成html文件
 * @type {string}
 */
var jadePath = '../wb/jade/';
var layoutPath = '../wb/layout/';
var jadeOptions = {
    pretty  : true,
    globals : {
        author    : 'baohe.oyt',
        email     : 'baohe.oyt[at]alibaba-inc.com'
    }
};

//模块
var fs = require('fs');
var glob = require('glob');
var jade = require('jade');
var read = require('./read');
var modLoad = require('./modLoad');

function start() {
    var options = {};
    glob(jadePath + '*.jade', options, function(err, files) {
        if(err) throw err;
        for(var i in files) {
            deal(files[i]);
        }
    });

    function deal(path) {
        var reg = /..\/wb\/jade\/(\S+\.jade)/;
        var fileName = path.match(reg)[1] + '.html';

        var fileContent = jade.renderFile(path, jadeOptions);
        fileContent = modLoad.modLoad(fileContent);
        fs.writeFile(layoutPath + fileName, fileContent);
    }
}
exports.start = start;