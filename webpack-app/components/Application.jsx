var React = require('react');

require('bootstrap/dist/css/bootstrap.css');
require('styles/styles.less');

var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var NotFoundRoute = Router.NotFoundRoute;
var RouteHandler = Router.RouteHandler;

var CreateGallery = require('components/CreateGallery');
var RecordGif = require('components/RecordGif');
var ViewGallery = require('components/ViewGallery');

var Application = React.createClass({

  render : function() {
    return (
      <section>
        <header>
          Gif Gallery
          <a href="#/">Home</a>
          <a href="#/create">Create Your Own Gif Gallery</a>
        </header>
        <RouteHandler />
      </section>
    );
  }

});

var routes = (
  <Route name="app" path="/" handler={Application}>
    <Redirect from="view/404" to="view" params={{ 'galleryId' : 'NDA0IHBhZ2VrZXlib2FyZCBjYXQ=' }}/>
    <Redirect from="" to="view" params={{ 'galleryId' : 'V2VsY29tZSB0byBHaWYgR2FsbGVyeWtleWJvYXJkIGNhdA==' }}/>

    <Route name="create" handler={CreateGallery} />
    <Route name="recordGif" path="/record/:galleryId" handler={RecordGif} />
    <Route name="view" path="/view/:galleryId" handler={ViewGallery} />

    <NotFoundRoute handler={ViewGallery} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});
