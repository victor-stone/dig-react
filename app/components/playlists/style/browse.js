/* playlsits browse */
var browse = `

.playlists-list > li {
  margin-bottom: 19px;
  border: 1px solid #999;
  padding: 8px;
  border-radius: 5px;
  min-height: 60px;
}

.playlists-list > li > .play-all-button {
  margin-right: 10px;
  margin-top: 8px;
  display: inline-block;
  float: left;
}

.playlists-list > li > .playlist-link {
  font-size: 16px;
  font-weight: bold;
  display: block;
  text-align: center;
  color: #666;
}

.playlists-list > li > a > .badge {
  font-size: 9px;
  vertical-align: super;
  background-color: #DDD;
  color: black;
  margin-left: 6px;
}

.playlists-list > li > .playlist-curator {
  display: block;
  text-align: center;
  color: #999;
}

.playlists-list > li > .playlist-curator a {
  color: #666;
  font-style: italic;
}

`;

var tags = `.playlist-tags {
  text-align: left;
  margin-top: 8px;
}

.playlist-tags > .playlist-tag {
  margin-left: 8px;
  color: brown;
  display: inline-block;
}
`;

var bgColor = `
.subnav-option-bar,
.playlist-bg-color {
  background-image: -webkit-linear-gradient(top, #E4DECD 0%, #857254 100%);
  background-image: -o-linear-gradient(top, #3c3c55 0%, #226 100%);
  background-image: -webkit-gradient(linear, left top, left bottom, from(#CCC1A8), to(#8A7759));
  background-image: linear-gradient(to bottom, #CCC0A6 0%, #837052 100%);
  background-repeat: repeat-x;
}
`;

module.exports = { 
  browse, 
  tags,
  bgColor
};
