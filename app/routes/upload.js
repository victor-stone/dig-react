import React from 'react';

const upload = React.createClass({

  render() {
    return  (
      <div>
        <h1>Stuff about upload</h1>
        <p>Blbha lblah blah</p>
      </div>
    );
  },

});

upload.path = '/files/:userid/:uploadid';

module.exports = upload;

