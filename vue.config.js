// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  devServer: {
    port: 8000,
  },
  runtimeCompiler: true,
  transpileDependencies: true,
};
