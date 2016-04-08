var Remix = `
.remix-page ul.play-list {
  padding: 0px;
}

.remix-page .play-list li.remix-line {
  margin: 10px;
  width: 150;
  padding: 4px;
  display: inline-table;
}

.remix-page .play-list li.remix-line {
  background-image: -webkit-linear-gradient(top, #276C28 0%, #3FB040 100%);
  background-image: -o-linear-gradient(top, #276C28 0%, #3FB040 100%);
  background-image: -webkit-gradient(linear, left top, left bottom, from(#276C28), to(#3FB040));
  background-image: linear-gradient(to bottom, #276C28 0%, #3FB040 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff3FB040', endColorstr='#ff3FB040', GradientType=0);
  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
  background-repeat: repeat-x;

  border-radius: 8px;
  box-shadow: 2px 2px #3FB040;;
}      

.remix-page .play-list li.remix-line .content-wrapper {
  min-height: 120px;
}

.remix-page .play-list li .song-title {
  font-size: 18px;
  display: block;
  text-align: right;
  min-height: 110px;
  margin-top: 8px;
  margin-right: 8px;
  margin-left: 20%;
}

 .remix-page .play-list li.remix-line:hover .song-title {
  text-decoration: underline;
}

.remix-page .play-list li.remix-line:hover {
  cursor: pointer;
}

.remix-page .play-list li .artist-name {
  display: block;
  text-align: center;
  margin-top: 8px;
}

.remix-page .play-list li .song-title a {
  color: white;
}

.remix-page .play-list li .artist-name a {
  font-weight: 100;
  color: yellow;
  max-width: 120px;
  display: inline-block;
  overflow: hidden;
}

.remix-page .play-list li.remix-line .tools {
  width: 110px;
  margin: 0 auto;
}

.remix-page .play-list li.remix-line .play-button {
  margin-right: 10px;
}

.popover {
  z-index: 5;
}

.remix-page  .remix-popover .form-control {
  height: initial;
}

@media screen and (max-width: 770px) {

  .remix-page .play-list li.remix-line {
    margin: 7px 3px;
    width: 130px;
  }
}

`;

var Remixes = `
.remix-page ul.play-list {
  padding: 0px;
}

.remix-option-bar {
  position: fixed;
  top: 60px;
  background-color: black;
  width: 100%;
  opacity: 0.9;
  z-index: 11;
}

.remix-option-bar .paging {
  display: inline-block;
  margin-left: 18px;
  float: right;
}

.remix-option-bar .paging .pagination {
  margin-right: 8px;
  margin-top: 3px;
  margin-bottom: 3px;
  font-size: 10px;
  float: left;
}

.remix-option-bar .paging-caption {
  display: inline-block;
  margin-right: 8px;
  margin-top: 12px;
  color: white;
  clear: none;
  width: initial;
}

.remix-option-bar .limit-label {
  color: white;
}

@media screen and (max-width: 770px) {

  .remix-option-bar .paging {
    position: absolute;
    top: 47px;
    right: 20px;
  }

  .remix-option-bar .paging > label.limit-label,
  .remix-option-bar .paging > div.paging-caption {
    display: none;
  }

}

`;

var People = `

.people-head {
  background: green;
  padding: 10px;
  color: white;
  border-radius: 8px;
  margin-bottom: 12px;
}

.people-head img {
  float: left;
  margin: 10px;
}

.people-head a {
  color: yellow;
  font-weight: bold;
}

.people .collapse-text {
  margin: 0px 20px;
}

.people .collapse-text .plain {
  font-style: italic;
  font-size: 13px;
}

.people-head .collapse-text-more-link {
  margin-top: 12px;
  display: inline-block;
}

.people .paging {
  max-width: 380px;
  margin-bottom: 14px;
  clear: both;
  border: 1px solid #444;
  padding: 4px 0px 5px 20px;;
  background: #CCC;
  border-radius: 5px;
  box-shadow: 2px 2px #aaa;
}

.people .paging .pagination {
  margin-right: 8px;
  margin-top: 3px;
  margin-bottom: 3px;
  font-size: 10px;
  float: left;
}

.people .paging-caption {
  display: inline-block;
  margin-right: 8px;
  margin-top: 12px;
  width: initial;
}

`;

module.exports = {
  Remixes,
  Remix,
  People
};

//
