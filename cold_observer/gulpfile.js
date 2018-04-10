var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('setup', function(){
  browserify({
    entries: ['src/js/app.js']
  })
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest('public/js/'));
});

gulp.task( 'copy', function() {
    return gulp.src(
        [ 'src/*.html'],
        { base: 'src' }
    )
    .pipe( gulp.dest( 'public' ) );
} );
