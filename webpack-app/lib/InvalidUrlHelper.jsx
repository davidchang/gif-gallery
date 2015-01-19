var React = require('react');

module.exports = {
  _onStatusChange : function(galleryData) {
    if (_.isNull(galleryData.gallery)) {
      this.setState({
        'invalidUrl' : true
      });

      setTimeout(() => {
        location.hash = `#/view/404`;
        location.reload();
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