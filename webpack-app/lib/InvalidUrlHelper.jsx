var React = require('react');

module.exports = {
  _onStatusChange : function(galleryData) {
    if (galleryData._status === 'galleryUpdated') {
      return this.transitionTo('view', { galleryId : galleryData.gallery.url });
    }

    if (_.isNull(galleryData.gallery)) {
      this.setState({
        'invalidUrl' : true
      });

      setTimeout(() => {
        this.transitionTo('view', { galleryId : '404' });
      }, 1000);

      return;
    }

    this.setState({
      'gallery' : galleryData.gallery
    });
  },

  _renderInvalidUrl : function() {
    return (
      <section className="gallery-container">
        <div className="page-wrapper">
          <h1>Invalid URL</h1>
          <h3>Redirecting you to the Invalid Gallery in 1 second...</h3>
        </div>
      </section>
    );
  }
};