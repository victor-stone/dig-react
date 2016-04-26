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
  margin-left: -15px; /* make up for container-fluid */
  margin-top: -10px;
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

/* stems tags css */

.stems-browser .stems-tags-widget {
  margin-left: 25px;
}

.stems-browser .stems-tags-widget .tab-content {
  padding-top: 14px;
}

.stems-browser .stems-tags-widget .input-group {
  width: 170px;
  margin: 4 auto; 
  margin-bottom: 10px;
}

.stems-tags-widget span.badge {
  background-color: #9AB52F;
}

.stems-browser .stems-tags-widget .tab-content {
  border-bottom: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
  border-left: 1px solid #e2e2e2;
}

.stems-browser ul.tags-list {
  height: 360px;
  overflow: auto;
  padding: 8px;
  width: 220px;
  background-color: white;
  margin: 0 auto;
}

.stems-browser ul.tags-list > li {
  padding: 0 4px 0 4px;
  margin-bottom: 3px;
  cursor: pointer;
  border: 1px solid transparent;
}

.stems-browser ul.tags-list > li:hover {
  border: 1px solid black;
  border-radius: 4px;
}

.stems-browser ul.tags-list > li > i.fa {
  vertical-align:middle;
  display: inline-block;  
}

.bounding-fixed {
  position: fixed;
}

.selected-tags {
  padding-top: 3px;
  padding-left: 30px;
  padding-right: 220px;
  min-height: 42px;
  z-index: 200;
  position: fixed;
}

.selected-tags .btn-tag {
  display: inline-block;
  margin: 4px 6px;;
  border: 1px solid green;
  padding: 2px 4px 2px 4px;
  border-radius: 3px;
  color: green;
  text-decoration: none;
  box-shadow: 1px 1px #389E39;
  background-color: antiquewhite;
}

.selected-tags .btn-tag:hover {
  padding: 2px 3px 2px 5px;
  text-decoration: none;
  box-shadow: 1px 1px #CCC;
  color: red;  
  border-color: red;
}

.selected-tags .btn-tag .fa-2x {
  font-size: 13px;
}

.stems-tags-widget .related-tags ul.tags-list {
  font-weight: bold;
  color: green;
  height: 150px;
  margin-bottom: 15px;
}

.no-selected-tags {
  color: white;;
  font-size: 20px;
  font-weight: 500;
  text-shadow: 1px 1px black;
  letter-spacing: 3.0;
}

/* stems detail css */

.stems-detail {
  display: none;
  margin:  7px;
  padding: 4px;
  border: 1px solid green;
  border-radius: 5px;
}

.stems-detail {
  background-image: linear-gradient(to bottom, rgba(255,235,59,0.27) 0%, rgba(247,234,57,0.2) 100%);
}

.stems-detail .upload-tags {
  margin: 12px 4px;
}


.stems-detail .upload-tags .btn-tag {
  margin: 4px;
}

.stems-detail .ccmixter-link {
  float: right;
  margin: 12px;
}

`;

module.exports = css;
