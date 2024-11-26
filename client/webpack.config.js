// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, ".", "index.tsx"),
    output: {
      path:path.resolve(__dirname, "dist"),
    },
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
      })
    ],
    module: {
        rules: [
          {
            test: /\.(js|jsx|tsx)$/,
            exclude: /node_modules|test/,
            use: {
              loader: "ts-loader",
            }
          },
        ]
      },
    resolve: {
      extensions: ['.tsx','.ts', '.js']
    },
    devServer: {
    port: 3000,
  },
};