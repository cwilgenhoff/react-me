var gulp = require('gulp');
var browserSync = require('browser-sync');
var plugins = require('gulp-load-plugins')();
var del = require('del');

// set variable via $ gulp --type production
var environment = plugins.util.env.type || 'development';

var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js').getConfig(environment);

// set variable via $ gulp --port <port> --eport <port>
var port = plugins.util.env.port || 9000;
var eport = plugins.util.env.eport || 7200;

var client = './src/client/';
var server = './src/server/';
var dist = 'public/';

gulp.task('scripts', function() {
    return gulp.src(webpackConfig.entry)
        .pipe(plugins.webpack(webpackConfig))
        .pipe(isProduction ? plugins.uglifyjs() : plugins.util.noop())
        .pipe(gulp.dest(dist + 'js/'))
        .pipe(plugins.size({ title : 'js' }))
        .pipe(plugins.connect.reload());
});

gulp.task('html', function() {
    return gulp.src(client + 'index.html')
        .pipe(gulp.dest(dist))
        .pipe(plugins.size({ title : 'html' }))
        .pipe(plugins.connect.reload());
});

gulp.task('styles', function() {
    return gulp.src(client + 'assets/css/*.css')
        .pipe(gulp.dest(dist + 'css/'))
        .pipe(plugins.size({ title : 'css' }))
        .pipe(plugins.connect.reload());
});

gulp.task('live-server', function() {
    var liveServer = new plugins.liveServer(server + 'index.js');
    liveServer.start();
});

gulp.task('serve', function() {
    browserSync.init(null, {
        proxy: "http://localhost:" + eport,
        browser: "google-chrome",
        port: port
    });
});

gulp.task('watch', function() {
    gulp.watch(client + 'assets/css/*.css', ['styles']);
    gulp.watch(client + 'index.html', ['html']);
    gulp.watch(client + 'app/**/*.js', ['scripts']);
    gulp.watch(client + 'app/**/*.jsx', ['scripts']);
});

gulp.task('clean', function(cb) {
    del([dist], cb);
});

gulp.task('default', ['live-server', 'build', 'serve', 'watch']);

gulp.task('build', ['clean', 'html', 'scripts', 'styles']);
