/**
 * 传入字符串，把模块引入代码替换为对应模块代码且返回。
 * @param str
 */
var pre = '../wb/mods/';
var reg = /<%\s*mod_load\('(\S*)',\s*'(\S*)',\s*'(\S*)'\)\s*%>/g;
var mod404 = '../html/404mod.jade';

var read = require('./read');
var jade = require('jade');

function modLoad(str) {
    return loadMod(str);
}
function loadMod(str) {
    var rst = str.replace(reg, function(word, notes, dir, file) {
        var fileUrl = pre + dir + '\/' + file;
        var fileContent = '';

        try {
            fileContent = read.readFile(fileUrl);
        } catch(e) {
            console.log('the module is not exist(file url is'+ fileUrl +')');
            isJade = true;
            fileContent = read.readFile(mod404);
        }

        if(fileUrl.indexOf('.jade') !== -1) {
            fileContent = jade.renderFile(fileUrl, { pretty: true });
        }

        fileContent = modLoad(fileContent);

        return '\n<!--========='+ notes +' start========-->\n'+
            fileContent +
        '\n<!--========='+ notes +' end========-->';
    });
    return rst;
}

exports.modLoad = modLoad;
