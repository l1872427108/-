const path = require('path');
const resolve = (dir) => {
    return path.join(__dirname, dir);
};

const projectConfig = {
  pages: {
    index: {
      entry: './src/main.js',
      template: './public/index.html',
      filename: 'index.html'
    }
  },
  devServerProxy: {
    '/api': {
      target: process.env.VUE_APP_BASE_API,
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
};

module.exports = {
    lintOnSave: true,
    runtimeCompiler: true,
    pages: {
      ...projectConfig.pages
    },
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 1222,
        https: false,
        hotOnly: false,
        proxy: {
            ...projectConfig.devServerProxy
        }
    },
    chainWebpack: (config) => {

    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json', '.css'],
            alias: {
                '~': resolve('src'),
                assets: resolve('src/assets'),
                components: resolve('src/components')
            }
        }
      }
};
