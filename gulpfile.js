var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var	prefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var debug = require('gulp-debug');


// MyAddings Start
var uglify = require("gulp-uglify"),            // minificates piped files
	browserSync = require("browser-sync");

var	reload = browserSync.reload;
// MyAddings END

var path = {
    testBuild: "./www",
    project: './source',
    //vendor: './source/bower_components'
};

var config = {
	server: {
		baseDir: "./www"
	},
	/*tunnel: true,*/
	notify: false,
	host: 'localhost',
	port: 9000
};

gulp.task('webserver', function () {
	browserSync(config);
});

var clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('www/*', {read: false})
        .pipe(clean());
});

gulp.task('minAppJs', function() {
    return gulp.src([
            path.project + '/app/**/*.js',
        ])
        .pipe(debug())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(path.testBuild + '/app'))
        .pipe(reload({stream: true}));
});



gulp.task("appJs", function() {
    return gulp.src([
            path.project + '/app/**/*'
        ], {base: "source"})
        .pipe(gulp.dest(path.testBuild))
        .pipe(reload({stream: true}));
});

gulp.task("bower_components", function() {
    return gulp.src('bower_components/**')
        .pipe(gulp.dest(path.testBuild + '/bower_components'));
});

gulp.task('statics', function() {
    return gulp.src([
            path.project + '/templates/**/*'
        ],
        {base: "source"})
        .pipe(gulp.dest(path.testBuild))
        .pipe(reload({stream: true}));
});

gulp.task('stylesheets', function() {
    return gulp.src(path.project + '/sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'})) //'compact', //'compressed', //'nested'
        .pipe(prefixer())
        .on('error', gutil.log)
        .pipe(gulp.dest(path.testBuild + '/stylesheets'))
        .pipe(reload({stream: true}));
});


gulp.task('img', function() {
  return gulp.src(path.project + '/images/**/**.*')
    .on('error', gutil.log)
    .pipe(gulp.dest(path.testBuild + '/images'))
		.pipe(reload({stream: true}));
});

gulp.task('html', function() {
    return gulp.src([path.project + '/*.html', path.project + '/*.xml'])
        .on('error', gutil.log)
        .pipe(gulp.dest(path.testBuild));
});

//  - - - - - - - - - - - - - - - - - - - - -
gulp.task('watch', function() {
    gulp.watch('/bower_components', ['bower_components']);
    gulp.watch(path.project + '/templates/**/*', ['statics']);
    gulp.watch(path.project + '/*.html', ['html']);
    gulp.watch(path.project + '/sass/**/*.scss', ['stylesheets']);
    gulp.watch(path.project + '/app/**/*.*', ['appJs', 'minAppJs']);
});

gulp.task('build', [
    'appJs',
    'minAppJs',
    'bower_components',
    'statics',
    'stylesheets',
    'img',
    'html'
]);

gulp.task('build-and-watch', [
    'build',
    'watch'
]);

gulp.task('default', [
    'build',
    'webserver',
    'watch'
]);
