const {src, dest, series, watch} = require("gulp")
const include = require("gulp-file-include")
const htmlmin = require("gulp-htmlmin")
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sync = require("browser-sync").create()
const del = require("del")

function html(done){
  src("src/**.html")
   .pipe(include({
     prefix: "@@"
   }))
   .pipe(htmlmin({
     collapseWhitespace: true
   }))
   .pipe(dest("dist"))
   done()
}

function scss() {
  return src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(dest('./dist/css'));
};

function clear (){
  return del("dist")
}

function serve(){
  sync.init({

    server: {
      baseDir: "./dist/",
      proxy: "localhost:3000"
    }
  })
  watch("src/**.html", series(html)).on("change", sync.reload)
  watch("src/scss/**.scss", series(scss)).on("change", sync.reload)
}

exports.build = series(clear, scss, html)
exports.serve = series(clear, scss, html , serve)
exports.clear = clear
// exports.html = html
// exports.scss = scss
