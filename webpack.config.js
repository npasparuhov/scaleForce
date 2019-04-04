const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const devApiDomain = 'https://restcountries.eu';

module.exports = env => {
  const isDev = env === 'development';
  const isProd = env === 'production';
  process.env.NODE_ENV = env;

  return {
    mode: isProd ? 'production' : 'development',
    bail: isProd,
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    entry: path.join(__dirname, 'src', 'index'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: isProd ? 'js/[name].[contenthash:8].js' : 'js/bundle.js',
      chunkFilename: isProd ? 'js/[name].[contenthash:8].chunk.js' : 'js/[name].chunk.js',
      publicPath: '/',
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: { ecma: 8 },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
          cache: true,
        }),
      ],
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      runtimeChunk: true,
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', 'json'],
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          test: /\.(js|mjs|jsx)$/,
          enforce: 'pre',
          use: [
            {
              loader: require.resolve('eslint-loader'),
            },
          ],
          include: path.join(__dirname, 'src'),
        },
        {
          oneOf: [
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: path.join(__dirname, 'src'),
              loader: require.resolve('babel-loader'),
              options: {
                customize: require.resolve(
                  'babel-preset-react-app/webpack-overrides'
                ),
                cacheDirectory: true,
                cacheCompression: isProd,
                compact: isProd,
              },
            },
            {
              test: /\.(scss|sass)$/,
              exclude: /\.module\.(scss|sass)$/,
              use: [
                isDev && require.resolve('style-loader'),
                isProd && {
                  loader: MiniCssExtractPlugin.loader
                },
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 2,
                    sourceMap: isProd
                  }
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      require('postcss-preset-env')({
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      }),
                    ],
                  },
                },
                {
                  loader: require.resolve('sass-loader'),
                }
              ].filter(Boolean),
              sideEffects: true,
            },
            {
              test: /\.(jpg|png)$/,
              loader: require.resolve('file-loader'),
              options: {
                name: 'assets/[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: path.join(__dirname, 'src', 'index.html'),
          },
          isProd
            ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
            : undefined
        )
      ),

      new webpack.DefinePlugin({
        isDev: JSON.stringify(isDev)
      }),

      isDev && new ProgressBarPlugin(),

      isDev && new webpack.HotModuleReplacementPlugin(),

      isDev && new CaseSensitivePathsPlugin(),

      isProd &&
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].chunk.css',
      }),

      isProd &&
      new AppManifestWebpackPlugin({
        logo: path.join(__dirname, 'src', 'assets', 'images', 'logo.png'),
        inject: true,
        output: '/icons/',
        config: {
          appName: 'BookingGo Code Challenge',
          appDescription: 'Code challenge from BookingGo which is short search bar with suggestions',
          developerName: 'Nikolai Asparuhov',
          developerURL: null,
          theme_color: '#fff',
          display: 'standalone',
          orientation: 'portrait',
          version: '1.0',
        }
      })
    ].filter(Boolean),
    performance: false,
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      noInfo: true,
      port: 9000,
      host: '127.0.0.1',
      clientLogLevel: 'none',
      hot: true,
      open: true,
      proxy: [{
        context: ['/rest/v2'],
        target: devApiDomain,
        changeOrigin: true,
      }]
    }
  };
};
