#!/bin/bash
# Upload scorace content to server in batch
# Author: Aditya Srivastava
# COMMAND : ./scorace-upload.sh <upload-url> <dir-to-zip-files-to-upload>
# command eg: ./scorace-upload.sh http://localhost:8090/upload .

while IFS= read -r -d $'\0' file; do
                echo -e "\033[0;96m Diff....please wait... CONTENT : $file"
                echo ""

                sourcepath=$file

                echo $sourcepath

                targetpath=$(echo $file | sed 's/source/target/g')

                echo $targetpath

                outputpath=$(echo $file | sed 's/source/output/g')

                echo $outputpath

                csvfilename=$(echo $file | sed "s/.*\///")

                echo $csvfilename

                # outputpathreplace=$(echo $outputpath | sed 's/$csvfilename//g')

                # $outputpathreplace

                 mkdir -p output

                outputdiff=$(echo output/${csvfilename})

                echo $outputdiff

                                sourcepath=$(echo "$sourcepath" | sed 's/ /\\ /g')
                                targetpath=$(echo "$targetpath" | sed 's/ /\\ /g')

                                touch $outputdiff

               # mkdir -p $outputpath

                diff --unchanged-line-format="" --old-line-format="" --new-line-format=":%dn: %L" $sourcepath $targetpath >> $outputdiff
            
                echo ""
done < <(find $1 -name "*.csv" -type f -print0)