module.exports = {
  lintOnSave: false,
  devServer:{
    port: 8080,
    open: true
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        data: `@import "./public/scss/index.scss";`
      },
    }
  }
}
