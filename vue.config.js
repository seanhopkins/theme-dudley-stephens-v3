const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "src/js",
  productionSourceMap: false,
  publicPath: "",
  configureWebpack: {
    output: {
      libraryExport: "default",
    },
  },
});
