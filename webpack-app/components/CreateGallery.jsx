var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var galleryActions = require('actions/galleryActions');
var galleryStore = require('stores/galleryStore');

module.exports = React.createClass({

  mixins : [
    Router.Navigation,
    Reflux.listenTo(galleryStore, '_onStatusChange')
  ],

  _onStatusChange : function(galleryData) {
    if (galleryData._status === 'galleryCreated') {
      this.transitionTo('record', { galleryId : galleryData.gallery.url });
    }
  },

  _createGallery : function() {
    var inputData = {
      'title'       : document.getElementById('title').value,
      'description' : document.getElementById('description').value
    };
    return galleryActions.createGallery(inputData);
  },

  render : function() {
    return (
      <div className="page-wrapper">
        <h1 className="text-center">Create a New Gif Gallery</h1>
        <section className="form-horizontal" role="form">
          <div className="form-group">
            <label htmlFor="title" className="col-sm-1 control-label">Title</label>
            <div className="col-sm-11">
              <input type="text" className="form-control" id="title" placeholder="Ex: Please Say Hi to Suzi for her Birthday!" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description" className="col-sm-1 control-label">Description</label>
            <div className="col-sm-11">
              <textarea className="form-control" id="description" placeholder="Ex: We may not have seen you recently because we moved away, but I know Suzi would love to see your smiling faces! Please send her a GIF and a message for her birthday! (I'm keeping this a secret until Sunday)"></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-1 col-sm-11">
              <button className="btn btn-default" onClick={this._createGallery}>Create</button>
            </div>
          </div>
        </section>
      </div>
    );
  }

});
