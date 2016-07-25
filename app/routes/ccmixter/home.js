import React from 'react';
import { Glyph, 
         InlineCss } from '../../components/vanilla';
import Link          from '../../components/services/link-to-route';
import { Row,
         Container,
         Column }    from '../../components/vanilla/grid';

function fb_custom_fb_login() {

}

fb_custom_fb_login();

var css1 = `
@import url(http://fonts.googleapis.com/css?family=Open+Sans:500,400,300,200);
@import url(http://fonts.googleapis.com/css?family=Lato:400,700,900);
html, body {
  background-color: #fff;
  font-family: "Open Sans", sans-serif;
  -webkit-text-size-adjust: 100%;
  margin: 0;
  padding: 0;
}
html a:hover {
  text-decoration: none;
}
/* HEADER */
.myNav {
  background: rgba(0,0,0,0.6);
  background-image: none;
  color: #fff;
  -moz-border-radius: 0;
  -webkit-border-radius: 0;
  border-radius: 0;
  border-style: none;
  z-index: 500;
  position: fixed;
  height: 70px;
  font-size: 16px;
  font-weight: 400;
  top: 0;
  width: 100%;
}
.myNav a {
  font-family: "Open Sans";
  color: #fffefe;
  font-size: 18px;
  font-weight: 300;
}
.myNav a:hover {
  color: #309200;
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
}
.nav>li>a:focus, .nav>li>a:hover {
  text-decoration: none;
  background-color: rgba(0,0,0, 0.0);
}
.navbar-nav>li>a {
  padding: 25px 25px 25px 40px;
}
.myNav.navbar-brand, .navbar-nav>li>a {
  text-shadow: none;
}
.navbar-brand {
  display: inline-block;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  vertical-align: middle;
  width: 155px;
  height: 45px;
  text-indent: -9999em;
  display: inline-block;
  text-align: center;
  margin: 12px 0 0 0;
}
.myNav .nav .navbar-nav {
  margin-bottom: 0;
}

/* FOOTER */

.footer {
  background-color: #14181f;
  font-family: "Open Sans";
  color: #ababab;
  width: 100%;
  margin-top: -107px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.footer h1 {
  font-size: 14px;
  font-weight: 400;
}
.footer ul li {
  list-style-type: none;
  margin-left: -40px;
}
.separator2 {
  border-top: 1px solid #ababab;
  height: 5px;
}
.disclaimer {
  width: 100%;
  color: #ababab;
  background-color: #0b0e13;
  font-family: "Open Sans";
  height: 60px;
  text-align: center;
  font-size: 14px;
  font-weight: 300;
  padding: 20px;
}

button {
    border: none;
}

#sign-in-here {
  margin-bottom: 25px;
}
#sign-in-here form {
  font-size: 14px;
  padding: 8px;
  border: 1px solid #666;
  border-radius: 7px;
}
#sign-in-here form .form_element {
  margin-bottom: 7px;
}
#form_submit {
  border-radius: 8px;
  margin-left: 40%;
}

#form_submit:hover { 
  background-color: white;
}

.form_element span {
  display: inline-block;
  width: 40%;
  text-align: right;
}

form h3 {
  width: 100%;
  font-size: 16px;
  margin: 0px 0px 12px 0px;
  background-color: #999;
  padding: 5px;
  text-align: center;
  border-radius: 5px;
  color: white;
}
.lost_password {
  margin: 13px;
  display: inline-block;
}

.ready-to-upload {
  text-align: center;
}

.ready-to-upload .signF  {
  white-space: nowrap;
}

.ready-to-upload h3 {
  display: none;
}

.ready-to-upload span.or {
  display: block;
  text-align: center;
  margin: 12px;
  font-size: 20px;
}

.browse-anonymously:active {
  border: 0px;
}

.browse-anonymously {
  width: 250px;
  margin: 50px auto;
  color: white;
  display: block;
  padding: 11px;
  border-radius: 19px;
  box-shadow: 0 2px #003056, inset 0 1px rgba(255,255,255,.75);
  background-image: -webkit-linear-gradient(bottom, #0086d8, #0086d8);
  background-image: -moz-linear-gradient(bottom, #0086d8, #0086d8);
  background-image: -o-linear-gradient(bottom, #0086d8, #0086d8);
  background-image: -ms-linear-gradient(bottom, #0086d8, #0086d8);
  background-image: linear-gradient(to top, #0086d8, #0086d8);
}

.browse-anonymously:hover
{
  background-image: -webkit-linear-gradient(bottom, #0086ff, #0086ff);
  background-image: -moz-linear-gradient(bottom, #0086ff, #0086ff);
  background-image: -o-linear-gradient(bottom, #0086ff, #0086ff);
  background-image: -ms-linear-gradient(bottom, #0086f8, #0086f8);
  background-image: linear-gradient(to top, #0086ff, #0086ff);

}

.signF {
  margin: 0px auto;
  width: 290px;
  height: 55px;
  -webkit-border-radius: 27px 28px 28px 27px/27px 27px 28px 28px;
  -moz-border-radius: 27px 28px 28px 27px/27px 27px 28px 28px;
  border-radius: 27px 28px 28px 27px/27px 27px 28px 28px;
  background-color: #1f1f27;
  -webkit-box-shadow: 0 2px #002c50;
  -moz-box-shadow: 0 2px #002c50;
  box-shadow: 0 2px #002c50;
  border: solid 1px #00549f;
  background-image: -webkit-linear-gradient(bottom, #004176, #0c72b5 74%, #0c72b5);
  background-image: -moz-linear-gradient(bottom, #004176, #0c72b5 74%, #0c72b5);
  background-image: -o-linear-gradient(bottom, #004176, #0c72b5 74%, #0c72b5);
  background-image: -ms-linear-gradient(bottom, #004176, #0c72b5 74%, #0c72b5);
  background-image: linear-gradient(to top, #004176, #0c72b5 74%, #0c72b5);
}
.signF:hover {
  background-image: -webkit-linear-gradient(bottom, #004176, #004176);
  background-image: -moz-linear-gradient(bottom, #004176, #004176 74%, #004176);
  background-image: -o-linear-gradient(bottom, #004176, #004176 74%, #004176);
  background-image: -ms-linear-gradient(bottom, #004176, #004176 74%, #004176);
  background-image: linear-gradient(to top, #004176, #004176);
}

img#faceLogo {
  margin: 3px 4px 12px 22px;
}
span#faceText {
  margin: 12px;
}
.signF span {
  font-size: 20px;
  color: #fffefe;
  text-shadow: 0 2px 2px rgba(0,0,0,.2);
}
`;

var css2 = `.signUp, .signUpBasic {
  background-color: #309200;
  width: 100px;
  height: 35px;
  border-radius: 50px;
  padding: 5px 0 5px 20px;
}

.signUp {
  float: right;
  position: absolute;
  top: 17px;
  right: 170px;
}

.signUp:hover, .signUpBasic:hover {
  background-color: rgba(0,0,0,.0);
  border-radius: 50px;
  padding: 5px 0 5px 20px;
  border: 2px solid #309200;
}

.signUp:hover {
  float: right;
  position: absolute;
  top: 17px;
  right: 170px;
  width: 100px;
  height: 35px;
}
.signUp a {
  font-family: "Open Sans";
  color: #fffefe;
  text-shadow: 0 2px 2px rgba(0,0,0,.2);
  font-size: 16px;
  font-weight: 400;
}
.signUp>a:hover {
  font-family: "Open Sans";
  color: #309200;
  text-shadow: 0 2px 2px rgba(0,0,0,.2);
  font-size: 16px;
  font-weight: 400;
}
.signUp2 {
  float: right;
  position: absolute;
  top: 17px;
  right: 55px;
  width: 130px;
  height: 35px;
  border-radius: 50px;
  padding: 5px 0 5px 22px;
}
/* HERO */

#heroImg {
  background-image: url(/images/hero_img.jpg);
  width: 100%;
  height: 800px;
  -webkit-background-size: cover;
  background-size: cover;
  margin-top: 50px;
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  -moz-box-shadow: 0 0 5px #8E8E8E;
  -webkit-box-shadow: 0 0 5px #8E8E8E;
  box-shadow: 0 0 5px #8E8E8E;
  position: relative;
  top: -50px;
  padding-left: 60px;
}
.heroText {
  -webkit-transform: translatey(-14%);
  transform: translatey(-14%);
}

.heroText h1 {
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: #fffefe;
  -webkit-transform: translatey(100%);
  transform: translatey(100%);
  left: 60px;
  font-size: 76px;
  letter-spacing: 3px;
  line-height: 1.3;
  width: 400px;
  line-height: 103%;
}

@media screen and (max-width: 640px){
    .heroText h1 {
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        color: #fffefe;
        -webkit-transform: translatey(170%);
        transform: translatey(170%);
        left: 10px;
        font-size: 42px;
        letter-spacing: 3px;
        line-height: 1.3;
        width: 400px;
        line-height: 103%;
        max-width:300px;
    }
}

.heroText h4 {
  font-size: 36px;
  color: #fffefe;
  width: 570px;
  font-weight: 300;
  margin-top: 270px;
}

@media screen and (max-width: 640px){
    .heroText h4 {
        font-size: 24px;
        color: #fffefe;
        width: 550px;
        font-weight: 300;
        margin-top: 270px;
        max-width:300px;
    }
}

.signB {
  width: 270px;
  height: 55px;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  -webkit-box-shadow: 0 2px #184701, inset 0 1px rgba(255,255,255,.75);
  -moz-box-shadow: 0 2px #184701, inset 0 1px rgba(255,255,255,.75);
  box-shadow: 0 2px #184701, inset 0 1px rgba(255,255,255,.75);
  background-image: -webkit-linear-gradient(bottom, #309200, #6dca00 74%, #b4ce02);
  background-image: -moz-linear-gradient(bottom, #309200, #6dca00 74%, #b4ce02);
  background-image: -o-linear-gradient(bottom, #309200, #6dca00 74%, #b4ce02);
  background-image: -ms-linear-gradient(bottom, #309200, #6dca00 74%, #b4ce02);
  background-image: linear-gradient(to top, #309200, #6dca00 74%, #b4ce02);
  padding: 8px 60px 9px 60px;
  border: none;
}
.signB:hover {
  width: 270px;
  height: 55px;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  -webkit-box-shadow: 0 2px #184701, inset 0 1px rgba(255,255,255,.75);
  -moz-box-shadow: 0 2px #184701, inset 0 1px rgba(255,255,255,.75);
  box-shadow: 0 2px #184701, inset 0 1px rgba(255,255,255,.75);
  background-image: -webkit-linear-gradient(bottom, #309200, #309200);
  background-image: -moz-linear-gradient(bottom, #309200, #309200 74%, #309200);
  background-image: -o-linear-gradient(bottom, #309200, #309200 74%, #309200);
  background-image: -ms-linear-gradient(bottom, #309200, #309200 74%, #309200);
  background-image: linear-gradient(to top, #309200, #309200);
  padding: 8px 60px 9px 60px;
  border: none;
}
.signB a, .signB2 a {
  font-family: "Open Sans";
  font-size: 26px;
  color: #fffefe;
  text-shadow: 0 2px 2px rgba(0,0,0,.2);
  font-weight: 300;
  text-decoration: none;
  border: none;
}
#sign {
  width: 270px;
  text-align: center;
}
#heroImg #orSection {
  margin: 17px 0 17px 0;
}
#heroImg #or {
  font-size: 26px;
  color: #fffefe;
  margin: 0 5px 0 5px;
}
#heroImg img {
  vertical-align: super;
}

@media screen and (max-width: 640px) {
    #heroImg {
        padding-left:20px;
    }
}

/* HOW IT WORKS */

.video>.row>.col-md-6 {
  margin-bottom: 60px;
}
.back {
  width: 100%;
  min-height: 1100px;
  height: auto;
  background-image: linear-gradient(to bottom, #ffffff 40%, #e5e5e5);
  margin-top: -50px;
  padding-top: 50px;
}
.how {
  text-align: center;
}
.how h3 {
  font-size: 100px;
  color: #309200;
  font-weight: 400;
  margin-top: 60px;
}
.how h1, .video h1 {
  font-family: "Open Sans";
  font-size: 42px;
  text-align: center;
  font-weight: 300;
  color: #555555;
  margin-top: 0;
  margin-bottom: 20px;
}
.how .aligner {
  margin-top: 42px;
}
.underline {
  height: 1px;
  border-bottom: 1px solid #309200;
  width: 144px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
}
.how h2 {
  font-size: 30px;
  color: #555555;
  font-weight: 300;
  width: 270px;
  text-align: center;
  display: inline-block;
}

.separator {
    margin-top: 100px;
}

@media screen and (max-width: 640px){
    .separator img{
        display: none;
    }
}

.video {
  margin-top: -80px;
  text-align: center;
}
.video p {
  font-size: 24px;
  font-weight: 300;
  color: #555555;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: -30px;
  width: 450px; /* uhhhh... */
    max-width: 300px; 
}

.videowrapper {
    float: none;
    clear: both;
    width: 100%;
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 25px;
    height: 0;
}
.videowrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.signB2 {
  width: 270px;
  height: 55px;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px #184701, inset 0 1px rgba(255,255,255,.75);
  -moz-box-shadow: 0 2px #184701, inset 0 1px rgba(255,255,255,.75);
  box-shadow: 0 2px #184701, inset 0 1px rgba(255,255,255,.75);
  background-image: -webkit-linear-gradient(bottom, #309200, #6dca00 74%, #b4ce02);
  background-image: -moz-linear-gradient(bottom, #309200, #6dca00 74%, #b4ce02);
  background-image: -o-linear-gradient(bottom, #309200, #6dca00 74%, #b4ce02);
  background-image: -ms-linear-gradient(bottom, #309200, #6dca00 74%, #b4ce02);
  background-image: linear-gradient(to top, #309200, #6dca00 74%, #b4ce02);
  margin-top: 20px;
  padding: 8px 60px 9px 60px;
  margin-left: auto;
  margin-right: auto;
  border: none;
}
.signB2:hover {
  width: 270px;
  height: 55px;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  -webkit-box-shadow: 0 2px #184701, inset 0 1px rgba(255,255,255,.75);
  -moz-box-shadow: 0 2px #184701, inset 0 1px rgba(255,255,255,.75);
  box-shadow: 0 2px #184701, inset 0 1px rgba(255,255,255,.75);
  background-image: -webkit-linear-gradient(bottom, #309200, #309200);
  background-image: -moz-linear-gradient(bottom, #309200, #309200 74%, #309200);
  background-image: -o-linear-gradient(bottom, #309200, #309200 74%, #309200);
  background-image: -ms-linear-gradient(bottom, #309200, #309200 74%, #309200);
  background-image: linear-gradient(to top, #309200, #309200);
  margin-top: 20px;
  padding: 8px 60px 9px 60px;
  margin-left: auto;
  margin-right: auto;
  border: none;
}
/* MUSIC */
@media screen and (min-width: 992px){
    .desc {
        background-image: url(/images/mixer-image.jpg);
        width: 100%;
        height: 390px;
        background-repeat: no-repeat;
        text-align: center;
        color: #ffffff;
        /* background-size: contain; */
        background-size: cover;
        min-height: 490px;
        color: #ffffff;
        padding-bottom:150px;
    }
}
@media screen and (max-width: 992px){
    .desc {
           background-image: none;
           background-color:#3C3F44;
           width: 100%;
           min-height: 390px;
           height:100%;
           text-align: center;
           color: #ffffff;
           padding-bottom:150px;
    }
}
    
.desc img {
  height: 40px;
}
.desc p {
  font-weight: 300;
  font-size: 22px;
  width: 280px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
  line-height: 140%;
  height: 100px;
}
.desc2 {
  margin-top: 80px;
}

.container.sign-in {
  min-height: 300px;
}

.getStarted {
  width: 125px;
  height: 40px;
  -webkit-border-radius: 23px 24px 24px 23px/23px 23px 24px 24px;
  -moz-border-radius: 23px 24px 24px 23px/23px 23px 24px 24px;
  border-radius: 23px 24px 24px 23px/23px 23px 24px 24px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px #003056, inset 0 1px rgba(255,255,255,.75);
  -moz-box-shadow: 0 2px #003056, inset 0 1px rgba(255,255,255,.75);
  box-shadow: 0 2px #003056, inset 0 1px rgba(255,255,255,.75);
  background-image: -webkit-linear-gradient(bottom, #0086d8, #30bfff);
  background-image: -moz-linear-gradient(bottom, #0086d8, #30bfff);
  background-image: -o-linear-gradient(bottom, #0086d8, #30bfff);
  background-image: -ms-linear-gradient(bottom, #0086d8, #30bfff);
  background-image: linear-gradient(to top, #0086d8, #30bfff);
  padding: 9px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}
.getStarted:hover {
  width: 125px;
  height: 40px;
  -webkit-border-radius: 23px 24px 24px 23px/23px 23px 24px 24px;
  -moz-border-radius: 23px 24px 24px 23px/23px 23px 24px 24px;
  border-radius: 23px 24px 24px 23px/23px 23px 24px 24px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px #003056, inset 0 1px rgba(255,255,255,.75);
  -moz-box-shadow: 0 2px #003056, inset 0 1px rgba(255,255,255,.75);
  box-shadow: 0 2px #003056, inset 0 1px rgba(255,255,255,.75);
  background-image: -webkit-linear-gradient(bottom, #0086d8, #0086d8);
  background-image: -moz-linear-gradient(bottom, #0086d8, #0086d8);
  background-image: -o-linear-gradient(bottom, #0086d8, #0086d8);
  background-image: -ms-linear-gradient(bottom, #0086d8, #0086d8);
  background-image: linear-gradient(to top, #0086d8, #0086d8);
  padding: 9px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}
.getStarted a {
  font-family: "Open Sans";
  font-size: 16px;
  color: #fff;
  text-shadow: 0 2px 2px rgba(0,0,0,.2);
}
`;

/*eslint "react/no-danger":0 */
var fbLoginButton  = `<fb:login-button scope="public_profile,email" 
                                       onlogin="fb_check_login_state();"></fb:login-button>`;
var fbLoginButton1 = ' OR ' + fbLoginButton;

const homePage = (
  <div>
<InlineCss css={css1} id="adornment-css" />
<InlineCss css={css2} id="content-css" />

<div className="myNav" id="myNav_div">
  <Container>
    <div className="navbar-header"> 
      <Link className="navbar-brand" href="#heroImg">
        <img src="/images/logo.png" />
      </Link>
    </div>
    <div className="collapse navbar-collapse">
      <ul className="nav navbar-nav">
        <li><Link id="music" href="#music_div">{"Music"}</Link></li>
        <li><Link id="howitworks" href="#howitworks_div">{"How it Works"}</Link></li>
      </ul>
      <div className="signUp"><Link href="#universe">{"Sign Up"}</Link></div>
      <div className="signUp2" dangerouslySetInnerHTML={{__html:fbLoginButton1}} /> 
    </div>
  </Container>
</div>

<div id="heroImg" >
  <div className="heroText">
    <h1>{"MUSIC CONNECTS US"}</h1>
    <h4>{"Collaborate with 45,000 musicians. Around the world."}</h4>
    <div id="sign">
      <button className="signB" id="sign-in-here-button"><Link href="#sign-in-here">{"Get Started"}</Link></button>
    </div>
  </div>
</div>

<div className="back">
  <Container className="how" id="howitworks_div" >
    <Row>
      <h1>{"HOW IT WORKS"}</h1>
      <div className="underline"></div>
    </Row>
    <Row>
      <Column cols="3"> <img src="/images/icon-guitar.png"/> <h2>{"Musicians upload original samples"}</h2></Column>
      <Column cols="1"><h3>{"+"}</h3></Column>
      <Column cols="4" className="aligner"> <img src="/images/icon-mic.png"/> <h2>{"Singers upload original a cappellas"}</h2></Column>
      <Column cols="1"> <h3>{"="}</h3> </Column>
      <Column cols="3" className="aligner"> <img src="/images/icon-headphones.png"/> <h2>{"Producers and DJs create remixes"}</h2> </Column>
    </Row>
  </Container>
  <div className="separator"> <img src="/images/separator-gradient.png"/> </div>
  <Container className="video" id="universe">
    <Row>
      <Column cols="6">
        <h1>{"A UNIVERSE OF POSSIBILITIES"}</h1>
        <div className="underline"></div>
          <p>{"Being part of the ccMixter Music Community opens a universe of possibilities."}
            <br />{"Watch this video, a collaboration by ccMixter artists, and learn how."}
          </p>
      </Column>
      <Column cols="6">
        <div className="videowrapper">
          <iframe src="//player.vimeo.com/video/108180600" width="500" height="281" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
        </div>
      </Column>
    </Row>
  </Container>
  <Container>
    <Row className="sign-in-row" id="sign-in-here">
      <Column cols="4">
        <form action="/login" method="post" className="cc_form" name="userloginform" id="userloginform">
        <h3>{"Sign in with your ccMixter account"}</h3>

          <div className="form_element">
            <span>{"Login Name"}</span> <input type="text" id="user_name" name="user_name" className="form_input" />
          </div>
          <div className="form_element">
            <span>{"Password"}</span> <input type="password" id="user_password" name="user_password" />
          </div>
          <div className="form_element">
            <span><label htmlFor="user_remember">{"Remember Me"}</label></span> <input type="checkbox" id="user_remember" name="user_remember" />
          </div>
          <input type="submit" name="form_submit" id="form_submit" className="cc_form_submit" value="Log In" />
          <input type="hidden" name="userlogin" id="userlogin" value="classname" />
        </form>
        <a className="lost_password" href="http://ccm:80/lostpassword"><span>{"Lost Password?"}</span></a>
      </Column>

      <Column cols="4" className="ready-to-upload"> 
        <div className="ready-to-upload">
          <h3>{"Ready to upload?"}</h3>
          <Link className="signB" href="/register" >{"Register..."}</Link>
          <span className="or">{" "}<Glyph icon="ellipsis-h" />{" or "}<Glyph icon="ellipsis-h" />{" "}</span>
          <div className="signF">  
            <a href="#" onClick={fb_custom_fb_login()}><img id="faceLogo" src="/images/facebook-logo.png" />{" "}<img id="faceDiv" src="/images/facebook-div.png" />{" "}<span id="faceText">{"Sign in with Facebook"}</span>{" "}</a>
          </div>
        </div>
      </Column>

      <Column cols="4" className="browse-anonymously-col"> 
        <button className="browse-anonymously">{"Check out the music!"}</button>
      </Column>

    </Row>
  </Container>
</div>

<Container className="desc" id="music_div">
  <Row>
    <Column cols="4" className="desc2"> 
      <img src="/images/logo-ccmixter.png" />
      <p>{"Musicians post and share samples and a cappellas - all free!"}</p>
      <div className="getStarted"><Link href="/tree">{"Get Started"}</Link></div>
    </Column>
    <Column cols="4" className="desc2"> 
      <img src="/images/logo-dig.png" />
      <p>{"Discover free music for games, videos, podcasts, etc."}</p>
      <div className="getStarted"><a href="http://dig.ccmixter.org">{"Get Started"}</a></div>
    </Column>
    <Column cols="4" className="desc2"> 
      <img src="/images/logo-tune.png" />
      <p>{"License royalty-free music for commercial projects."}</p>
      <div className="getStarted"><a href="http://tunetrack.net/artistech/pages/licensing/">{"Get Started"}</a></div>
    </Column>
  </Row>
</Container>

  <Container className="footer">
    <Row>
    <Column cols="4" className="footer1">
      <h1>{"ABOUT"}</h1>
      <div className="separator2"></div>
      <ul>
        <li><a href="/about">{"Who is ccMixter?"}</a></li>
        <li><a href="/about">{"Is it Legal? (FAQ)"}</a></li>
        <li><a href="https://www.youtube.com/playlist?list=PLql6A7vhyQummK2o2exONi4w4RhK0SnK4">{"Video Tutorials"}</a></li>
        <li><a href="/privacy">{"Privacy"}</a></li>
        <li><a href="/terms">{"Terms of Use"}</a></li>
        <li><a href="/media/people/contact/admin">{"Contact"}</a></li>
      </ul>
    </Column>
    <Column cols="4" className="footer1">
      <h1>{"RESOURCES"}</h1>
      <div className="separator2"></div>
      <ul>
        <li><a href="https://github.com/ArtisTechMedia/ccMixterHost/tree/php5.5">{"ccHost on GitHub"}</a></li>
        <li><a href="https://github.com/ArtisTechMedia/dig.ccMixter">{"ccMixter on GitHub"}</a></li>
        <li><a href="/query-api">{"Query API"}</a></li>
        <li><a href="/pool_api_doc">{"Sample Pool API"}</a></li>
        <li><a href="/credits">{"Site Credits"}</a></li>
      </ul>
    </Column>
    <Column cols="4" className="footer1">
      <h1>{"SOCIAL"}</h1>
      <div className="separator2"></div>
      <ul>
        <li><a href="https://twitter.com/ccmixtermusic">{"Twitter"}</a></li>
        <li><a href="https://www.youtube.com/channel/UCU7QBXVX4gcePOcEyha7yng">{"YouTube"}</a></li>
        <li><a href="https://vimeo.com/ccmixter">{"Vimeo"}</a></li>
        <li><a href="https://www.facebook.com/CCMixter">{"Facebook"}</a></li>
        <li><a href="https://www.pinterest.com/ccmixtermusic/">{"Pinterest"}</a></li>
        <li><a href="http://instagram.com/ccmixter">{"Instagram"}</a></li>
        <li><a href="http://ccmixterblog.blogspot.com/">{"Blogspot"}</a></li>
        <li><a href="http://tunetrack.net">{"TuneTrack"}</a></li>
      </ul>
    </Column>
    </Row>
  </Container>
  <div className="container disclaimer">
    <p>{"This text and images on this site are licensed under a Creative Commons Attribution Noncommercial 3.0 United States License. This site is operated by ArtisTech Media."}</p>
  </div>


</div>
);

function index() {
  return homePage;
}

Object.assign(index,{
  title: 'ccMixter Home',
  path: '/',
  selfContained: true
});

module.exports = index;

