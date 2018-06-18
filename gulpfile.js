//gulpfile.js

var gulp = require('gulp');
var watch = require('gulp-watch')
var sass = require('gulp-sass');

//style paths
var sassFiles = 'public/sass/**/*.sass',
    cssDest = 'public/stylesheets';

gulp.task('styles', function(){
    gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
});

gulp.task('watch',function() {
    return watch(sassFiles, ['styles']);
});
