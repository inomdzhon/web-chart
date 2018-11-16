const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, "examples/src"),
  entry: {
    app: "./index.tsx"
  },
  output: {
    path: path.resolve(__dirname, "examples/dist"),
    filename: "[name].js",
    publicPath: "/"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "examples/src"),
    port: 8000
  },
  resolve: {
    modules: ['examples/src', 'src', 'node_modules', ],
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader",
            options: {
              experimentalWatchApi: true
            }
          }
        ]
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          "sass-loader"
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      hash: true,
      template: path.resolve(__dirname, "examples/src/index.html")
    })
  ]
};
