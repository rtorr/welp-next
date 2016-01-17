var webpack = require('webpack');
module.exports = {
  entry: {
    welp: ['./src/Welp.ts']
  },
  output: {
    path: 'lib',
    library: 'welp',
    libraryTarget: 'umd',
    filename: 'welp.js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader?configFileName=config/tsconfig.json' }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  ],
  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'immutable': {
        root: 'Immutable',
        commonjs2: 'immutable',
        commonjs: 'immutable',
        amd: 'immutable'
      }
    },
    {
      'flux': {
        root: 'Flux',
        commonjs2: 'flux',
        commonjs: 'flux',
        amd: 'flux'
      }
    }
  ]
}