var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var stylus = require('gulp-stylus');
var copy = require('gulp-copy');
var ghPages = require('gulp-gh-pages');
var webpack = require('webpack');
var notifier = require('node-notifier');
var browserSync = require('browser-sync');
var stylobuild = require('stylobuild');

var isDevelopment = process.env.NODE_ENV !== 'production';
var isWatch = false;

function reload() {
	if (isDevelopment && isWatch) {
		return browserSync.reload.apply(browserSync, arguments);
	}
	else {
		return gutil.noop();
	}
}

function notifyError(plugin, message, filepath, filename) {
	console.log(gutil.colors.red.bold('\nError in ' + (filename || filepath) + '\n'));
	console.log(message);
	if (isWatch) {
		notifier.notify({
			title: '\uD83D\uDEA8 ' + plugin + ' error',
			message: gutil.colors.stripColor(message).replace(/ +/g, ' '),
			open: 'file://' + filepath
		});
	}
	else {
		process.exit(1);
	}
}

gulp.task('webpack', function() {
	webpack(require('./webpack.config.js'), function(err, stats) {
		var error, message;
		if (stats.hasErrors()) {
			error = stats.compilation.errors[0];
			message = error.error;
		}
		else if (stats.hasWarnings()) {
			error = stats.compilation.warnings[0];
			message = error.warning;
		}
		if (error) {
			notifyError('Webpack', message.toString(), error.module.resource, error.module.rawRequest);
		}
		else {
			reload();
		}
	});
});

gulp.task('styles', function() {
	return gulp.src('styles/index.styl')
		.pipe(plumber({errorHandler: function(error) {
			notifyError('Stylus', error.message.replace(/.*\n/, ''), error.filename);
			this.emit('end');
		}}))
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
	.pipe(reload({stream: true}));
});

gulp.task('watch',  ['webpack', 'styles'], function() {
	isWatch = true;
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
gulp.task('deploy', ['webpack', 'styles', 'make-dist', 'gh-deploy']);
