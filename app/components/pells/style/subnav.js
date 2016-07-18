var css = 
`
.subnav-option-bar,
.query-options-box.open ul.query-options > li.title {
  background-image: -webkit-linear-gradient(top,#3c3c55 0,#226 100%);
  background-image: -o-linear-gradient(top,#3c3c55 0,#226 100%);
  background-image: -webkit-gradient(linear,left top,left bottom,from(#3c3c55),to(#226));
  background-image: linear-gradient(to bottom,#3c3c55 0,#226 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff3c3c55', endColorstr='#ff222266', GradientType=0);
  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
  background-repeat: repeat-x;
  border-radius: 4px;
  margin-bottom: 0  
}

.query-options-box.open ul.query-options {
  border: 2px solid #ff3c3c55;  
}

.subnav-option-bar .nav-tabs > li > a {
  color: white;
}

.subnav-option-bar .nav-tabs > li > a:hover {
  color: #777;
}

.subnav-option-bar .nav-tabs > li.active > a {
  color: #555;
}

`;

module.exports = css;
