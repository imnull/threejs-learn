const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = () => {
    return {
        mode: 'development',
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
                    use: [{
                        loader: 'esbuild-loader',
                        options: {
                            // tsconfig: './tsconfig.json',
                            // jsx: 'react-jsx'
                        }
                    }]
                },
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
            // new CopyWebpackPlugin({
            //     patterns: [
            //         {
            //             from: 'src/components/widget/type.ts',
            //             to: 'component-widget.d.ts'
            //         }
            //     ]
            // }),
        ],
        devServer: {
            port: 9002,
            hot: true,
            open: true,
        }
    }
}