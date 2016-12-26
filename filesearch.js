var exec = require('child_process').exec;
var path = require('path'), fs=require('fs');
var jsdiff = require('diff');

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

    // source = source.replace(/ /g,"\\ ");
    // target = target.replace(/ /g,"\\ ");


    var array = fs.readFileSync(source).toString().split("\n");
for(i in array) {
    console.log(array[i]);
}

    // var input = fs.createReadStream(source).on('data', function(data){

    //     console.log(data);

    // });


    // execute('diff --unchanged-line-format="" --old-line-format="" --new-line-format=":%dn: %L" '+source+" "+target, function(error, stdout) {

    //     var output;

    //     if(error) {
    //         output = error;
    //     }else{
    //         output = stdout;
    //     }

    //     callback(output);
    // });

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
    exec(command, function(error, stdout, stderr){ callback(error, stdout); });
};


module.exports = filesearch;