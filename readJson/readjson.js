var fs = require('fs'),
    path = require('path');

function readjson(filename){
    console.log("fielname: ", filename);
    if(fs.existsSync(filename)){

        var content = fs.readFileSync(filename).toString(),
            json;
        content = content.replace(/\/\/.*\n/g, '\n');

        console.log("content: ", content);

        try{
            json = JSON.parse(content);
            console.log(json);
        } catch(err){
            console.log("readjson file error:\n",filename, "\n", err);
        }
    }
}

readjson(path.join(process.cwd(), process.argv[2]));