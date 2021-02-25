const { series, src, dest, watch } = require('gulp'); //llaves multiples funciones
const sass = require('gulp-sass');

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

function watchArchivos() {
    watch('src/scss/**/*.scss', css); //* La carpeta acutal, **--> Todos loa archivos con esa extension
}
//Exporta, creando tareas
// exports.tareas = series(css,minificarcss);  //--> ejecuta las tareas en serie
//exports.default =series(css,minificarcss);  //--> ejecuta las tareas con solo poner gulp de comando
//exports.tareas = parallel(css,minificarcss);//--> se completan de acuerdo a la tareas que tengan qu ehacer
exports.css = css;
exports.minificarcss = minificarcss;
exports.watchArchivos = watchArchivos;