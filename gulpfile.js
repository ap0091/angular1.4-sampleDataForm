var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('public/js/client.js', {read: false})
        .pipe(clean());
});

gulp.task('compress', ['clean'], function() {
    gulp.src('public/js/**/*.js')
        .pipe(concat('client.js'))
        .pipe(gulp.dest('public/js/'))
});

gulp.task('default', ['clean', 'compress']);
