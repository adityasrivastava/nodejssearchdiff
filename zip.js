var extract = require('extract-zip')
var exec = require('child_process').exec;

var zip = {}

zip.extract = function(source, target, callback) {


     exec("unzip "+source+ " -d "+target+"/",{maxBuffer: 1024 * 10000}, function(error, stdout, stderr){ callback(stdout, stderr, error); });


}

module.exports = zip;
