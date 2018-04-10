// npmパッケージのbrowserifyとgulpを読み込む
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

// gulpでbrowserifyを使う処理を実行するようにする
gulp.task('default', function() {
  // browserifyを使ってindex.jsでrxjsを使える環境を構築する
  browserify({
    entries: ['rx-sample.js']
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./'));
});
