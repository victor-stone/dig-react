/* shared query-options css */

const css = `
.query-options-box.open {
  border: 2px solid black;
  border-radius: 7px;
  text-align: center;
  background-color: white;
}

.query-options-box.floating {
  position: absolute;
  right: 0px;
  top: -79;
  z-index: 4;
}    

.query-options-box > button {
  margin: 0px auto;
  margin-bottom: 10px;
}

.query-options-box.open ul.query-options {
  margin: 0px;
  padding: 0px;
}

.query-options-box.open ul.query-options > li.title {
  margin: 0px;
  padding: 4px;
  margin-bottom: 8px;
}

.query-options-box.open ul.query-options > li.title .close {
  width: 30px;
  color:  white;
  opacity: 0.8;
  position: relative;
  top: -2px;
  right: 0px;
}

.query-options-box.open ul.query-options ul.query-options-elements {
  padding: 0px;
}

.query-options-box.open ul.query-options ul.query-options-elements > li {
  margin-bottom: 7px;
  margin-left: 10px;
  margin-right: 10px;
}

.query-options-box.open ul.query-options ul.query-options-elements > li label {
  display: inline-block;
  width: 85%;
  margin-bottom: 12px;
  border: 0px;
}

.query-options-box.open ul.query-options ul.query-options-elements > li input[type="checkbox"] {
  margin-left: 8px;
}

.query-options-box.open ul.query-options ul.query-options-elements > li select {
  display: inline-block;  
}

.query-options-box.open ul.query-options ul.query-options-elements > li #lic {
  width: 75%;
  margin-right: 10px;
}

.query-options-box.open ul.query-options ul.query-options-elements > li #sort {
  width: inherit;
}

.query-options-box.open ul.query-options ul.query-options-elements > li .bpm-slider-container {
  width: 92%;
  margin: 0px auto;
  padding-bottom: 50px;
}

.noUi-pips.noUi-pips-horizontal {
  height: initial;
}

.query-options-box.open ul.query-options ul.query-options-elements > li .bpm-title {
  font-weight: bold;
}

.query-options-box.open ul.query-options ul.query-options-elements > li .bpm-title::after {
  content: ':';
  margin-right: 12px;
}

.query-options-box.open ul.query-options ul.query-options-elements > li .bpm-display {
  display: inline-block;
  padding: 4px;
  margin-right: 1px;
  text-align: center;
  vertical-align: middle;
}


.query-options-box.open ul.query-options .btn.reset-options {
  margin-bottom: 10px;
}`;

module.exports = css;