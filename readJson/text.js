{
    "env": "RE", //Debug 版本号为@dev 代码无压缩 非Debug 版本号为@时间戳 代码压缩
    "version": false,//!DEBUG,
    // 此功能需要安装chrome插件 "https"://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    "livereload": true,//DEBUG,
    "minify": true,//!DEBUG,
    // 本地导出目录
    "exports": "src/export",
    "tmp": "src/tmp",
    "server":{ //more see servermock "https"://www.npmjs.com/package/servermock or "https"://github.com/shalles/servermock
        "port": 8080,
        "protocol": "http", //https\
        "key": "~/cert/cert.key",
        "cert": "~cert/cert.crt",
        "main": "src/export/pages/app-1.html",
        // mock请求
        "mock":{
            "datapath": "mock/",
            "pagepath": "", //page mock data path, default same as page file with .json or .mjson
            "mockrc": ".mockrc", //相对mock datapath
            "ignore": ["html", "jpg", "png", "gif"],
            "regexurl": { //前面是regex new RegExp()
                "/api/1placesuggestion" : "placesuggestion.js", //走js 遵循cmd
                "/api/1placesuggestion" : "placesuggestion.json", //
                "/api/placesuggestion" : "placesuggestion.mjson" //
            }
        }
    },
    // 需要上传到服务器的时候启用 且值为远程服务器地址 gulp sync
    "sync": {
        "flag": "az", //详细请再命令行rsync -h : shell(value): --rsh=SHELL; delete(): --delete;  progress(): --progress;  archive(): -a;  compress(): -z;  recursive(): -r;  update(): -u;  quiet(): -q;  dirs(): -d;  links(): -l;  dry(): -n;          
        "source": "src/export/*",
        "dest": "192.168.1.15:/home/shalles/workspace/www/src.shalles.org"
    },
    // 视图页面的目录和导出目录
    "views": {
        "src": "src/views/**/*",
        "exp": "src/export/pages"
    },
    // 脚本的目录和导出目录 支持coffee
    "scripts": {
        "src": "src/scripts/",
        "exp": "src/export/js"
    },
    "styles": {
        "scss": true,  //使用scss开发时设为ture
        "src": "src/styles/",
        "exp": "src/export/css"
    },
    "images": {
        "min": false,  //需要压缩图片是设为true
        "src": "src/images/**/*",
        "exp": "src/export/images"
    }
}
