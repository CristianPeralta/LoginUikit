let webpack = require('webpack');
let path = require('path');

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  entry:{
    app:'./src/main.js',
    vendor:['vue', 'vue-router', 'vue-socket.io', 'axios']
  },
  output:{
    path:path.resolve(__dirname,'public/js'),
    filename:'[name].js',
    publicPath:'./public'
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.common.js', // 'vue/dist/vue.common.js' for webpack 1
      '@': resolve('src'),
    }
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      names:['vendor']
    })
  ]
};

if(process.env.NODE_ENV === 'production'){
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourcemap: true,
      compress:{
        warnings:false
      }
    })
  );
}
