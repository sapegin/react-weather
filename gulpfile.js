var gulp = require('gulp');
var gulpIf = require('gulp-if');
var webpack = require('gulp-webpack');
var stylus = require('gulp-stylus');
var copy = require('gulp-copy');
var ghPages = require('gulp-gh-pages');
var browserSync = require('browser-sync');
var stylobuild = require('stylobuild');
var reload = browserSync.reload;

var isDevelopment = process.env.NODE_ENV !== 'production';

gulp.task('webpack', function() {
	return gulp.src('app/app.js')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('build/'))
		.pipe(gulpIf(isDevelopment, reload({stream: true})));
});

gulp.task('styles', function() {
	return gulp.src('styles/index.styl')
		.pipe(stylus({
			url: {
				name: 'embedurl'
			},
			define: {
				DEBUG: isDevelopment
			},
			paths: [
				'tamia'
			],
			use: [
				stylobuild({
					autoprefixer: {
						browsers: 'last 2 versions, ie 9'
					},
					minifier: isDevelopment ? false : 'cleancss',
					pixrem: false
				})
			]
		}))
	.pipe(gulp.dest('build/'))
	.pipe(gulpIf(isDevelopment, reload({stream: true})));
});

gulp.task('watch', function() {
	if (isDevelopment) {
		browserSync({
			notify: false,
			online: false,
			server: '.'
		});
	}
	gulp.watch(['app/**/*.{js,jsx}'], ['webpack']);
	gulp.watch(['styles/**/*.styl'], ['styles']);
});

gulp.task('make-dist', function() {
	return gulp.src([
			'build/**/*',
			'icons/*.svg',
			'index.html'
		])
		.pipe(copy('dist'));
});

gulp.task('gh-deploy', function() {
	return gulp.src('dist/**/*')
		.pipe(ghPages());
});

gulp.task('default', ['webpack', 'styles']);
gulp.task('devel', ['webpack', 'styles', 'watch']);
gulp.task('deploy', ['webpack', 'styles', 'make-dist', 'gh-deploy']);
