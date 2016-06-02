var gulp = require('gulp');
var gulpIf = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

//var karma = require('karma');
// other test deps needed? probably



// low-level tasks
// =================

// compile sass
gulp.task('sass', function(){
	return gulp.src('app/styles/**/*.scss').
		pipe(sass()).
		// send to production dist dir
		pipe(gulp.dest('app/styles')).
		pipe(browserSync.reload({
			stream: true
		}));
});

// concatenate and minify scripts
gulp.task('useref', function(){
	// only applies to top level html
	// so that views and partials don't
	// get tossed into /dist
	return gulp.src('app/*.html').
		pipe(useref()).
		// if javascript, minify it
		pipe(gulpIf('*.js', uglify())).
		// send to production dist dir
		pipe(gulp.dest('../server/dist'));
});

// live reload browser
gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			// development server
			baseDir: './app'
		}
	});
});

gulp.task('clean:dist', function(){
	return del.sync('../server/dist');
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
	runSequence('clean:dist', ['sass','useref'], callback );
});

// compile sass, launch server, and watch
gulp.task('default', function(callback){
	runSequence( ['sass','browserSync','watch'], callback);
});