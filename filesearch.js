var exec = require('child_process').exec;
var path = require('path'), fs=require('fs');

var filesearch = {};

filesearch.filesearchwithExtension = function (startPath, filter, callback){

    // console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        // console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            filesearch.filesearchwithExtension(filename,filter, callback); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            callback(filename);
        };
    };
};

filesearch.filesearchwithRegex = function (startPath,filter,callback){

    console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            filesearch.filesearchwithRegex(filename,filter,callback); //recurse
        }
        else if (filter.test(filename)) callback(filename);
    };
};

filesearch.diff = function (source, target, callback) {

    execute('diff --unchanged-line-format="" --old-line-format="" --new-line-format=":%dn: %L '+source+" "+target, function(output) {
        callback(output);
    });

}

filesearch.createdir = function(dir) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

filesearch.logDiff = function(filepath,filename, content) {

    filesearch.createdir(filepath);

    filepath = filepath.replace(" ", "");

    fs.writeFile(filepath +"/"+filename , content , function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

}

 

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};


module.exports = filesearch;