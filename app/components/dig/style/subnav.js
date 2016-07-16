
const css = `
.navbar {
  position: fixed;
  width: 100%;
  z-index: 12;
}

.outlet-wrap {
 padding-top: 80px !important;
}

.query-options-box {
  z-index: 3 !important;
}

.subnav-option-bar,
.query-options-box > button {
  background-color: #607d8b;
  background-image: linear-gradient(to bottom, rgba(150, 178, 191, 0.95) 0%, #708a96 100%);
}

.query-options-box > button:hover {
  background: #2196F3;
}

.query-options-box > button {
  z-index: 4;
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
`;

module.exports = css;
