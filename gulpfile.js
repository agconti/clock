var gulp = require('gulp')
  , browserSync = require('browser-sync')
  , reload = browserSync.reload
  , changed = require('gulp-changed')
  , autoprefixer = require('gulp-autoprefixer')
  , sass = require('gulp-sass')
  , gutil = require('gulp-util')


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
    .pipe(changed('dest'))
    .pipe(sass().on('error', console.error.bind(console)))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dest'))
    .pipe(reload({stream:true}))
})

gulp.task('js', function () {
  return gulp.src('js/**/*.js')
    .pipe(changed('dest'))
    .pipe(gulp.dest('dest'))
    .pipe(reload({stream:true}))
})


gulp.task('default', ['sass', 'browser-sync'], function(){
  gulp.watch(['scss/*.scss'], ['sass'])
  gulp.watch(['js/**/*.js'], ['js'])
  gulp.watch('*.html', ['bs-reload'])
})