# Shalles Product Build Assistant

**基于gulp项目开发与构建助手**

- 自动加并更新版本号（@VERSION）
- 支持coffee
- 支持scss
- 支持图片压缩、样式和脚本代码压缩
- livereload监听（当代码有更改时自动刷新浏览器）
- 上传服务器功能还在探索  需要你的支持

```js
//Debug 版本号为@dev 代码无压缩 非Debug 版本号为@时间戳 代码压缩
var DEBUG = true, 

    config = {
        // 此功能需要安装chrome插件 https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
        livereload: true, 

        // 本地导出目录 也是上传到服务器的根目录
        exports: 'src/export',

        // 需要上传到服务器的时候启用 且值为远程服务器地址
        remote: '/Users/shalles/Workspace/Demo/Map/src/remote',

        // 视图页面的目录和导出目录
        views: {
            //你的视图（页面）的开发目录结构（自定义）
            src: 'src/views/**/*',
            //你的视图（页面）的部署目录结构（自定义）
            exp: 'src/export/pages' 
        },
        // 脚本的目录和导出目录 支持coffee
        scripts: {
            coffee: true, //使用coffee开发时设为true
            src: 'src/scripts/',
            exp: 'src/export/js'
        },
        // 样式的目录和导出目录 支持scss(sass)
        styles: {
            scss: true,  //使用scss开发时设为ture
            src: 'src/styles/',
            exp: 'src/export/css'
        },
        // 图片的目录和导出目录 支持压缩
        images: {
            min: false,  //需要压缩图片时设为true
            src: 'src/images/**/*',
            exp: 'src/export/images'
        }
    };
```

Sublime用户可以创建snippet

**操作：**

1. 通过Browser Packages进入sublime的包目录再进到User目录下
2. 将SPBA.sublime-snippet文件放到该目录下
3. 回到Sublime 在你的gulpfile.js中按下快捷键(command/ctrl + shift + P)然后输入snippet:SPBA 回车，该功能代码添加到你的文件里面
4. 配置你需要的功能和目录结构
5. 开始你的编码

**别忘了添加gulp依赖**

```js
"dependencies": {
    "del": "^1.2.0",
    "gulp": "^3.9.0",
    "gulp-compass": "^2.1.0",
    "gulp-concat": "^2.6.0",
    "gulp-imagemin": "^2.3.0",
    "gulp-livereload": "^3.8.0",
    "gulp-minify-css": "^1.2.0",
    "gulp-replace": "^0.5.4",
    "gulp-rsync": "^0.0.5",
    "gulp-sourcemaps": "^1.5.2",
    "rsync": "^0.4.0",
    "gulp-minify": "^0.0.5",
    "gulp-uglify": "^1.2.0",
    "gulp-coffee": "^2.3.1",
    "gulp-requirejs": "^0.1.3"
  }
```
