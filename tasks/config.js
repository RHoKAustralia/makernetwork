var gulp = require("gulp");
var rename = require("gulp-rename");
var ngConstant = require("gulp-ng-constant");

gulp.task('config', function() {
	return gulp.src('.').pipe(rename('config.js')).pipe(ngConstant({
		name : 'config',
		constants : {
			config : {
				 backendUrl : 'https://api.parse.com/1/'
				//backendUrl : 'http://backend.dulcet-theory-91214.appspot.com/'
			}
		}
	})).pipe(gulp.dest('build/js/'));
});