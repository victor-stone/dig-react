var css = `

.tree-head {
  box-shadow: 2px 2px #715F40;
  background-image: -webkit-linear-gradient(top, #846735 0%, #CAAB77 100%);
  background-image: -o-linear-gradient(top, #846735 0%, #CAAB77 100%);
  background-image: -webkit-gradient(linear, left top, left bottom, from(#846735), to(#CAAB77));
  background-image: linear-gradient(to bottom, #846735 0%, #CAAB77 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff3FB040', endColorstr='#ff3FB040', GradientType=0);
  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
  background-repeat: repeat-x;  
}

.tree-head img {
  box-shadow: 2px 2px #715F40;
}

.tree-head {
  margin: 22px;
  padding: 12px;
  border-radius: 15px;
}

.tree-head .img-circle {
    float: left;
}

.tree-head h3 {
  color: white;
}

.tree-head a.artist {
  color: #DDD;
}

.tree-head > .collapse-text {
  color: yellow;
}

.tree-head .collapse-text {
  margin-bottom: 20px;
  min-height: 10px;
}

.tree-head .collapse-text-more-link {
  color: white;
  text-decoration: none;
  float: right;
}

.tree-head .collapse-text-more-link:hover {
  text-decoration: none;
}

.tree-head > .collapse-text-more-link:hover::after {
  content: ' ↕';
  font-weight: bold;
}

.tree-head > .collapse-text .cc_format_link {
  color: white;
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
  bottom: 3px;
  border: 3px solid;
}


span.ribbon.edpick {
  float: right;
  font-size: 12px;
  position: absolute;
  right: 50px;
  top: 22px;
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
.panel-offset-1 {
  margin-left: 12px;
}
.panel-offset-2 {
  margin-left: 32px;
}
.tree-link-head {
  margin-bottom: 0px;
}
.tree-link-tail {
  margin-top: 0px;
}
.tree-link-more {
  margin-top: 12px;
}
.tree-link-name {
  font-style: italic;
}
.tree-link-artist {
  color: black;
}
#reviews span.quote {
  display: block;
  font-style: italic;
  margin-left: 20px;
}    
`;

module.exports = css;

//