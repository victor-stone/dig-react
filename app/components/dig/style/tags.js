
var css = `
/* 'clear' button */

.tags-clear {
  margin-right: 8px;
}

/* expanding buttons */

/* 
  Full path: 

  .dig-tags .tag-selectable.tag-selectable-x.tag-selected
*/

.tag-list-selected-container {
  margin-top: 12px;
}

.dig-tags .tag-selectable.tag-selectable-x.tag-selected {
  position: relative;
  background-repeat: repeat-x;
  background-color: transparent;
  border: 0;
  background-image: url('../images/buttons.png');

  /* override these: */  
  background-position: 0px 0px;
  height: 31px;  
  /* margin-right >= ::after width
     margin-left  >= ::before width */
  margin: 0 15px;
}

.dig-tags .tag-selectable.tag-selectable-x.tag-selected::before,
.dig-tags .tag-selectable.tag-selectable-x.tag-selected::after {
  content: ' ';
  position: absolute;
  background-color: transparent;
  top: 0;
  background-image: url('../images/button-heads.png');

  /* height matches above */  
  height: 31px;
}

.dig-tags .tag-selectable.tag-selectable-x.tag-selected::before {
  width: 15px;
  left: -15px;
}

.dig-tags .tag-selectable.tag-selectable-x.tag-selected::after {
  width: 15px;
  right: -15px;
}

.dig-tags .tag-selectable.tag-selectable-x.tag-selected:hover {
  text-decoration: none;
  color: red;
  cursor: default;
}

/* these were .dig-tags .tag-selectable.tag-selectable-x.tag-selected */

.dig-tags .tag-selectable.tag-selectable-x.tag-selected {
  height: 31px;
  background-position: 0px 0px;
  margin-right: 36px;
  margin-bottom: 12px;
  display: inline-block;
  font-weight: 500;
  color: #444;
  padding-top: 5px;
  padding-right: 8px;
  padding-left: 14;
  position: relative;
  font-family: Verdana;
  font-size: 11px;
}

.dig-tags .tag-selectable.tag-selectable-x.tag-selected::before {
  height: 31px;
  background-position: 0px 0px;
  left: -25px;
  width: 25px;
}

.dig-tags .tag-selectable.tag-selectable-x.tag-selected::after {
  height: 31px;
  background-position: -90px 0px;
  right: -10px;
  width: 10px;
}

/* glyph */
.dig-tags .tag-selectable.tag-selectable-x.tag-selected i {
   color: goldenrod;
   font-size: 15;
   margin-right: 5px;
   padding: 0px;
   position: absolute;
   left: -1;
   top: 6;
}
/*
  don't know what these were for

.editable .dig-tags .tag-selectable.tag-selectable-x.tag-selected {
  padding-top: 3px;
}

.editable .dig-tags .tag-selectable.tag-selectable-x.tag-selected i {
   color: goldenrod;
}

.editable .dig-tags .tag-selectable.tag-selectable-x.tag-selected span {
  float: right;
  padding-top: 3px;
  margin-left: 4px;
}
*/


`;

module.exports = css;
