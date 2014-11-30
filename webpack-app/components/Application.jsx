var React = require('react');

require('bootstrap/dist/css/bootstrap.css');
require('styles/styles.less');

var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var CreateGallery = require('components/CreateGallery');
var RecordGif = require('components/RecordGif');
var ViewGallery = require('components/ViewGallery');

var Application = React.createClass({

  render : function() {
    return (
      <RouteHandler />
    );
  }

});

var routes = (
  <Route name="app" path="/" handler={Application}>
    <Redirect from="view/404" to="view" params={{ 'galleryId' : 'NDA0IHBhZ2VrZXlib2FyZCBjYXQ=' }}/>
    <Route name="create" handler={CreateGallery} />
    <Route name="recordGif" path="/record/:galleryId" handler={RecordGif} />
    <Route name="view" path="/view/:galleryId" handler={ViewGallery} />
    <DefaultRoute handler={CreateGallery} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});
