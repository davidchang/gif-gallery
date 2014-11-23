var React = require('react');

require('bootstrap/dist/css/bootstrap.css');

var Application = React.createClass({

  render : function() {
    return (
      <div>
        <h1>Hello World!</h1>
        <h2>You can edit stuff in here and it will hot update</h2>
      </div>
    );
  }

});

React.renderComponent(Application(), document.body);