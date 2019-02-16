var gulp = require('gulp');
var sass = require('gulp-sass'); //编译scss
var css = require('gulp-clean-css'); //压缩css
var uglify = require('gulp-uglify'); //压缩js 不支持ES6
var server = require('gulp-webserver'); //起服务
var concat = require('gulp-concat'); //合并js

gulp.task('compileSass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('ysSass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(css())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch(["./src/scss/**/*.scss", "./src/js/**/*.js"], gulp.parallel("compileSass", "scripts"))
})

gulp.task('webserver', function() {
        return gulp.src('./src')
            .pipe(server({
                port: 9090,
                open: true,
                livereload: true
            }))
    })
    //压缩js
gulp.task('bjs', function() {
        return gulp.src('./src/js/**/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js'))
    })
    //合并js
gulp.task('scripts', function() {
    return gulp.src('./src/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'));
});
//8.在gulp中创建default任务，默认执行browserSync服务，js，css，watch任务（10分）；
gulp.task("default", gulp.series("scripts", "compileSass", "servers", "watch"))

gulp.task('build', gulp.parallel('compileSass', 'ysSass', 'bjs'))