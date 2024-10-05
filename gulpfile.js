const { src, dest, watch, series, parallel } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// HTML - File Include
const fileInclude = require('gulp-file-include');

// JavaScript
const concat = require('gulp-concat'); // Concatenar archivos JS
const uglify = require('gulp-uglify'); // Minificar JS (opcional)

// Función para procesar los archivos HTML y agregar los includes
function html() {
    return src(['*.html', 'src/**/*.html']) // Procesar los archivos HTML en raíz y src/
        .pipe(fileInclude({
            prefix: '@@', // Prefijo para incluir los archivos
            basepath: '@file' // Usa la ruta relativa para encontrar los archivos parciales
        }))
        .on('error', function(err) { console.error('Error in HTML task', err); }) // Manejo de errores
        .pipe(dest('build')); // Guardar los archivos procesados en build
}

// Función para procesar el CSS
function css(done) {
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));

    done();
}

// Función para procesar imágenes
function imagenes() {
    return src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'));
}

// Función para procesar los archivos JavaScript
function js() {
    return src('src/scripts/**/*.js') // Seleccionar todos los archivos JS en src/js/
        .pipe(sourcemaps.init()) // Inicializar sourcemaps
        .pipe(concat('app.js')) // Concatenar en un solo archivo app.js
        //.pipe(uglify()) // Minificar el JavaScript (opcional)
        .pipe(sourcemaps.write('.')) // Escribir los sourcemaps
        .pipe(dest('build/js')); // Guardar los archivos en build/js
}

// Vigilar cambios
function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
    watch(['*.html', 'src/**/*.html'], html); // Vigilar los archivos HTML
    watch('src/scripts/**/*.js', js); // Vigilar los archivos JS
}

// Exportar las tareas
exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.html = html;
exports.js = js;
exports.default = series(imagenes, css, html, js, dev); // Ejecutar todas las tareas
