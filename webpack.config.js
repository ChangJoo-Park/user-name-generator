module.exports = {
    entry  : './lib/main.js',
    output : {
        path     : __dirname,
        filename : './app.dist.js'
    },
    module : {
        loaders: [ {
                test   : /.js$/,
                loader : 'babel-loader'
            }
        ]
    }
};
