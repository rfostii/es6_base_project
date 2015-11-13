var gulp = require("gulp");
var babel = require("gulp-babel");
var babelify = require('babelify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var minifyCss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var Server = require('karma').Server;
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var sasslint = require('gulp-sass-lint');

gulp.task('build', function() {
    browserify({
    entries: './src/js/main.js',
    debug: true
    })
    .transform(babelify)	
    .bundle()
    .pipe(source('./main.js'))    
    .pipe(gulp.dest('./build'));
});

gulp.task('collect-templates', function () {
  return gulp
    .src([
        './src/js/modules/gallery/gallery.tmpl',
        './src/js/modules/settings/settings.tmpl',
        './src/js/app.tmpl'
    ])
    .pipe(gulp.dest('./build/templates'))
})

gulp.task('lint', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('compress', function() {
  return gulp.src('./build/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build'));
});

gulp.task("compile", function () {
  return gulp.src("./src/js/*.js")
    .pipe(babel())
    .pipe(gulp.dest("./build/"));
});

gulp.task('build-styles', function() {
  return gulp.src('./src/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./build'));
});

gulp.task('sass', function () {
  gulp.src('.src/sass/**/*.s+(a|c)ss')
	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
	.pipe(minifyCss({compatibility: 'ie8'}))
	.pipe(sourcemaps.write())
    .pipe(gulp.dest('./build'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('.src/sass/**/*.scss', ['sass-lint', 'sass']);
});

gulp.task('sass-lint', function() {
  return gulp.src('.src/scss/*.s+(a|c)ss')
    .pipe(sasslint())
	.pipe(sasslint.format())
    .pipe(sasslint.failOnError());
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('dev', ['build', 'build-styles', 'collect-templates'], function() {	
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('src/js/**/*.js', ['build']).on("change", browserSync.reload);	
    gulp.watch('src/**/*.css', ['build-styles']).on("change", browserSync.reload);  
    gulp.watch('src/**/*.tmpl', ['collect-templates']).on("change", browserSync.reload);  
});

gulp.task('production', ['build', 'compress', 'build-styles', 'collect-templates']);