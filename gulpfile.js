const   gulp = require('gulp'),
        path = require('path'),
        pug = require('gulp-pug'),
        browserSync = require('browser-sync'),
        sass = require('gulp-sass');

const   SITE_DIR = './build',
        SASS_DIR = './src/sass/**',
        CSS_DIR = './build/css';

/**
 * pug compiler
 */
gulp.task('pug', function(){
    gulp.src('./src/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(SITE_DIR))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('browser-sync', ['sass', 'pug'],function(){
    browserSync({
        server: {baseDir: SITE_DIR},
        notify: true
    })
})

gulp.task('sass', function () {
    return gulp.src(SASS_DIR + '/*.scss')
      .pipe(sass({outputStyle: 'expanded, compressed'}).on('error', sass.logError))
      .pipe(gulp.dest(CSS_DIR))
      .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', function(){
    gulp.watch(SASS_DIR + '/**', ['sass'])
    gulp.watch(['*pug', '**/*.pug'], ['pug'])
})

gulp.task('default', ['browser-sync', 'watch'])