const css = `

/* FILES */

.stems-browser .stems-files {
  margin-top: 8px;
  padding: 0px 12px 0px 13px;
}

.stems-browser .stems-files > li {  
  cursor: default;
  display: inline-block;
  background-color: #fcf8e3;
  border-radius: 4px;
  /* min-width: 116px; */
  width: 180px;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 14px;
  margin-bottom: 8px;
  float: left;
}

.stems-browser .stems-files > li .ext {
   text-transform: uppercase;
   background-color: #FFF;
   padding: 2px;
   border-radius: 3px;
   font-size: 10px;
   color: black;
   box-shadow: 1px 1px #666;
   margin-right: 4px;
   margin-left: 4px;
}

/* nic name */
.stems-browsers .stems-files > li > span:nth-child(3) {
  min-width: 30px;
  display: inline-block;
}

.stems-browser .stems-files > li .nic {
   text-transform: lowercase;
   font-size: 12px;
   max-width: 87px;
   display: inline-block;
   overflow: hidden;
   vertical-align: middle;
}

.stems-browser .stems-files > li > span.download-button-container {
  display: inline-block;
  /*float: right;*/
}

.stems-browser .stems-files > li > a.play-disabled,
.stems-browser .stems-files > li > a.play-button,
.stems-browser .stems-files > li > span.zip-link-container        > a.zip-link,
.stems-browser .stems-files > li > span.download-button-container > button.sm-download {
  padding: 4px;
  font-size: 14px;
}

.stems-browser .stems-files > li > a.play-button {
  background: #3CA73C;
}

.stems-browser .stems-files > li > a.play-disabled {
  background: #999;
  border: 0px;
}

li.hi-hi {
  font-weight: bold;
}

.stems-browser .stems-files > li.hi-hi > span div {
  font-weight: normal;
}

.stems-browser .stems-files > li.lo-hi {
}

`;

module.exports = css;

