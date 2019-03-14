var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const resolve = file => path.resolve(__dirname, file);

module.exports = {
  mode: "development",
  output: {
    publicPath: "/",
    filename: "[name].[chunkhash].js"
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      api: resolve("./src/api"),
      assets: resolve("./src/assets"),
      components: resolve("./src/components"),
      mixins: resolve("./src/mixins"),
      pages: resolve("./src/pages"),
      router: resolve("./src/router"),
      static: resolve("./static"),
      store: resolve("./src/store"),
      "@": resolve("./src")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue?$/,
        exclude: /(node_modules)/,
        use: "vue-loader"
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: "img/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: "fonts/[name].[hash:7].[ext]"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  devServer: {
    historyApiFallback: true,
    port: 8084
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: "http://localhost:8080"
    })
  }
};
