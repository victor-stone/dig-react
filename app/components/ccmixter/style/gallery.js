var GalleryElement = `
.gallery ul.play-list {
  padding: 0px;
}

.gallery .play-list li.gallery-element {
  margin: 10px;
  width: 150;
  padding: 4px;
  display: inline-table;
  border-radius: 6px;
  box-shadow: 7px 14px 15px rgba(0,100,0,0.3);
}

div.subnav-option-bar.tree-subnav,
.gallery .play-list li.gallery-element {
  background-color: #3f51b5;
}

gallery .play-list li.gallery-element {
  border-radius: 8px;
  box-shadow: 2px 2px #3FB040;;
}      

.gallery .play-list li.gallery-element .content-wrapper {
  min-height: 120px;
}

.gallery .play-list li .song-title {
  font-size: 18px;
  display: block;
  text-align: right;
  min-height: 110px;
  margin-top: 8px;
  margin-right: 8px;
  margin-left: 20%;
}

 .gallery .play-list li.gallery-element:hover .song-title {
  text-decoration: underline;
}

.gallery .play-list li.gallery-element:hover {
  cursor: pointer;
}

.gallery .play-list li .artist-name {
  display: block;
  text-align: center;
  margin-top: 8px;
}

.gallery .play-list li .song-title a {
  color: white;
}

.gallery .play-list li .artist-name a {
  font-weight: 100;
  color: yellow;
  max-width: 120px;
  display: inline-block;
  overflow: hidden;
}

.gallery .play-list li.gallery-element .tools {
  width: 110px;
  margin: 0 auto;
}

.gallery .play-list li.gallery-element .play-button {
  margin-left: 10px;
}

.popover {
  z-index: 5;
}

.gallery  .gallery-element-popover .form-control {
  height: initial;
}

@media screen and (max-width: 770px) {

  .gallery .play-list li.gallery-element {
    margin: 7px 3px;
    width: 130px;
  }
}

`;

var Gallery = `
.subnav-option-bar {
  background-color: black;
}

.subnav-option-bar .nav-tabs > li > a {
  color: white;
}

.subnav-option-bar .nav-tabs > li > a:hover {
  color: #555;
}

.subnav-option-bar .nav-tabs > li.active > a {
  color: #555;
}

.gallery ul.play-list {
  padding: 0px;
}
`;

module.exports = {
  Gallery,
  GalleryElement,
};

//
