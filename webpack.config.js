const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "duckPort",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({

      name: "DuckGameApp",
      filename: "remoteEntry.js",
      exposes: {
        './Duck': './src/app/duck-hunt/duck-hunt.module.ts',
      },


      shared: share({
        "@angular/core": {singleton: true,  requiredVersion: ">=12.0.0"},
        "@angular/common": {singleton: true, requiredVersion: ">=12.0.0"},
        "@angular/common/http": {singleton: true, requiredVersion: ">=12.0.0"},
        "@angular/router": {singleton: true, requiredVersion: ">=12.0.0"},
        "duck-hunt": {},
        ...sharedMappings.getDescriptors()
      })

    }),
    sharedMappings.getPlugin()
  ],
};
