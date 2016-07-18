var css =

`
.people-head,
.people .tiles .play-list li.tile,
div.subnav-option-bar.people-subnav {
  background-image: -webkit-linear-gradient(top, #276C28 0%, #3FB040 100%);
  background-image: -o-linear-gradient(top, #276C28 0%, #3FB040 100%);
  background-image: -webkit-gradient(linear, left top, left bottom, from(#276C28), to(#3FB040));
  background-image: linear-gradient(to bottom, #276C28 0%, #3FB040 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff3FB040', endColorstr='#ff3FB040', GradientType=0);
  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
  background-repeat: repeat-x;
}

@media screen and (max-width: 700px) {
  .people-head form .form-group .input-group .form-control {
    overflow: hidden;
    max-width: 90%;
  }
  .people-head form .form-group .input-group .form-control a {
    white-space: nowrap;
  }
}

.people-head {
  padding: 10px;
  color: white;
  border-radius: 8px;
  margin-bottom: 12px;
}

.people-head img {
  float: left;
  margin: 10px;
}

.people-head a {
  color: yellow;
  font-weight: bold;
}

.people .collapse-text {
  margin: 0px 20px;
}

.people .collapse-text .plain {
  font-style: italic;
  font-size: 13px;
}

.people-head form {
  margin: 8px auto;
  padding: 8px 0px;
  border-radius: 5px;
  opacity: 0.85;
}

@media screen and (min-width: 770px) {
  .people-head form {
    width: 65%;
  }
}

.people-head form .form-group {
  width: 95%;
  margin: 8px auto;
}

.people-head form .form-group .input-group {
  border: 1px solid green;
  border-radius: 3px;
}

.people-head form .form-group .input-group .form-control {
  height: inherit;
}

.people-head form .form-group .input-group .form-control a {
  color: #314E31;  
}

.people-head form .form-group .input-group .form-control a {
  padding: 2px 0.3em;
  display: inline-block;
  margin: 0px;
}

.people-head form .form-group .input-group .form-control a:hover {
  text-decoration: none;
  border-radius: 3px;
  background-color: rgba(186, 226, 183, 0.68);
}

.people-head form .form-group .input-group .form-control button.follows {
  float: right;
}

.people-head a.follow {
  font-weight: 300;
}

.people-head button.follows {
  position: absolute;
  top: 10px;
  right: 30px;
  background-color: #ecdcc5;
  color: #1d1d1b;
  border: 1px solid #dff0d8;
  letter-spacing: 1;
  font-size: 14px;
} 

.people-head button.follows:hover {
  box-shadow: #DDD 1px 1px;
  background-color: white;
}

.people-head .followers .form-control li {
  display: inline-block;
}

.people-head .followers .form-control li a {
  font-weight: 300;
}
`;

module.exports = css;

//