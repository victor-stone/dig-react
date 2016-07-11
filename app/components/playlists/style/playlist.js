var css = `

.playlist-detail-page .edit-controls .btn span {
  margin: -4px 4px;
  display: inline-block;
}

.playlist-detail-page .page-header .edit-controls {
  margin-left: 12px;
}

.playlist-detail-page .page-header .input-group-wrapper {
  display: inline-block;
  width: 50%;

}

.playlist-detail-page .page-header .input-group-wrapper  input,
.playlist-detail-page .page-header .input-group-wrapper  .btn {
  height: 30px;
}

.playlist-info > div {
  margin-bottom: 12px;
}

.playlist-detail-page .playlist-curator {
  text-align: center;
  border-radius: 5px;
}

.playlist-detail-page .playlist-curator span {
  color: black;
}

.playlist-detail-page .playlist-curator a {
  font-style: italic;
}

.playlist-detail-page .playlist-curator .img-circle {
  box-shadow: 6px 4px 16px #857254;
  margin: 5px;
}

.playlist-detail-page .playlist-curator a span span {
  display: inline-block;
  width: 60%;
  color: white;
  text-shadow: 1px 1px black;
  font-size: 16px;
}

.playlist-detail-page .action-btn-toolbar {
  padding: 6px;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 12px;
}

.playlist-detail-page .action-btn-toolbar .modal {
  padding: initial;
  height: initial;
  border-radius: initial;
  text-align: initial;
  margin-bottom: initial;
}

.playlist-detail-page  .action-btn-toolbar > .btn,
.playlist-detail-page  .action-btn-toolbar > span > .btn {
  height: 32px;
  margin-right: 5px;
  margin-bottom: 5px;
  display: inline-block;
}

.playlist-detail-page .action-btn-toolbar .btn {
  height: 32px;
  margin-right: 5px;
  display: inline-block;
}

.playlist-detail-page .static-playlist-tag-editor {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 12px;
}


.playlist-detail-page .playlist-tags {
  border-radius: 5px;
  padding: 4px;
  color: white;
}

.playlist-detail-page .playlist-tags .tags-edit-field-div {
  padding-top: 8px;
}

.playlist-detail-page .playlist-tags .tag-edit-controls {
  text-align: center;
  background: #CCC;
  padding: 4px;
  display: inline-block;
  margin-top: 7px;
  margin-bottom: 3px;
  border-radius: 4px;
  background: white;
  margin-left: 90%;
}

.playlist-detail-page .playlist-tags .tag-edit-controls.editing {
  background: transparent;
  width: 50%;
  margin-left: 25%;
}

.playlist-detail-page .playlist-tags:empty {
  display: none;
}

.playlist-detail-page .playlist-description {
  margin-bottom: 13px;
  color: white;
  text-shadow: 1px 1px #888;;
  padding: 10px;
  border-radius: 5px;
}

.playlist-detail-page .playlist-description a {
  color: white;
  font-weight: 500;
  text-decoration: underline;
}

.playlist-detail-page .playlist-description img {
  display: block;
  margin: 16px auto;
}

.playlist-detail-page .playlist-description .edit-controls {
  margin: 10px;
}

.playlist-detail-page .playlist-description textarea {
  width: 100%;
  height: 10em;
  font-family: Arial;
  color: black;
}

.playlist-detail-page .track-list> li {
  margin-bottom: 8px;
}


.playlist-detail-page .track-list> li > .delete-track-button {
  margin-right: 10px ;
  font-weight: 200;
  padding: 4px;
}

.playlist-detail-page .track-list> li > .delete-track-button:hover::after {
  content: 'remove track';
  margin-left: 5px;
}


.playlist-detail-page .track-list .track-name {
  margin-left: 8px;
  font-size: 18px;
  font-weight: bold;
  color: #555;
}

.playlist-detail-page .track-list .track-artist {
  margin-left: 8px;
  font-size: 16px;
  color: #777;
}

.tracks-widget .edit-controls {
  float: right;
}

.tracks-widget .track-list .ui-sortable {
  padding: 0px;
}

.tracks-widget .track-list .ui-sortable > li {
  padding-bottom: 8px;
  font-size: 17px;
  cursor: pointer;
  color: #777;
}

.tracks-widget .track-list .ui-sortable > li:hover {
  color: black;
}

.tracks-widget .track-list .ui-sortable > li > .dragger {
  margin: 4px;
  padding: 4px;
  border-radius: 2px;
}

`;

module.exports = css;

