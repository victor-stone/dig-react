var React = require('react');

var ccmixter = require('../models/ccmixter');
var serialize = require('../models/serialize');

const free = React.createClass({

 getPlaylist: function() {
    var url = 'http://ccmixter.org/api/query?f=json&limit=10&lic=open';
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(jsonData) {
        var modelData = serialize(jsonData,ccmixter.UploadBasic);
        this.setState({data: modelData});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {data: []};
  },
  
  componentDidMount: function() {
    this.getPlaylist();
  },

  render() {
    return (
      <div className="playlist">
        <h1>Free stuff</h1>
        <Playlist data={this.state.data} />
      </div>
    );      
  },

});

var Playlist = React.createClass({
  render: function() {
    var playlistItems = this.props.data.map(function(upload, index) {
      return (
        <li key={index}>
          {upload.name}
        </li>
      );
    });
    return (
      <ul className="uploadList">
        {playlistItems}
      </ul>
    );
  }
});

module.exports = free;

