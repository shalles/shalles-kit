var fs = require('fs'),
    path = require('path');

function copySync(from, to, filter, cb){
    try{
        copyDirSync(from, to, filter, cb);
        //return {status: true, msg: "copy successful"};
    } catch(err){
        console.log(err);
        return {status: false, msg: err};
    }
}
function copyDirSync(from, to, filter, cb) {
    //console.log('copy from:\n', from, '\nto: \n', to);
    if (!fs.existsSync(from)) {
        throw new Error('source file not exists.');
        return;
    }

    var stat = fs.statSync(from);

    if(cb ? !cb(from, to): false) return;

    if (stat.isDirectory()) {

            var list = fs.readdirSync(from);

            try{
                fs.mkdirSync(to);
            }catch(e){
                console.log("copy cover: ", to);
            }

            for(var i = list.length - 1; i > -1; i--){
                var _from = path.join(from, list[i]),
                    _to = path.join(to, list[i]);

                arguments.callee(_from, _to, filter, cb);
            };

    } else if (stat.isFile()) {

        if(filter && filter.indexOf(path.extname(from)) > -1) return;

        fs.writeFileSync(to, fs.readFileSync(from, 'binary'), 'binary');
    }

}
var cwd = process.cwd();

copySync(path.join(cwd, process.argv[2]), path.join(cwd, process.argv[3]), [".json", ".js"], process.argv[5])




