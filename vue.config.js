module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  },
  // chainWebpack: config => {
  //   config.module
  //       .rule('css')
  //       .test(/\.css$/)
  //       .oneOf('vue')
  //       .resourceQuery(/\?vue/)
  //       .use('px2rem')
  //       .loader('px2rem-loader')
  //       .options({
  //         remUnit: 192
  //       })
  // },
  devServer: {
    port: 80
  },
  lintOnSave: false
}
