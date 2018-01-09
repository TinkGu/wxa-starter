const path = require('path')
const fs = require('fs-extra')
const gulp = require('gulp')
const babel = require('gulp-babel')
const watch = require('gulp-watch')
const batch = require('gulp-batch')
const gwcn = require('gulp-wxa-copy-npm')
const less = require('gulp-less')
const LessAlias = require('less-import-aliases')
const imagemin = require('gulp-imagemin')
const svgmin = require('gulp-svgmin')
const sourcemaps = require('gulp-sourcemaps')
const gulpif = require('gulp-if')
const rename = require('gulp-rename')
const babelrc = require('./.babelrc.js')

const env = (process.env.NODE_ENV && process.env.NODE_ENV.trim()) || 'development'
const entry = './src/**'
const output = './dist/'
const styleDir = path.resolve(__dirname, './src/style')

const match = exts => exts.map(ext => `${entry}/*.${ext}`)
const renameExt = extname => rename({ extname })
const dest = () => gulp.dest(output)
const dev = (task) => gulpif(env === 'development', task)
const prod = (task) => gulpif(env === 'production', task)
const sourcemapInit = () => dev(sourcemaps.init())
const sourcemapWrite = () => dev(sourcemaps.write('.'))

const htmlFiles = match(['html'])
const lessFiles = match(['less'])
const jsFiles = match(['js'])
const jsonFiles = match(['json'])
const imgFiles = match(['jpg', 'png', 'gif'])
const svgFiles = match(['svg'])
const watchPath = []
    .concat(htmlFiles, lessFiles, jsFiles, imgFiles, svgFiles, jsonFiles)
    .filter(item => !/^!/.test(item))

gulp.task('html', () =>
    gulp
        .src(htmlFiles)
        .pipe(renameExt('.wxml'))
        .pipe(dest()))

gulp.task('less', () =>
    gulp
        .src(lessFiles)
        .pipe(less({
            plugins: [new LessAlias({
                aliases: {
                    _: styleDir
                }
            })]
        }))
        .pipe(renameExt('.wxss'))
        .pipe(dest()))

gulp.task('js', () =>
    gulp
        .src(jsFiles)
        .pipe(sourcemapInit())
        .pipe(babel(babelrc))
        .pipe(gwcn())
        .pipe(sourcemapWrite())
        .pipe(dest()))

gulp.task('json', () => gulp.src(jsonFiles).pipe(dest()))

// gulp.task('static', () => {
//     fs.copy('src/static', 'dist/static').catch(err => console.error(err))
// })

gulp.task('img', () =>
    gulp
        .src(imgFiles)
        .pipe(prod(imagemin()))
        .pipe(dest()))

gulp.task('svg', () =>
    gulp
        .src(svgFiles)
        .pipe(prod(svgmin()))
        .pipe(dest()))

gulp.task('default', ['html', 'less', 'js', 'img', 'svg', 'json'])

gulp.task('watch', () => {
    const watcher = watch(watchPath, {
        ignoreInitial: false,
        events: ['add', 'change', 'unlink', 'unlinkDir']
    }, batch((ev, done) => {
        // eslint-disable-next-line no-console
        console.log(`------------  build start: ${new Date().toTimeString()} ---------------`)
        gulp.start('default', done)
    }))

    watcher.on('unlink', deleteDist)
    watcher.on('unlinkDir', deleteDist)
})

// ---------------------- utils --------------------------

function deleteDist(filepath) {
    const filePathFromSrc = path.relative(path.resolve('src'), filepath)
    const destFilePath = path.resolve('dist', filePathFromSrc)
    const mapFilePath = `${destFilePath}.map`
    const finalDestFilePath = setExt(destFilePath)
    const dels = [mapFilePath, finalDestFilePath]

    dels.forEach(x => fs.remove(x).catch(err => console.error(err)))
}

function setExt(p) {
    const extMap = {
        '.html': '.wxml',
        '.css': '.wxss',
        '.less': '.wxss',
    }

    const ext = path.extname(p)
    const distExt = extMap[ext] || ext

    return path.format(Object.assign(path.parse(p), {
        base: null,
        ext: distExt
    }))
}
