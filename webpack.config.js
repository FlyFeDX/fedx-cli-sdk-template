let path = require('path');
const webpack = require('webpack');
const isWsl = require('is-wsl');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'fedx-cli-sdk-template.js',
        library: 'fedx-cli-sdk-template',
        libraryTarget: 'umd'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                // test指定规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use: 'ts-loader',
                // 要排除的
                exclude: /node_modeules/
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            // This is only used in production mode
            new TerserPlugin({
                extractComments: {
                    banner: commentsFile => {
                        return `about license information ${commentsFile}`;
                    }
                },
                terserOptions: {
                    parse: {
                        // We want terser to parse ecma 8 code. However, we don't want it
                        // to apply any minification steps that turns valid ecma 5 code
                        // into invalid ecma 5 code. This is why the 'compress' and 'output'
                        // sections only apply transformations that are ecma 5 safe
                        // https://github.com/facebook/create-react-app/pull/4234
                        ecma: 8
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        // Disabled because of an issue with Uglify breaking seemingly valid code:
                        // https://github.com/facebook/create-react-app/issues/2376
                        // Pending further investigation:
                        // https://github.com/mishoo/UglifyJS2/issues/2011
                        comparisons: false,
                        // Disabled because of an issue with Terser breaking valid code:
                        // https://github.com/facebook/create-react-app/issues/5250
                        // Pending further investigation:
                        // https://github.com/terser-js/terser/issues/120
                        inline: 2
                    },
                    mangle: {
                        safari10: true
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        // Turned on because emoji and regex is not minified properly using default
                        // https://github.com/facebook/create-react-app/issues/2488
                        ascii_only: true
                    }
                },
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                // Disabled on WSL (Windows Subsystem for Linux) due to an issue with Terser
                // https://github.com/webpack-contrib/terser-webpack-plugin/issues/21
                parallel: !isWsl,
                // Enable file caching
                cache: true,
                sourceMap: false
            })
        ]
    },
    // plugins: [
    //     new webpack.BannerPlugin({
    //         banner: '/* eslint-disable */',
    //         raw: true,
    //         entryOnly: true
    //     })
    // ]
    resolve: {
        // extensions: moduleFileExtensions.map((ext) => `.${ext}`).filter((ext) => useTypeScript || !ext.includes('ts')),
        extensions:[".ts",".js",".jsx",".tsx",".json"]
    }
};
