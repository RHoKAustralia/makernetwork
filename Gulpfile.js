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
});

gulp.task('build', [ 'config', 'copy-fonts', 'copy-images', 'copy-static-maps', 'compile-sass', 'compile-js', 'compile-css' ]);

gulp.task('watch', [ 'build' ], function() {
	watch([ '**/*.*', 'Gulpfile.js', 'tasks/*.js', '!build/**/*.*' ], function() {
		gulp.start('build');
	});
});

gulp.task('serve', ['build', 'watch'], function () {
    var server = express();
    server.use(express.static('.'));
    server.listen(9000);
});

gulp.task('deploy', function() {
  gulp.src(['build/**/*.*', 'modules/**/*.html', 'index.html'])
    .pipe(gulp.dest('dist'))
  return gulp.src('./**/*')
    .pipe(ghPages());
});
