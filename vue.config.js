const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
    productionSourceMap: false,
    lintOnSave: false,
    configureWebpack: config => {
        if (isProduction) {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
            config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
            config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
        }
        config.resolve.alias = {
            "_c": path.resolve(__dirname, 'src/components'),
            "@": path.resolve(__dirname, "src")
        }
    },
    devServer: {
        port: 8080
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                path.resolve(__dirname, './src/assets/style/variables.scss'),
                path.resolve(__dirname, './element-variables.scss'),
                path.resolve(__dirname, './src/assets/style/v4.scss'),
            ],
        },
    },
}
