var gulp = require('gulp');
var gulpIf = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var useref = require('gulp-useref');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var autoprefixer = require('autoprefixer');



// low-level tasks
// =================

// compile sass
gulp.task('sass', function(){
	return gulp.src('app/styles/**/*.scss').
		pipe(sass()).
		on('error', function(err){
			console.log(err.toString());
			browserSync.notify(err.message, 3000);
			this.emit('end');
		}).
		// autoprefix css
		pipe( postcss ([ autoprefixer ({ browsers: ['> 0.5% in US'] }) ]) ).
		// minify css
		pipe(cssmin()).
		// rename minified css
		pipe(rename({suffix:'.min'})).
		// send to production dist dir
		pipe(gulp.dest('../server/dist/styles')).
		pipe(browserSync.reload({
			stream: true
		}));
});

// concatenate and minify scripts
gulp.task('useref', function(){
	return gulp.src('app/*.html').
		pipe(useref()).
		// if javascript, minify it
		pipe(gulpIf('*.js', uglify())).
		// send to production dist dir
		pipe(gulp.dest('../server/dist'));
});

// minify images
gulp.task('imagemin', function(){
	return gulp.src('app/images/*').
		pipe(imagemin()).
		pipe(gulp.dest('../server/dist/images'));
});


// move bower dependencies over
gulp.task('moveBowerComponents', function(){
	return gulp.src('app/bower_components/**/*.*', {base:'./app'}).
		pipe(gulp.dest('../server/dist'));
});

// move the fucking favicon
gulp.task('moveFavicon', function(){
	return gulp.src('app/favicon.ico').
		pipe(gulp.dest('../server/dist'));
});

// live reload browser
gulp.task('browserSync', function(){
	browserSync.init({
		open: 'ui',
		server: {
			// development server
			baseDir: './app'
		}
	});
});

gulp.task('clean:dist', function(){
	return del.sync('../server/dist', {force:true});
});




// high-level tasks
// ==================

gulp.task('watch', ['browserSync','sass'], function(){
	gulp.watch('app/styles/**/*.scss', ['sass']);
	gulp.watch('app/scripts/**/*.js', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
});


// build production dist dir
gulp.task('build', function(callback){
	runSequence('clean:dist', ['moveBowerComponents','moveFavicon','sass','imagemin','useref'], callback );
});

// compile sass, launch server, and watch
gulp.task('default', function(callback){
	runSequence( ['sass','browserSync','watch'], callback);
});