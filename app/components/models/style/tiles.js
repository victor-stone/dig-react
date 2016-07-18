var css = `
.tiles ul.play-list {
  padding: 0px;
}

.tiles .play-list li.tile {
  margin: 10px;
  width: 150;
  padding: 4px;
  display: inline-table;
  border-radius: 6px;
  box-shadow: 4px 4px 4px rgba(0,0,0,0.3);
}

div.subnav-option-bar.tree-subnav,
.tiles .play-list li.tile {
  background-color: #607D8B;
}

tiles .play-list li.tile {
  border-radius: 8px;
  box-shadow: 2px 2px #3FB040;;
}      

.tiles .play-list li.tile .tile-wrapper {
  min-height: 120px;
}

.tiles .play-list li .upload-link {
  font-size: 18px;
  display: block;
  text-align: right;
  min-height: 110px;
  margin-top: 8px;
  margin-right: 8px;
  margin-left: 20%;
}

 .tiles .play-list li.tile:hover .upload-link {
  text-decoration: underline;
}

.tiles .play-list li.tile:hover {
  cursor: pointer;
}

.tiles .play-list li .people-link {
  display: block;
  text-align: center;
  margin-top: 8px;
}

.tiles .play-list li .upload-link {
  color: white;
}

.tiles .play-list li .people-link {
  font-weight: 100;
  color: yellow;
  max-width: 120px;
  display: inline-block;
  overflow: hidden;
}

.tiles .play-list li.tile .tools {
  width: 110px;
  margin: 0 auto;
}

.tiles .play-list li.tile .play-button {
  margin-left: 10px;
}

.popover {
  z-index: 5;
}

.tiles  .tile-popover .form-control {
  height: initial;
}

@media screen and (max-width: 770px) {

  .tiles .play-list li.tile {
    margin: 7px 3px;
    width: 130px;
  }
}

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

.tiles ul.play-list {
  padding: 0px;
}
`;

module.exports = css;


//
