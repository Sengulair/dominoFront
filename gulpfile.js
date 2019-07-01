var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browsersync   = require('browser-sync'),//livereload при сохранении
		concat        = require('gulp-concat'),//объединение js файлов в один
		uglify        = require('gulp-uglify'),//минификация js
		cleancss      = require('gulp-clean-css'),//минификация css
		rename        = require('gulp-rename'),//переименование файлов
		autoprefixer  = require('gulp-autoprefixer'),//css префиксы для кроссбраузерности
		notify        = require("gulp-notify"),//notification errors, message, etc.
		rsync         = require('gulp-rsync'),
		imagemin      = require('gulp-imagemin'),
		pngquant      = require('imagemin-pngquant'),
		del           = require('del'),
		cache         = require('gulp-cache');

gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	})
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		une: [pngquant()]
	})))
	.pipe(gulp.dest('compressedImg'));
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browsersync.reload( {stream: true} ))
});

gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/font-awesome/svg-with-js/js/fontawesome-all.min.js',
		'app/libs/slick-carousel/slick/slick.min.js',
		'app/libs/equal-height/dist/jquery.equalHeight.min.js',
		'app/libs/waterwheel-carousel/jquery.waterwheelCarousel.min.js',
		'app/js/common.js', // Always at the end
		], {allowEmpty: true})
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browsersync.reload({ stream: true }))
});

// gulp.task('rsync', function() {
// 	return gulp.src('app/**')
// 	.pipe(rsync({
// 		root: 'app/',
// 		hostname: 'username@yousite.com',
// 		destination: 'yousite/public_html/',
// 		// include: ['*.htaccess'], // Includes files to deploy
// 		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
// 		recursive: true,
// 		archive: true,
// 		silent: false,
// 		compress: true
// 	}))
// });

gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browsersync.reload({stream: true}))
});

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('js'));
	gulp.watch('app/*.html', gulp.parallel('code'))
});

// gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
// 	gulp.watch('app/sass/**/*.sass', ['sass']);
// 	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
// 	gulp.watch('app/*.html', browsersync.reload)
// });

// gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

// 	var buildFiles = gulp.src([
// 		'app/*.html',
// 		'app/.htaccess',
// 		]).pipe(gulp.dest('dist'));

// 	var buildCss = gulp.src([
// 		'app/css/main.min.css',
// 		]).pipe(gulp.dest('dist/css'));

// 	var buildJs = gulp.src([
// 		'app/js/scripts.min.js',
// 		]).pipe(gulp.dest('dist/js'));

// 	var buildFonts = gulp.src([
// 		'app/fonts/**/*',
// 		]).pipe(gulp.dest('dist/fonts'));
// });
// gulp.task('removedist', function() { return del.sync('dist'); });

gulp.task('removedist', gulp.series(function(done) { 
	del.sync('dist'); 
	done();
}));

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	// .pipe(cache(imagemin())) 
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('build', gulp.series('removedist', 'imagemin', 'sass', 'js', function() {

	 // gulp.src('app/*.html').pipe(gulp.dest('dist'));
	gulp.src(['app/*.html',	'app/.htaccess',], { allowEmpty: true }).pipe(gulp.dest('dist'));

	gulp.src(['app/css/main.min.css',], { allowEmpty: true }).pipe(gulp.dest('dist/css'));

	gulp.src(['app/js/scripts.min.js',], { allowEmpty: true }).pipe(gulp.dest('dist/js'));

	gulp.src(['app/fonts/**/*',], { allowEmpty: true }).pipe(gulp.dest('dist/fonts'));

}));

gulp.task('default', gulp.parallel('watch', 'sass', 'js', 'browser-sync'));
// gulp.task('default', ['watch']);
