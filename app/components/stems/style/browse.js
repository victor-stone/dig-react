var css = 
`/* stems list css */

.query-options-box.open {
    border: 1px solid #a4bc44;
    border-radius: 7px;
    text-align: center;
    background-color: rgba(246, 249, 237, 0.45);
    margin-left: -10;
    margin-right: 8px;
}

.query-options-box.open ul.query-options > li.title .close {
  display: none;
}


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
  border-radius: 7px ;
  padding: 9px;
  background-color: rgba(246, 249, 237, 0.99);
  margin-bottom: 30px;
}

.stems-listing-widget .no-hit-suggestion {
  width: 100%;
  margin: 0px;
}

.stems-listing-widget .no-hit-suggestion .empty-query > ul > li {
  margin-bottom: 20px;
}

.stems-browser .stems-listing > li {
  padding: 10px;
}

.stems-browser-widget
  .query-options-box.open 
     ul.query-options > 
       li.title.btn-primary 
{
    background: #a4bc44;
}

.stems-browser .stems-listing ul.tag-list-selectable {
  margin: 12px;
}

.stems-browser 
   .stems-listing 
      a.btn.btn-info.remix-tree-link,
.stems-browser 
   .stems-listing 
      ul.tag-list-selectable 
         li.tag-selectable.tag-selectable-checks.tag-selected 
{
  background: rgb(139, 195, 74);
  border: 1px solid whitesmoke;
  color: white;
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
  font-size: 12px;
  display: inline-block;
  margin-left: 20px;
}

.stems-browser .stems-listing > li .bpm::after{
  content: ' bpm';
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
