const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {main: "/src/pages/index.js"},
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "",
  },
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 8080,
    open: {
      app: {
        name: "chrome",
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      // добавили правило для обработки файлов
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name].[hash][ext][query]",
        },
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[hash][ext][query]",
        },
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {importLoaders: 1},
          },
          "postcss-loader",
        ],
      },
    ],
  },
  devtool: "eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // путь к файлу index.html
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
