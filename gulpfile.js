const { series, src, dest, watch } = require('gulp'); //llaves multiples funciones
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Funcion que compila SASS
const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
};

function css(done) {
    return src(paths.scss)
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(dest('./build/css'));
}
//ñlista para llevarla a produccion
function minificarcss() {
    return src(paths.scss)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(dest('./build/css'));
}

function javascript() {
    return src(paths.js)
        .pipe(concat('bundle.js'))
        .pipe(dest('./build/js'));
}

function imagenes() {
    return src(paths.imagenes)
        .pipe(imagemin())
        .pipe(dest('./build/img'))
        .pipe(notify({ message: 'imagen Minificada' }));

}

function versionWebp() {

    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest('./build/img'))
        .pipe(notify({ message: 'Version webP lista' }));
}

function watchArchivos() {
    watch(paths.scss, css); //* La carpeta acutal, **--> Todos loa archivos con esa extension
    watch(paths.js, javascript);
}
//Exporta, creando tareas
// exports.tareas = series(css,minificarcss);  //--> ejecuta las tareas en serie
//exports.default =series(css,minificarcss);  //--> ejecuta las tareas con solo poner gulp de comando
//exports.tareas = parallel(css,minificarcss);//--> se completan de acuerdo a la tareas que tengan qu ehacer
exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series(css, javascript, imagenes, versionWebp, watchArchivos);