// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  devServer: {
    port: 9000,
  },
  runtimeCompiler: true,
  transpileDependencies: true,
};
