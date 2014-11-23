module.exports = {
  context : __dirname + '/webpack-app',
  entry : {
    prod: './components/Application.jsx',
  },

  output : {
    path: __dirname + '/client/',
    filename: '[name].bundled.js'
  },

  module: {
    loaders: [
      {test: /\.jsx$/, loaders: ['es6-loader', 'jsx-loader?insertPragma=React.DOM']},
      {test: /\es6.js$/, loader: 'es6-loader'},

      // compile and include less files
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.less$/, loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'},

      // allow less files to load urls pointing to font assets
      // @TODO: figure out why this is necessary and do it better
      {test: /\.(woff|ttf|eot|svg)$/, loader: 'file-loader' }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.es6.js'],

    alias : {
      app : __dirname + '/web/modules/app.es6.js',
      lib: __dirname + '/web/modules/lib',
      common: __dirname + '/web/modules/common',
      directives: __dirname + '/web/modules/common/directives',
      models: __dirname + '/web/modules/common/models',
      jsx : __dirname + '/web/jsx',
      tests : __dirname + 'web_tests/'
    }
  }

}
