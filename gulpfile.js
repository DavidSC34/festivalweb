const { series, src, dest, watch } = require('gulp'); //llaves multiples funciones
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');

//Funcion que compila SASS

function css(done) {
    return src('src/scss/app.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(dest('./build/css'));
}
//ñlista para llevarla a produccion
function minificarcss() {
    return src('src/scss/app.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(dest('./build/css'));
}

function imagenes() {
    return src('src/img/**/*')
        .pipe(imagemin())
        .pipe(dest('./build/img'))
        .pipe(notify({ message: 'imagen Minificada' }));

}

function watchArchivos() {
    watch('src/scss/**/*.scss', css); //* La carpeta acutal, **--> Todos loa archivos con esa extension
}
//Exporta, creando tareas
// exports.tareas = series(css,minificarcss);  //--> ejecuta las tareas en serie
//exports.default =series(css,minificarcss);  //--> ejecuta las tareas con solo poner gulp de comando
//exports.tareas = parallel(css,minificarcss);//--> se completan de acuerdo a la tareas que tengan qu ehacer
exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series(css, imagenes, watchArchivos);