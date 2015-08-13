/*
 * gulpfile.js
 * shalles
 * 2015.08.12
 */

'use strict';

/*==配置========================================================================*/

var DEBUG = true, //Debug 版本号为@dev 代码无压缩 非Debug 版本号为@时间戳 代码压缩

    config = {
        // 此功能需要安装chrome插件 https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
        livereload: true, 

        // 本地导出目录
        exports: 'src/export',

        // 需要上传到服务器的时候启用 且值为远程服务器地址
        // remote: '/Users/shalles/Workspace/Demo/Map/src/remote',

        // 视图页面的目录和导出目录
        views: {
            src: 'src/views/**/*',
            exp: 'src/export/pages'
        },
        // 脚本的目录和导出目录 支持coffee
        scripts: {
            coffee: true, //使用coffee开发时设为true
            src: 'src/scripts/',
            exp: 'src/export/js'
        },
        styles: {
            scss: true,  //使用scss开发时设为ture
            src: 'src/styles/',
            exp: 'src/export/css'
        },
        images: {
            min: false,  //需要压缩图片是设为true
            src: 'src/images/**/*',
            exp: 'src/export/images'
        }
    };

/*==START========================================================================*/
var gulp = require('gulp'),
    compass = require('gulp-compass'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCSS = require('gulp-minify-css'),
    replace = require('gulp-replace'),
    Rsync = require('rsync'),
    rsync = require('gulp-rsync'),
    exec = require('child_process').exec,
    livereload = require('gulp-livereload'),
    del = require('del');

var dep = [],
    VERSION = (new Date()).getTime(), 
    ENVIRONMENT = '@' + (DEBUG ? 'dev' : VERSION);

// 编译Sass ['clean'],
config.styles && dep.push('compass') && gulp.task('compass', function() {
    // del([config.styles.exp]);
    var data = config.styles.scss ? 
                gulp.src(config.styles.src + '/*.scss')
                    .pipe(compass({
                        //config_file: './config.rb',
                        css: config.styles.src + '/css',
                        sass: config.styles.src,
                        style: 'expanded' //:nested, :expanded, :compact, or :compressed
                    }))
                    .on('error', function(error) {
                        // Would like to catch the error here 
                        console.log(error);
                        //this.emit('end');
                    }) :
                gulp.src(config.styles.src + '/*.css');
    
    DEBUG || (data = data.pipe(minifyCSS()));

    data
        .pipe(concat('app' + ENVIRONMENT + '.css'))
        .pipe(gulp.dest(config.styles.exp));

    config.livereload && data.pipe(livereload());

    console.log('styles')
});

config.scripts && dep.push('scripts') && gulp.task('scripts', function() {
    // del([config.scripts.exp]);
    var data = config.scripts.coffee ?
                gulp.src(config.scripts.src + '/*.coffee')
                    .pipe(sourcemaps.init())
                    .pipe(coffee())
                    .on('error', function(error) {
                        // Would like to catch the error here 
                        console.log(error);
                        //this.emit('end');
                    }) :
                gulp.src(config.scripts.src + '/*.js')
                    .pipe(sourcemaps.init());
            
    DEBUG || (data = data.pipe(uglify()).pipe(sourcemaps.write()));
    
    data.pipe(concat('app'+ ENVIRONMENT +'.js'))
        .pipe(gulp.dest(config.scripts.exp));

    config.livereload && data.pipe(livereload());

    console.log('scripts')
});

// Copy all static images
config.images && dep.push('images') && gulp.task('images', function() {
    // del([config.images.exp]);
    var data = gulp.src(config.images.src);

    config.images.min && (data = data.pipe(imagemin({optimizationLevel: 5})));

    data.pipe(gulp.dest(config.images.exp));

    config.livereload && data.pipe(livereload());

    console.log('images')
});

// gulp.task('version', function(){
//     ENVIRONMENT = '@' + (DEBUG ? 'dev' : VERSION);
// });

config.views && dep.push('views') && gulp.task('views', function(){
    var data =  gulp.src(config.views.src)
                    .pipe(replace('@VERSION', ENVIRONMENT))
                    .pipe(gulp.dest(config.views.exp));

    config.livereload && data.pipe(livereload());

    console.log('views')
});

// 部署或开发时watch变更
config.remote ?
    gulp.task('deploy', dep, function() {
        // gulp.src(config.exports + '/**')
        //     .pipe(rsync({
        //         root: 'build',
        //         //hostname: '127.0.0.1',
        //         //username: 'shalles',
        //         destination: config.remote,
        //         //shell: 'sync.sh',
        //         progress: true
        //     }));

        console.log("-----------开始同步到远程服务器-----------");
        // new Rsync()
        //     // .build({
        //     //     source:      config.exports,
        //     //     destination: config.remote,
        //     //     //exclude:     ['.git'],
        //     //     flags:       'avz',
        //     //     shell:       'ssh'
        //     // })
        //     .shell('ssh')
        //     .flags('rzcv')
        //     .source(config.exports)
        //     .destination(config.remote)
        //     //.command();
        //     .execute(function(error, code, cmd) {
        //         console.log(error);
        //         console.log(code);
        //         console.log(cmd);
        //         console.log(code === 0 ? 
        //             "----------------同步完成----------------" :
        //             "----------------同步失败----------------");
        //     });
        exec("rsync -rzcv --rsh=ssh src/export /Users/shalles/Workspace/Demo/Map/src/remote",
            function (error, stdout, stderr) {
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
    }) :
    gulp.task('watch', dep, function() {
        livereload.listen();

        config.views && gulp.watch(config.views.src, ['views']);
        config.styles && gulp.watch('*/**/*.scss', ['compass']);
        config.scripts && gulp.watch('*/**/*.coffee', ['scripts']);
        config.images && gulp.watch(config.images.src, ['images']);
    });


del.sync(config.exports);

var defaultDep = (config.remote ? 'deploy' : 'watch');

console.log("执行依赖:", dep);
/*==END========================================================================*/

gulp.task('default', [defaultDep], function(){

});
