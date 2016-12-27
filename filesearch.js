var exec = require('child_process').exec;
var path = require('path'), fs=require('fs');
var jsdiff = require('diff');
var jsonfile = require('jsonfile');

var filesearch = {};

filesearch.filesearchwithExtension = function (startPath, filter, callback){

    // console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
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

    // source = source.replace(/ /g,"\\ ");
    // target = target.replace(/ /g,"\\ ");


    var sourceArray = fs.readFileSync(source).toString().split("\n");
    var targetArray = fs.readFileSync(target).toString().split("\n");
        

    var diff_  = jsdiff.diffArrays(sourceArray, targetArray);    

    // console.log(diff_);

    diff_.forEach(function(part){
 callback(part);
        // if(part.removed) {
        //     // console.log("Removed:",part); 
        //     callback(part);
        // }

        // if(part.added) {
        //     // console.log("Added:",part);
        //       callback(part);
        // }
    })


}

filesearch.createdir = function(dir) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

filesearch.logDiff = function(filepath,filename, content) {

    fs.writeFile(filepath+"/"+filename, JSON.stringify(content, null, 4), function(err){
        if(err) {
            return console.log(err);
        }
    });

    // filesearch.createdir(filepath);
    // console.log(content);
    // filepath = filepath.replace(" ", "");

    // fs.writeFile(filepath +"/"+filename , content.value , function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     console.log("The file was saved!");
    // });

}

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(error, stdout); });
};


module.exports = filesearch;