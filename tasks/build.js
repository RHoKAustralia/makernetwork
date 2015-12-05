var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');
var ngAnnotate = require('gulp-ng-annotate');

var isProduction = false;

var jsPaths = {
    core: [
        "modules/**/*.js",

        "js/app.js",
        "js/app.routes.js"
    ],
    alljquery: [
        "bower_components/jquery/dist/jquery.js",
        "bower_components/bootstrap/dist/js/bootstrap.js"
    ],
    allangular: [
        "bower_components/angular/angular.js",
        "bower_components/angular-route/angular-route.js",
        "bower_components/angular-animate/angular-animate.js",
        "bower_components/angular-resource/angular-resource.js"
    ],
    modules: [
        "bower_components/moment/moment.js",
        "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
        "bower_components/angular-ui-router/release/angular-ui-router.js",
        "bower_components/dropdown.js/jquery.dropdown.js",
        "bower_components/arrive/releases/arrive-2.0.0.min.js",
        "bower_components/bootstrap-material-design/dist/js/ripples.js",
        "bower_components/bootstrap-material-design/dist/js/material.js",
        "bower_components/angular-aria/angular-aria.js",
        "bower_components/angular-material/angular-material.js",
        "bower_components/lodash/lodash.js",
        "bower_components/angular-simple-logger/dist/angular-simple-logger.js",
        "bower_components/angular-google-maps/dist/angular-google-maps.js"
    ]
};

var cssPaths = {
    modules: [
        "bower_components/hint.css/hint.css",
        "bower_components/animate.css/animate.css",
        "bower_components/dropdown.js/jquery.dropdown.css",
        "bower_components/bootstrap/dist/css/bootstrap.css",
        "bower_components/font-awesome/css/font-awesome.css",
        "bower_components/bootstrap-material-design/dist/css/ripples.css",
        "bower_components/bootstrap-material-design/dist/css/material-wfont.css",
        "bower_components/angular-material/angular-material.css"
    ]
};

if (!isProduction) {
    uglify = require("gulp-empty");
    uglifycss = require("gulp-empty");
}

gulp.task('copy-images', function () {
    gulp.src([
        'app/src/**/*.jpg',
        'app/src/**/*.jpeg',
        'app/src/**/*.png',
        'app/src/**/*.gif',
        'app/src/**/*.bmp',
        'app/src/**/*.ico'
    ]).pipe(gulp.dest('build/'));
});

gulp.task('copy-static-maps', function () {
    gulp.src([
        'bower_components/bootstrap/dist/css/*.map',
        'bower_components/bootstrap-material-design/dist/css/*.map'
    ]).pipe(gulp.dest('build/css'));


    gulp.src([
        'bower_components/bootstrap-material-design/dist/js/*.map'
    ]).pipe(gulp.dest('build/js'));
});

gulp.task('copy-fonts', function () {
    gulp.src([
        'bower_components/bootstrap/fonts/*',
        'bower_components/font-awesome/fonts/*',
        'bower_components/bootstrap-material-design/fonts/*'
    ]).pipe(gulp.dest('build/fonts'));
});

gulp.task('compile-sass', function() {
	gulp.src(['sass/**/*.css', 'modules/**/*.css'])
	.pipe(concat('core.css'))
	.pipe(uglifycss())
	.pipe(gulp.dest('build/css/'));
});

gulp.task('compile-js', function () {
    Object.keys(jsPaths).forEach(function (componentName) {
        var componentPaths = jsPaths[componentName];

        gulp.src(componentPaths)
            .pipe(concat(componentName + '.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(gulp.dest('build/js/'));
    });
});

gulp.task('compile-css', function () {
    Object.keys(cssPaths).forEach(function (componentName) {
        var componentPaths = cssPaths[componentName];

        gulp.src(componentPaths)
            .pipe(concat(componentName + '.css'))
            .pipe(uglifycss())
            .pipe(gulp.dest('build/css/'));
    });
});