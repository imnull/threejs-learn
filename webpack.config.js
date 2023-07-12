const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (options) => {
    const { WEBPACK_SERVE = false } = options
    const mode = WEBPACK_SERVE ? 'development' : 'production'
    return {
        mode,
        entry: './src/index',
        output: {
            path: path.resolve('dist'),
            filename: 'threejs-learn.js',
            libraryTarget: 'commonjs2',
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            alias: {
                '*': path.resolve(__dirname, 'src'),
                '~': path.resolve(__dirname, 'src'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.[jt]sx?$/,
                    use: [
                        {
                            loader: 'esbuild-loader',
                            options: {
                                // tsconfig: './tsconfig.json',
                                // jsx: 'react-jsx'
                            }
                        }
                    ]
                },
                // {
                //     test: /\.[jt]sx?$/,
                //     use: [{
                //         loader: 'babel-loader',
                //         options: {
                //             presets: [
                //                 ['@babel/preset-react', {
                //                     runtime: 'automatic'
                //                 }],
                //                 '@babel/preset-typescript'
                //             ],
                //         }
                //     }]
                // },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.s[ac]ss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin({
                verbose: true
            }),
            new HTMLWebpackPlugin({
                template: path.resolve(__dirname, 'src/template.html'),
                filename: 'index.html',
                inject: 'body',
                hash: true,
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'public',
                        to: '.'
                    }
                ]
            }),
        ],
        devServer: {
            port: 9002,
            hot: true,
            open: true,
            static: {
                directory: path.resolve('public')
            }
        },
    }
}