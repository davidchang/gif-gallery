var aliases = {};
['actions', 'styles', 'stores', 'components', 'lib'].forEach(function(directoryName) {
  aliases[directoryName] = __dirname + '/webpack-app/' + directoryName;
});

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
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},

      // allow less files to load urls pointing to font assets
      // @TODO: figure out why this is necessary and do it better
      {test: /\.(woff2|woff|ttf|eot|svg)$/, loader: 'file-loader' }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.es6.js'],

    alias : aliases
  }

}
