'use strict';

const CONF = require('./config');

const gulp = require('gulp');
const $$ = require('gulp-load-plugins')();
const bs = require('browser-sync').create();


gulp.task('default', ['dev'], () => {
	console.log('app has been launched in dev mode');
});


gulp.task('build', ['make-html', 'make-css', 'make-js']);


gulp.task('dev', ['build', 'serve']);


gulp.task('serve', ['watch'], () => {
	bs.init({
		server: './dist',
		port: 8822
	});
});


gulp.task('watch', () => {
	gulp.watch(CONF.src + '/**/*.pug', ['make-html']);
	gulp.watch(CONF.src + '/**/*.js', ['make-js']);
	gulp.watch(CONF.src + '/**/*.styl', ['make-css']);
	gulp.watch('./gulpfile.js', $$.restart);
});


gulp.task('make-html', () => {
	return gulp.src(CONF.src + '/index.pug')
		.pipe($$.pug({ pretty: true }))
		.pipe(gulp.dest(CONF.dist))
		.pipe(bs.stream())
	;
});


gulp.task('make-css', () => {
	return gulp.src(CONF.src + '/index.styl')
		.pipe($$.stylus())
		.pipe($$.rename('output.min.css'))
		.pipe(gulp.dest(CONF.dist))
		.pipe(bs.stream())
});


gulp.task('make-js', ['move-medium-files'], () => {
	return gulp.src(CONF.src + '/index.js')
		.pipe($$.plumber())
		.pipe($$.traceur())
		.pipe($$.rename('output.min.js'))
		.pipe(gulp.dest(CONF.dist))
		.pipe(bs.stream())
});


gulp.task('move-medium-files', () => {
	return gulp.src([
		CONF.src + '/worker.js',
		CONF.src + '/lib.js'
	])
		.pipe(gulp.dest(CONF.dist))
});
