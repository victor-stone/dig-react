
var css = `

.outlet-wrap { 
  padding-top: 130px; 
}

.subnav-option-bar {
  position: fixed;
  top: 60px;
  left: 0px;
  width: 100%;
  opacity: 0.9;
  z-index: 11;
}

.subnav-option-bar .subnav-tabs li a .badge { 
  margin-left: 8px; 
}

.subnav-option-bar .paging {
  display: inline-block;
  margin-left: 18px;
  float: right;
}

.subnav-option-bar .paging .pagination {
  margin-right: 8px;
  margin-top: 3px;
  margin-bottom: 3px;
  font-size: 10px;
  float: left;
}

.subnav-option-bar .paging-caption {
  display: inline-block;
  margin-right: 12px;
  margin-left: 12px;
  margin-top: 12px;
  color: white;
  clear: none;
  width: initial;
}

.subnav-option-bar .limit-label {
  color: white;
  margin-right: 12px;
}

@media screen and (max-width: 770px) {

  .subnav-option-bar .paging {
    position: absolute;
    top: 10px;
    right: 20px;    
  }

  .subnav-option-bar .paging > label.limit-label,
  .subnav-option-bar .paging > div.paging-caption {
    display: none;
  }

}
`;
module.exports = css;
//
