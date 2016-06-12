var css = `

/* bootstrap disabled this on iphone for some reason 
   so we re-enable it here */

.tree-head .navbar-right .dropdown-menu {
    right: 0;
    left: auto;
}

.tree-head {
  position: relative;
}

.tree-head img {
  /* box-shadow: 2px 2px #715F40; */
}

.tree-head {
  margin: 22px;
  padding: 12px;
  border-radius: 15px;
  border: 1px solid #ccc;
}

.tree-head .img-circle {
    float: left;
}

.tree-head a.artist {
  color: #DDD;
}

.tree-head .collapse-text {
  margin-bottom: 30px;
  min-height: 40px;
}

.tree-head > .collapse-text .cc_format_link {
}

.tree-head > .collapse-text .plain {
  font-size: 12px;
  font-style: italic;
}

.tree-perusal a {
  padding: 8px;
  font-size: 17;
  font-weight: bold;
  border-radius: 4px;
  border: 1px solid transparent;
  opacity: 0.8;
  display: block;
}

.tree-perusal:hover {
  background-color: wheat;
  border: 1px solid #444;
}

.tree-perusal a:hover,
.tree-perusal a:visited,
.tree-perusal a:focus {
  text-decoration: none;
}

.tree-perusal i.fa {
  display: block;
}

.tree-perusal.tree-next {
  text-align: right;  
}

.tree-play-button {
  position: absolute;
  bottom: -14px;
  left: -14px;
  border: 3px solid;
}

span.ribbon.edpick {
  font-size: 12px;
  position: absolute;
  right: 11px;
  top: 0px;
}

.tree-link-head,
.tree-link-tail {
  padding: 0px;
}

.tree-link-head {
  margin-bottom: 0px;
}

.tree-link-head > li,
.tree-link-tail > li {
  margin-bottom: 8px;
}

.tree-link-name {
  font-style: italic;
}
.tree-link-artist {
  color: black;
}

#accordion .form-control {
  height: initial;
}

#accordion .tags-list.form-control li {
  float: left;
  margin-left: 8px;
}

#accordion .panel-title > a.deadlink:hover {
  text-decoration: none;
  cursor: default;
}
.edpick-author {
  text-align: right;
  font-style: italic;
} 

.panel.panel-default i.fa-spinner {
  color: green;
  font-size: large;
  margin: 8px 48%;
}

#recc_heading,
#reviews_heading {
  position: relative;
}

#reviews_heading button.review, 
#recc_heading button.ratings {
  background-color: #006d80;
  color: rgba(255, 255, 255, 0.86);
  border-radius: 8px;
  margin-right: 10px;
  margin-bottom: 5px!important;
  float: none!important;
  right: 30px;
  top: 6px;
  position: absolute;
}

#recc_heading button.ratings.btn-disabled {
  background-color: #777;
}

#reviews span.quote {
  display: block;
  font-style: italic;
  margin-left: 20px;
}

a.recommends-list {
    padding: 2px 0.3em;
    display: inline-block;
    margin: 0px;    
}

a.recommends-list:hover {
    text-decoration: none;
    border-radius: 3px;
    background-color: rgba(186, 226, 183, 0.68);
}

`;

module.exports = css;

//