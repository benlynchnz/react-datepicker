var gulp       = require('gulp'),
    webpack    = require('gulp-webpack'),
    watch      = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    http       = require('http'),
    st         = require('st'),
    livereload = require('gulp-livereload');

gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('webpack', function() {
    return gulp.src('src/entry.js')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});

gulp.task('server', function(done) {
    http.createServer(
        st({ path: __dirname + '/dist', index: 'index.html', cache: false })
    ).listen(3000, done);
});

gulp.task('watch', ['server'], function() {
    livereload.listen({ basePath: 'dist' });
    gulp.watch('src/**/*.jsx', ['webpack']);
    gulp.watch('src/**/*.css', ['webpack']);
    gulp.watch('src/**/*.html', ['html']);
});

gulp.task('default', function () {
    gulp.start('watch');
});