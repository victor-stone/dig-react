var css = 
`/* stems list css */

.subnav-option-bar {
  background-color: #9AB52F;  
}

.subnav-option-bar .nav-tabs > li > a {
  color: white;
}

.subnav-option-bar .nav-tabs > li > a:hover {
  color: black;
}

.stems-browser {
  margin-top: -10px;
}

/* not a hack. not at all. */
#blerg {
  margin-left: 20px;
}

/* again. not a bit */
.subnav-wrapper > b {
  margin-top: 10px;
  margin-left: 10;
  display: inline-block;
}

.stems-browser .tag-list-checkable-container {
  margin-bottom: 12px;
}

.stems-browser .stems-listing-widget {
  border: 1px solid #7DCF1F;
  border-radius: 7px ;
  padding: 9px;
  background-color: rgba(246, 249, 237, 0.22);
  margin-bottom: 30px;
}

.stems-listing-widget .no-hit-suggestion {
  width: 100%;
  margin: 0px;
}

.stems-listing-widget .no-hit-suggestion .empty-query > ul > li {
  margin-bottom: 20px;
}

.stems-browser .stems-listing > li > .close {
  float: right;
  color: white;
  padding: 0px 4px;
  background: green;
  opacity: .8;
  border-radius: 5px;
}

.stems-browser .stems-listing > li .stem-name {
  margin-right: 15px;
  color: black;
  font-weight: 500;
}

.stems-browser .stems-listing > li .stem-artist:hover,
.stems-browser .stems-listing > li .stem-name:hover {
  color: black;
}

.stems-browser .stems-listing > li .stem-artist {
  font-size: 13px;
  color: #9d9d9d;
  margin-left: 15px;
}

.stems-browser .stems-listing > li .bpm {
  float: right;
  font-size: 12px;
  margin-top: 32px;
}

.stems-browser .stems-listing > li .bpm::before{
  content: 'bpm';
  margin-right: 4px;
}


.stems-browser .zip-contents  {
  padding: 0px;
  margin-top: 12px;
}

.stems-listing {
  padding: 0px 20px 0px 0px;
}

.no-selected-tags {
  color: white;;
  font-size: 20px;
  font-weight: 500;
  text-shadow: 1px 1px black;
  letter-spacing: 3.0;
}


`;

module.exports = css;
