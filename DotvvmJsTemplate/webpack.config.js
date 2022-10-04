const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const env = process.env.NODE_ENV;
const isProduction = env === 'production';

var config = {
    devtool: isProduction ? false : 'inline-source-map',
    mode: env,
    optimization: {
        minimize: isProduction,
        minimizer: !isProduction ? [] : [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false
                    }
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    }
};

controlsExport = Object.assign({}, config, {
    entry: {
        "fluent-controls": './wwwroot/fluent-controls.tsx'
    },
    output: {
        libraryTarget: 'module',
        devtoolModuleFilenameTemplate: '[resource-path]',
        filename: '[name].js',
        path: path.resolve(__dirname, 'wwwroot')
    },
    experiments: {
        outputModule: true
    }
});

module.exports = [controlsExport];