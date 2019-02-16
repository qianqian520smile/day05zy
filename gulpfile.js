var gulp = require('gulp');
var sass = require('gulp-sass'); //编译scss
var css = require('gulp-clean-css'); //压缩css
var uglify = require('gulp-uglify'); //压缩js 不支持ES6
var server = require('gulp-webserver'); //起服务
var url = require('url');
var path = require('path');
var fs = require('fs');

gulp.task('compileSass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(css())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/**/*.scss', gulp.series('compileSass'))
})

gulp.task('webserver', function() {
    return gulp.src('./src')
        .pipe(server({
            port: 9090,
            open: true,
            livereload: true
        }))
})

gulp.task('bjs', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('build', gulp.series('compileSass', 'webserver', 'bjs', 'watch'))