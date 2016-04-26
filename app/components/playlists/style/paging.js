var css = `
.playlist-detail-page .paging {
  position: relative;
}

.paging {
  text-align: center;
  width: 180px;
  background-color: #BBAD92;
  border-radius: 6px;
  padding: 4px 0px;
  margin-bottom: 14px;
}

.paging ul.pagination {

}
.pagination a {
  font-size: 70%
}

.paging > label.limit-label {
  margin-top: 10px;
}

.paging > label.limit-label > span {
  width: 50%;
  margin-right: 9px;
}

.paging > label.limit-label > select {
  display: inline-block;
  font-size: 12px;
  height: initial;
  color: black;
}

@media screen and (max-width: 770px) {

  .paging {
    background-color: transparent;
    margin: 0px auto;
  }
  .paging > label.limit-label,
  .paging > div.paging-caption {
    display: none;
  }

}

`;

module.exports = css;
