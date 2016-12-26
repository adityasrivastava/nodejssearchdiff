var filesearch = require('./filesearch');
var zip = require('./zip');

function start() {

        console.log("Create output directory...");

        filesearch.createdir("output");

        // 1. create source dir 

        filesearch.createdir("source");

        // 2. create target dir

        filesearch.createdir("target");

        // 3. search for zip (source)

        // filesearch.filesearchwithExtension('./old', 'Math.zip', function(filename){
        //         // console.log(filename);     
        //         // 4. extract zip (source)

        //         var removespaces = filename.replace(/ /g,"\\ ");

        //         zip.extract(removespaces, "source", function(output, stderr, error){
        //                 if(error) {
        //                   console.log(error);
        //                 }else{
        //                    console.log(output);
        //                 }
        //         });
        // });

     

        // 5. search for zip (target)

        // filesearch.filesearchwithExtension('./new', 'Math.zip', function(filename){
        //         // console.log(filename);
        //           // 6. extract zip (target)

        //           var removespaces = filename.replace(/ /g,"\\ ");

        //          zip.extract(removespaces, "target", function(output, stderr, error){
        //                 if(error) {
        //                   console.log(error);
        //                 }else{
        //                    console.log(output);
        //                 }
        //         });
        // });

        // 7. search for csv (source)

        filesearch.filesearchwithExtension('./source', '.csv', function(csvfilepath){
                console.log(csvfilepath);

                // 8. search for csv (target)

                var pathArray = csvfilepath.split("/");
                var basePath = '';
                 var targetPath = "./target";
                
                for(var index = 1; index < pathArray.length; index++){
                        if(index != (pathArray.length - 1)) {
                                basePath += "/"+pathArray[index];
                        }
                }

                targetPath += basePath;
                var targetFileName = pathArray[pathArray.length - 1];

                console.log(targetPath);
                console.log(targetFileName);

                filesearch.filesearchwithExtension(targetPath, targetFileName , function(foundcsvpath){
                        console.log(foundcsvpath);
                              // 9. diff both source & target
                              filesearch.diff(csvfilepath, foundcsvpath, function(output){
                                 
                                 console.log(output);

                                 // 10. write output to outputfolder
                                //  filesearch.logDiff("output",targetFileName,output);

                              });
                });
        });

}

start();

