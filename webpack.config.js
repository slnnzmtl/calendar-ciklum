
module.exports = {
    context: __dirname,
    mode: "development",
    devtool: "source-map",
    entry: "./main.js",
    output: {
      path: __dirname + "/dist",
      filename: "bundle.js"
    },
    
    module:{
        rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
              ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        '@babel/plugin-proposal-object-rest-spread',
                        "@babel/plugin-proposal-class-properties"
                    ]
                  }
                }
              },
              { 
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            // context: path.resolve(__dirname, "src/"),
                            // outputPath: 'dist/',
                            // publicPath: '../',
                            // useRelativePaths: true
                        }
                    }
                ] 
            }
          ],
      },
  }