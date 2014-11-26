var React = require('react');

var galleryActions = require('actions/galleryActions');
var galleryStores = require('stores/galleryStore');

module.exports = React.createClass({

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
              <input type="text" className="form-control" id="title" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description" className="col-sm-1 control-label">Description</label>
            <div className="col-sm-11">
              <textarea className="form-control" id="description"></textarea>
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
