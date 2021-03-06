const CopyWebpackPlugin = require("copy-webpack-plugin");
const version = JSON.stringify(require("./package.json").version).replace(/"/g, "");
const useGroup = process.env.REACT_APP_BASIC_TYPE;
let envChannel = `log-admin-${useGroup}-${version}`;
const addRewireScssLoader = require("react-app-rewire-scss-loaders");
module.exports = function override(config, env) {
  if (!config.plugins) {
    config.plugins = [];
  }
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/envInfo.txt",
          to: `./${envChannel}.[ext]`,
        },
      ],
    })
  );

  config = addRewireScssLoader("sass-resources-loader", {
    resources: ["./src/style/setting/base.scss", "./src/style/tools/all.scss"],
  })(config, env);

  return config;
};
