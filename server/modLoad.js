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
        var note_before = '\n\r<!--========='+ notes +' start========-->\r';
        var note_after = '\r<!--========='+ notes +' end========-->\n\r';

        try {
            if(fileUrl.indexOf('.jade') !== -1) {
                fileContent = jade.renderFile(fileUrl, { pretty: true });
            } else {
                fileContent = read.readFile(fileUrl);
            }
        } catch(e) {
            isJade = true;
            fileContent = jade.renderFile(mod404);
            fileContent = fileContent.replace('<path>', fileUrl);
        }

        fileContent = modLoad(fileContent);

        return note_before + fileContent + note_after;
    });
    return rst;
}

exports.modLoad = modLoad;
