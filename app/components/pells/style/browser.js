var browser =
`
.container.pells-page {
  width: 95%;
}

.pell-detail-description,
.pells-page .tab-content,
.pells-page .nav-tabs > li.active a {
  background-color: #fcfcfc;
}

.pell-browser {
  margin-bottom: 40px;
}


.pell-browser .tab-content {
    border: 1px solid #e2e2e2;
}

.pell-browser .tab-content ul {
  margin: 0px;
  padding: 8px;
  min-height: 316px;
  padding-left: 0px;
  padding-right: 0px;
}

.pell-browser .tab-content li.pell {
  padding-top: 5px;
  padding-bottom: 5px;
  clear: both;
  margin-left: 0px;
  margin-right: 0px;
  padding-left: 8px;
  padding-right: 8px;
}


.pell-browser span.bpm {
  float: right;
}

.pell-browser .pell .artist {
  display: inline-block;
  float: left;
  margin-right: 10px;
  width: 15%;
  overflow: hidden;
  white-space: nowrap;
}

.pells-page a.artist,
.pells-page span.artist a {
  font-style: italic;
  font-size: 12px;
  color: #3c3c55;
 }

.pell-browser .pell .title {
  width: 63%;
  margin-left: 5px;
  padding-left: 5px;
  display: inline-block;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
}

.pell-browser .pell .title:hover {
  background-color: #e2e2e2;
}

.page-header .user-search-results a {
  display: inline-block;
  margin-left: 18px;
  color: #999;
  border: 1px solid;
  padding: 4px;
  border-radius: 3px;
}

.page-header .user-search-results a:hover {
  background-color: #777;
  color: white;
  text-decoration: none;
}

.pell-play {
  display: inline-block;
  float: left;
  margin-right: 12px;
  padding: 3px 7px 3px 9px;
  border-radius: 50%;
}

/* pells detail css */

.pell-detail .download-list { 
  padding: 6px;
  border-left: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
}

.pell-detail-description {
 max-height: 300px;
 border: 0px;
 white-space: pre;
}

.pell-detail .download-list li span.name {
  display: inline-block;
  text-align: center;
  width: 100%;
  font-weight: bold;
}

.pell-detail .download-list li.dl-list {
  margin-bottom: 4px;
  cursor: default;
}

.pell-detail .download-list li a.artist,
.pell-detail .download-list li a.ccm-link
{
  display: inline-block;
  width: 100%;
  text-align: center;
}

.pell-detail .download-list li.dl-list .ext {
   text-transform: uppercase;
   float: right;
   width: 42px;
   text-align: center;
   color: #9d9d9d;
   border: 1px solid #9d9d9d;
   font-size: 11px;
   border-radius: 4px;
}

.pell-detail .download-list li.dl-list .playtime {
  float: right;
  color: #910101;
  font-size: 11px;
  margin-top: 2px;
  margin-right: 4px;
  font-color: 
}

.pell-detail .download-list li.dl-list .nic {
   text-transform: lowercase;
   font-size: 12px;
}

.pell-detail .download-list li.dl-list button.sm-download {
  padding: 4px 6px;
  font-size: 14px;
}


`;

module.exports = browser;

//