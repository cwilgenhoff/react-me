module.exports.getConfig = function(type) {

    var isDev = type === 'development';

    var config = {
        entry: './src/client/app/app.js',
        output: {
            path: __dirname,
            filename: 'app.js'
        },
        debug : isDev,
        module: {
            loaders: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }]
        }
    };

    if(isDev){
        config.devtool = 'eval';
    }

    return config;
}
