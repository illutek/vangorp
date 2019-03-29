/**
 * Created by stefan on 20.03.2019.
 * 
 *     
 */

/* jshint node: true */
"use strict";

const gulp = require('gulp'),
      prettyError = require('gulp-prettyerror'),
      watch = require('gulp-watch'),
      prefixer = require('gulp-autoprefixer'),
      uglify = require('gulp-uglify'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      cleancss = require('gulp-clean-css'),
      rimraf = require('rimraf'),
      babel = require('gulp-babel')


/**
 * Variables
 *   
*/
const path = {
    dist: {
        twig: 'dist/templates/',
        php: 'dist/templates/',
        yml: 'dist/',
        theme: 'dist',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/images/',
        fonts: 'dist/fonts/',
        png: 'dist'
    },
    src: {
        twig: 'templates/**/*.twig',
        php: 'templates/**/*.php',
        yml: '*.yml',
        theme: '*.theme',
        js: 'js/**/*.js',
        style: 'sass/styles.scss',
        img: 'images/**/*.*',
        fonts: 'fonts/**/*.*',
        png: '*.png'
    },
    watch: {
        twig: 'templates/**/*.twig',
        php: 'templates/**/*.php',
        yml: '*.yml',
        theme: '*.theme',
        js: 'js/**/*.js',
        style: 'sass/**/*.scss',
        img: 'images/**/*.*',
        fonts: 'fonts/**/*.*'
    },
    clean: './dist'
};

/**
 * clean task
 *   
*/
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


/**
 * task
 *   
*/

gulp.task('twig:dist', function () {
    gulp.src(path.src.twig)
        .pipe(gulp.dest(path.dist.twig));
});

gulp.task('php:dist', function () {
    gulp.src(path.src.php)
        .pipe(gulp.dest(path.dist.php));
});

gulp.task('yml:dist', function () {
    gulp.src(path.src.yml)
        .pipe(gulp.dest(path.dist.yml));
});

gulp.task('theme:dist', function () {
    gulp.src(path.src.theme)
        .pipe(gulp.dest(path.dist.theme));
});

gulp.task('js:dist', function () {
    gulp.src(path.src.js)
        .pipe(prettyError())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.js));
});

gulp.task('style:dist', function () {
    gulp.src(path.src.style)
        .pipe(prettyError())
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleancss({compatibility: 'ie9'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('img:dist', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.dist.img));
});

gulp.task('fonts:dist', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('png:dist', function () {
    gulp.src(path.src.png)
        .pipe(gulp.dest(path.dist.png));
});

gulp.task('dist', [
    'twig:dist',
    'php:dist',
    'yml:dist',
    'theme:dist',
    'js:dist',
    'style:dist',
    'fonts:dist',
    'img:dist',
    'png:dist'
]);


/**
 * Watch
 *   
*/

gulp.task('watch', function(){
    watch([path.watch.twig], function(event, cb) {
        gulp.start('twig:dist');
    });
    watch([path.watch.php], function(event, cb) {
        gulp.start('php:dist');
    });
    watch([path.watch.yml], function(event, cb) {
        gulp.start('yml:dist');
    });
    watch([path.watch.theme], function(event, cb) {
        gulp.start('theme:dist');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:dist');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:dist');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('img:dist');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:dist');
    });
});


gulp.task('default', ['dist', 'watch']);