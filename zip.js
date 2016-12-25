var extract = require('extract-zip')

var zip = {}

zip.extract = function(source, target) {

    extract(source, {dir: target}, function (err) {
        
        if(err) {
            console.log(err);
        }

    });

}

module.exports = zip;
