'use strict';

const { watch, series, src, dest } = require('gulp');
const sass = require('gulp-sass')
const gulpPostCss = require('gulp-postcss')
const gulpReplace = require('gulp-replace');
const minify = require('gulp-minify');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');


function buildTemplate() {
    var version = new Date().getTime();

    return src('./src/index.html')
        .pipe(gulpReplace(/version=\[generated\]/g, 'version=' + version))
        .pipe(dest('./public'));
}

function buildStyles() {

    return src('src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpPostCss([
            tailwindcss,
            autoprefixer,
            purgecss({
                content: ['./public/index.html'],
                whitelistPatternsChildren: [
                    /CodeMirror(?:\-\w*)*/,
                    /cm(?:\-\w*)*/,
                    /active/,
                    /menu-animated/,
                    // /(?:\w+):\w+(-?\d+)?/
                ],
                defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || content.match(/(?<=class:)(\w*)/g) || [],
            }),
            cssnano,
        ]))
        .pipe(dest('./public/dist/'))
}

function buildScripts() {

    return src('src/scripts/*.js')
        .pipe(minify(({
            ext: {
                src: '-debug.js',
                min: '.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        })))
        .pipe(dest('./public/dist/'))
}

function build() {
    buildTemplate();
    buildScripts();
    return buildStyles()
}

exports.build = build

exports.default = function() {
    buildTemplate();
    buildStyles();
    buildScripts();

    watch(['src/**/*.scss', 'src/**/*.js', 'src/**/*.html'], series(buildTemplate, buildStyles));
};