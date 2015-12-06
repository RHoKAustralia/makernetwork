var del = require('del');
var gulp = require('gulp');
var watch = require('gulp-watch');
var requireDir = require('require-dir');
var dir = requireDir('tasks');
var express = require('express');
var ghPages = require('gulp-gh-pages');
var build = require('gulp-build');

gulp.task('clean', function() {
	del('build');
  del('dist');
});

gulp.task('build', ['config', 'copy-fonts', 'copy-images', 'copy-static-maps', 'compile-sass', 'compile-js', 'compile-css']);

gulp.task('watch', [], function () {
    watch(['Gulpfile.js', 'tasks/*.js', 'sass/**/*.*', 'modules/**/*.*', 'img/**/*.*', 'js/**/*.*'], function () {
        gulp.start('build');
    });
});

gulp.task('serve', ['build', 'watch'], function () {
    var server = express();
    server.use(express.static('.'));
    server.listen(9000);
});

gulp.task('package', ['build'], function() {
  gulp.src(['build/**/*.*']).pipe(gulp.dest('dist/build'))
  gulp.src(['modules/**/*.html']).pipe(gulp.dest('dist/modules'))
  gulp.src(['img/**/*.*']).pipe(gulp.dest('dist/img'))
  gulp.src(['CNAME', 'index.html', 'user_management.html']).pipe(gulp.dest('dist'))
});

gulp.task('deploy', ['package'], function() {
  return gulp.src(['./dist/**/*', ''])
      .pipe(ghPages());
});
