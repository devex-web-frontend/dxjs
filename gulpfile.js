var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('lib-clean', function() {
	return gulp.src(['lib/*'])
		.pipe(clean());
});

gulp.task('coverage-clean', function() {
	return gulp.src(['coverage/*'])
		.pipe(clean());
});

gulp.task('clean', ['lib-clean', 'coverage-clean']);

gulp.task('check_style', function() {
	var jscs = require('gulp-jscs');
	var jshint = require('gulp-jshint');

	return gulp.src(['src/**/*.js'])
		.pipe(jscs())
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));

});

gulp.task('test', ['coverage-clean', 'check_style'], function(){
	var karma = require('gulp-karma');

	return gulp.src('/fakePath')
		.pipe(karma({
			configFile: 'karma.unit.conf.js',
			browsers: ['PhantomJS'],
			action: 'run'
		}))
		.on('error', function(err) {
			throw err;
		});
});

gulp.task('default', ['test']);
