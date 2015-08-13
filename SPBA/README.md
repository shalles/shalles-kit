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