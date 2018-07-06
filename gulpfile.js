//gulpfile.js
var gulp = require('gulp');
var watch = require('gulp-watch')
var sass = require('gulp-sass');

//style paths
var sassFiles = 'public/sass/**/*.sass',
    cssDest = 'public/stylesheets';

let compileSass = function(){
  gulp.src(sassFiles)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(cssDest));
}

gulp.task('styles', function(done){
  compileSass()
  done();
});

gulp.task('watch', function(done){
    gulp.watch(sassFiles)
    .on('change', function(path, stats) {
        console.log(path);
        compileSass();
        done();
    })
    .on('unlink', function(path, stats) {
        console.log(path);
        // code to execute on delete
    });
});
gulp.task('default', gulp.series(['styles', 'watch']));
