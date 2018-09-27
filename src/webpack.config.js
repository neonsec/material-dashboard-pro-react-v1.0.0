var path = require('path');
var webpack = require('webpack');
var debug = require('debug');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

debug.enable('app:*');

var log = debug('app:webpack');

// the path(s) that should be cleaned
let pathsToClean = [
  '../public/js',
  'build'
]


// the clean options to use
let cleanOptions = {
  root:     '/full/webpack/root/path',
  exclude:  ['shared.js'],
  verbose:  true,
  dry:      false
}

log('Environment set to development mode.');
//var NODE_ENV = process.env.NODE_ENV || 'development';
//var DEVELOPMENT = NODE_ENV === 'development';

log('Creating webpack configuration with development settings.');
//var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
 //       'eventsource-polyfill', // necessary for hot reloading with IE
  //      'webpack-hot-middleware/client',
        './src/index.js',
 //       './src/scss/main.scss',
      ],
    output: {
        path: path.join(__dirname, '../public/js'),
        filename: 'bundle.js',
        publicPath: '/'
    }, 
  //  debug: true,
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.resolve(__dirname, './'), 'node_modules'],
        descriptionFiles: ['package.json']
    },
    plugins: [
  //      new webpack.HotModuleReplacementPlugin(),
  //      new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        //new BundleAnalyzerPlugin()
      ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-0']
            }
        },
        {
          test: /\.scss$/,
          loader: 'style!css!sass',
        },
        {
            // Transform our own .css files with PostCSS and CSS-modules
            test: /\.css$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader'],
          }, {
            // Do not transform vendor's CSS with CSS-modules
            // The point is that they remain in global scope.
            // Since we require these CSS files in our JS or CSS files,
            // they will be a part of our compilation either way.
            // So, no need for ExtractTextPlugin here.
            test: /\.css$/,
            include: /node_modules/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  // path where the images will be saved
                  name: 'assets/img/[name].[ext]'
                }
              },
              {
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    quality: 65
                  },
                  pngquant:{
                    quality: "10-20",
                    speed: 4
                  },
                  svgo:{
                    plugins: [
                      {
                        removeViewBox: false
                      },
                      {
                        removeEmptyAttrs: false
                      }
                    ]
                  },
                  gifsicle: {
                    optimizationLevel: 7,
                    interlaced: false
                  },
                  optipng: {
                    optimizationLevel: 7,
                    interlaced: false
                  }
                }
              }
            ]
          }
        
         ]
        },
//    compiler: {
//        hash_type: 'hash',
//        stats: {
//            chunks: false,
//            chunkModules: false,
//            colors: true,
//        },
//    },
    devServer: {
       historyApiFallback: true
    }
}