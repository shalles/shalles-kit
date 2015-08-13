/**
 * Created by shalles on 2015/4/17.
 */
var fs, path, filepath, encode;

fs = require("fs");
path = require('path');

//console.log(process.argv[2]);

function isAbsolutePath(path) {
    return (process.platform === "win32" && path.match(/^[a-zA-Z]:(\\|\/)?/)) || path.charAt(0) === "/";
}

function convertMDtoWikiMultiFile(filepath, convertRule, encode){
    //encode = encode || "utf-8";
    var content = fs.readFileSync(filepath, encode);

    content = convertMDtoWikiMulti(content, convertRule);
    content += "\n {tip}convert markdown to wiki by shalles kit{tip}";

    var fileInfo = path.parse(filepath),
        outfile = fileInfo.dir.slice(0, -2) + "/wiki/" + fileInfo.name + ".wk";
    fs.writeFileSync(outfile, content, encode);
}
function convertMDtoWikiMulti(content, convertRule){
    for(var i = 0, len = convertRule.length; i < len; i++){
        content = convertMDtoWiki(content, convertRule[i].reg, convertRule[i].rep);
    }
    return content;
}
function convertMDtoWiki(content, reg, callback){
    return content.replace(reg, callback);
}
//注意先后顺序
var convertRule = [
    {   // 代码块
        reg: /```[ ]*(\w*)/g,
        rep: function($0, $1){
            var wikiCode = ["actionscript", "html", "java", "javascript", "none", "sqlv", "xhtml", "xml"]
            if(wikiCode.indexOf($1) !== -1){
                return "{code:" + $1 + "}";
            }
            return "{code}";
        }
    },{ // 标题前的a标签
        reg: /(^|\n)(#+)<a.+<\/a>/g,
        rep: function($0, $1, $2, $3){
            return $1 + $2;
        }
    },{ // 标题
        reg: /(^|\n)(#+)/g,
        rep: function($0, $1, $2){
            return $1 + "h" + $2.length + ". ";
        }
    },{ // 表格
        reg: /(^|\n)(\|[ ]*\:?\-+\:?[ ]*\|?)+(^|\n)/g,
        rep: function($0, $1, $2, $3){
            return $1 || $3;
        }
    },{ // 引用
        reg: /(^|[\n\t\r]| {4}|\{quote\})>(.*)(^|\n)/g,
        rep: function($0, $1, $2, $3){
            return $1 + "{quote}" + $2 + "{quote}" + $3;
        }
    },{ // 图片
        reg: /(^|\n)!\[[\u4e00-\u9fa5 \w]+\]\(\{\{ BASE_PATH \}\}(.+)\)(^|\n)/g,
        rep: function($0, $1, $2, $3){
            return $1 + "!http://shalles.github.io/blog" + $2 + "!" + $3;
        }
    }
    //(#+)<a.+a>
    //,{
    //  在此增加转换匹配规则
    // }
];
filepath = process.argv[2];
var files = [];
if(!filepath){

}
filepath = isAbsolutePath(filepath) ? filepath : __dirname + "/" + filepath;
encode = process.argv[3] || "utf-8";
convertMDtoWikiMultiFile(filepath, convertRule, encode);
//console.log(content);
