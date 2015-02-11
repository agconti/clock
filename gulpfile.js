var gulp = require('gulp')
  , browserSync = require('browser-sync')
  , reload = browserSync.reload
  , changed = require('gulp-changed')
  , autoprefixer = require('gulp-autoprefixer')
  , sass = require('gulp-sass')
  , gutil = require('gulp-util')
  , uglify = require('gulp-uglify')


gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: "./"
    }
  })
})

gulp.task('bs-reload', function () {
    browserSync.reload();
})

gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(changed('public'))
    .pipe(sass({errLogToConsole: true}).on('error', console.error.bind(console)))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('public'))
    .pipe(reload({stream:true}))
})

gulp.task('js', function () {
  return gulp.src('js/**/*.js')
    .pipe(changed('public'))
    .pipe(uglify().on('error', console.error.bind(console)))
    .pipe(gulp.dest('public'))
    .pipe(reload({stream:true}))
})


gulp.task('default', ['sass', 'browser-sync'], function(){
  gulp.watch(['scss/*.scss'], ['sass'])
  gulp.watch(['js/**/*.js'], ['js'])
  gulp.watch('*.html', ['bs-reload'])
})