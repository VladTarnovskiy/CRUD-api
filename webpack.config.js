import { resolve as _resolve } from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const isProduction = process.env.NODE_ENV == "production";

const config = {
  target: "node",
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
    path: _resolve("./dist"),
    asyncChunks: true,
    chunkFormat: "module",
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  experiments: {
    outputModule: true,
  },
};

export default () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
