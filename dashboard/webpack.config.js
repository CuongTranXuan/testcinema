var HtmlWebpackPlugin = require('./node_modules/html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue?$/,
                exclude: /(node_modules)/,
                use: 'vue-loader'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  {
                    loader: 'sass-loader',
                    // Requires sass-loader@^7.0.0
                    options: {
                      implementation: require('./node_modules/sass'),
                      fiber: require('./node_modules/fibers'),
                      indentedSyntax: true // optional
                    },
                    // Requires sass-loader@^8.0.0
                    options: {
                      implementation: require('./node_modules/sass'),
                      sassOptions: {
                        fiber: require('./node_modules/fibers'),
                        indentedSyntax: true // optional
                      },
                    },
                  },
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
              }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://125.212.203.148:8080/api'
        })
    }
}