var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webserver = require('gulp-webserver'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  precss = require('precss'),
  cssnano = require('cssnano'),
  lost = require('lost'),
  fonts = require('postcss-font-magician'),
  normalize = require('postcss-normalize'),
  tinypng = require('gulp-tinypng');


  var config = {
  	"source" : './dev/',
  	"dest" : './public/'

  }

gulp.task('tinypng', function(){
  gulp.src(config.source + 'images/*.jpg')
    .pipe(tinypng('_GhcuLMWJrfeSNTogaPWVDNVk_OFyYrU'))
    .pipe(gulp.dest(config.dest + 'images/'))

  });
  	gulp.task('html', function() {
  		gulp.src(config.source + '*.html')
  		.pipe(gulp.dest(config.dest));
	});

// PostCSS
  gulp.task('css', function() {
  gulp.src(config.source +'css/'+ 'main.css')
  .pipe(postcss([
    precss(),
    lost(),
    autoprefixer(),
    normalize(),
    fonts(),
    cssnano()
  ]))
  .on('error', gutil.log)
  .pipe(gulp.dest(config.dest + 'css'));
});

  gulp.task('watch', function() {
  gulp.watch(config.source + 'css/*.css', ['css']);
  gulp.watch(config.source + '*.html', ['html']);
  gulp.watch(config.source + 'images/*.jpg', ['tinypng']);

});

gulp.task('webserver', function() {
  gulp.src(config.dest)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['html', 'css', 'webserver','watch']);