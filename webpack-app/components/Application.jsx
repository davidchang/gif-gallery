var React = require('react');

require('bootstrap/dist/css/bootstrap.css');
require('styles/styles.less');

var Router = require('react-router');
var {
  Route,
  Link,
  Redirect,
  NotFoundRoute,
  RouteHandler
} = Router;

var CreateGallery = require('components/CreateGallery');
var RecordGif = require('components/RecordGif');
var ViewGallery = require('components/ViewGallery');

var Application = React.createClass({

  render : function() {
    return (
      <section>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
                <Link className="navbar-brand" to="view" params={{ 'galleryId' : 'home'}}>Gif Gallery</Link>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <Link to="create">Create Your Own Gif Gallery</Link>
              </li>
            </ul>
          </div>
        </nav>
        <RouteHandler />
      </section>
    );
  }

});

var routes = (
  <Route name="app" path="/" handler={Application}>
    <Route name="create" handler={CreateGallery} />
    <Route name="record" path="/record/:galleryId" handler={RecordGif} />
    <Route name="view" path="/view/:galleryId" handler={ViewGallery} />

    <Redirect from="" to="view" params={{ 'galleryId' : 'home' }}/>
    <NotFoundRoute handler={ViewGallery} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.body);
});
