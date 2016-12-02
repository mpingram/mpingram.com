const browserSync = require('browser-sync');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const del = require('del');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const useref = require('gulp-useref');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');




// low-level tasks
// =================

// compile sass
gulp.task('sass', function(){
	return gulp.src('public/styles/**/*.scss').
		pipe(sass()).
		on('error', function(err){
			console.log(err.toString());
			browserSync.notify(err.message, 3000);
			this.emit('end');
		}).
		// autoprefix css
		pipe( postcss ([ autoprefixer ({ browsers: ['> 0.5% in US'] }) ]) ).
		// send to production dist dir
		pipe(gulp.dest('public/styles')).
		pipe(browserSync.reload({
			stream: true
		}));
});

// concatenate and minify scripts
gulp.task('useref', function(){
	return gulp.src('public/*.html').
		pipe(useref()).
		// if javascript, minify it
		pipe(gulpIf('*.js', uglify())).
		// if css, minify it
		pipe(gulpIf('*.css', cssmin())).
		// send to production dist dir
		pipe(gulp.dest('../server/dist'));
});

// minify images
gulp.task('imagemin', function(){
	return gulp.src('public/images/*').
		pipe(imagemin()).
		pipe(gulp.dest('../server/dist/images'));
});


// move bower dependencies over
gulp.task('moveBowerComponents', function(){
	return gulp.src('public/bower_components/**/*.*', {base:'./public'}).
		pipe(gulp.dest('../server/dist'));
});

// move the fucking favicon
gulp.task('moveFavicon', function(){
	return gulp.src('public/favicon.ico').
		pipe(gulp.dest('../server/dist'));
});


gulp.task('em-browserSync', function(){
	browserSync.init({
		server:{
			baseDir:'./public/eventmanager'
		}
	});
});

gulp.task('em-sass', function(){
	return gulp.src('public/eventmanager/styles/*.scss').
		pipe(sass()).
		on('error', function(err){
			console.log(err.toString());
			browserSync.notify(err.message, 3000);
			this.emit('end');
		}).
		// autoprefix css
		pipe( postcss ([ autoprefixer ({ browsers: ['> 0.5% in US'] }) ]) ).
		// send to production dist dir
		pipe(gulp.dest('public/eventmanager/parent/styles')).
		pipe(browserSync.reload({
			stream: true
		}));
});



// live reload browser
gulp.task('browserSync', function(){
	browserSync.init({
		open: 'ui',
		server: {
			// development server
			baseDir: './public',

		},

	});
});

gulp.task('clean:dist', function(){
	return del.sync('../server/dist', {force:true});
});




// high-level tasks
// ==================

gulp.task('em-watch', ['em-browserSync', 'em-sass'], function(){
	gulp.watch('public/eventmanager/parent/**/*.scss', ['em-sass']);
	gulp.watch('public/eventmanager/parent/**/*.js', browserSync.reload);
	gulp.watch('public/eventmanager/index.html', browserSync.reload);
});

gulp.task('watch', ['browserSync','sass'], function(){
	gulp.watch('public/styles/**/*.scss', ['sass']);
	gulp.watch('public/scripts/**/*.js', browserSync.reload);
	gulp.watch('public/*.html', browserSync.reload);
});


// build production dist dir
gulp.task('build', function(callback){
	runSequence('clean:dist', ['moveBowerComponents','moveFavicon','sass','imagemin','useref'], callback );
});

// compile sass, launch server, and watch
gulp.task('default', function(callback){
	runSequence( ['sass','browserSync','watch'], callback);
});


gulp.task('em', function(callback){
	runSequence( ['em-sass', 'em-browserSync', 'em-watch'], callback);
});