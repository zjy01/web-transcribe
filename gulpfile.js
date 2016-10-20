/**
 * Created by carvenzhang on 2016/10/10.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('socket',['concat_js'],()=>{
    gulp.watch(['./public/javascripts/socket.io.min.js', './public/javascripts/transcribe.js', './public/javascripts/trigger.js'],['concat_js'])
});

gulp.task('concat_js', ()=>{
    gulp.src(['./public/javascripts/socket.io.min.js', './public/javascripts/transcribe.js', './public/javascripts/trigger.js'])
        .pipe(concat('io.js'))
        .pipe(gulp.dest('./public/javascripts'))
});
