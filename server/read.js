var fs = require("fs");
function readFile(path) {
    return fs.readFileSync(path, 'utf-8');
}
function readDir(path, icallback, callback) {
    fs.readdir(path, function(err, files) {
        if (err) {
            console.log('read dir error');
            throw err;
        } else {
            //遍历
            files.forEach(function(item) {
                icallback(item, path + item);
            });
        }
        callback();
    });
}
exports.readFile = readFile;
exports.readDir = readDir;