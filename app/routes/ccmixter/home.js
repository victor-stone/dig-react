import React from 'react';
import { Glyph, Link } from '../../components';

function fb_custom_fb_login() {

}

fb_custom_fb_login();

/*eslint "react/no-danger":0 */
var fbLoginButton  = `<fb:login-button scope="public_profile,email" onlogin="fb_check_login_state();"></fb:login-button>`;
var fbLoginButton1 = ` OR ` + fbLoginButton;

const homePage = (
  <div>

<div className="myNav" id="myNav_div">
  <div className="container">
    <div className="navbar-header"> 
      <Link className="navbar-brand" href="#heroImg" />
    </div>
    <div className="collapse navbar-collapse">
      <ul className="nav navbar-nav">
        <li><Link id="music" href="#music_div">{"Music"}</Link></li>
        <li><Link id="howitworks" href="#howitworks_div">{"How it Works"}</Link></li>
      </ul>
      <div className="signUp"><Link href="#universe">{"Sign Up"}</Link></div>
      <div className="signUp2" dangerouslySetInnerHTML={{__html:fbLoginButton1}} /> 
    </div>
  </div>
</div>

<div id="heroImg" >
  <div className="heroText">
    <h1>{"MUSIC CONNECTS US"}</h1>
    <h4>{"Collaborate with 45,000 musicians. Around the world."}</h4>
    <div id="sign">
      <button className="signB" id="sign-in-here-button"><a>{"Get Started"}</a></button>
    </div>
  </div>
</div>

<div className="back">
  <div className="container how" id="howitworks_div" >
    <div className="row">
      <h1>{"HOW IT WORKS"}</h1>
      <div className="underline"></div>
    </div>
    <div className="row">
      <div className="col-md-3"> <img src="/images/icon-guitar.png"/>
      <h2>{"Musicians upload original samples"}</h2>
      </div>
      <div className="col-md-1">
      <h3>{"+"}</h3>
      </div>
      <div className="col-md-4 aligner"> <img src="/images/icon-mic.png"/>
      <h2>{"Singers upload original a cappellas"}</h2>
      </div>
      <div className="col-md-1">
      <h3>{"="}</h3>
      </div>
      <div className="col-md-3 aligner"> <img src="/images/icon-headphones.png"/>
      <h2>{"Producers and DJs create remixes"}</h2>
      </div>
    </div>
  </div>
  <div className="separator"> 
    <img src="/images/separator-gradient.png"/> 
  </div>
  <div className="container video" id="universe">
    <div className="row">
      <div className="col-md-6">
        <h1>{"A UNIVERSE OF POSSIBILITIES"}</h1>
        <div className="underline"></div>
          <p>{"Being part of the ccMixter Music Community opens a universe of possibilities."}
            <br />{"Watch this video, a collaboration by ccMixter artists, and learn how."}
          </p>
      </div>
      <div className="col-md-6">
        <div className="videowrapper">
          <iframe src="//player.vimeo.com/video/108180600" width="500" height="281" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
        </div>
      </div>
    </div>
  </div>
  <div className="container">
    <div className="row sign-in-row" id="sign-in-here">
      <div className="col-md-4"> 
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
      </div>

      <div className="col-md-4 ready-to-upload"> 
        <div className="ready-to-upload">
          <h3>{"Ready to upload?"}</h3>
          <Link className="signB" href="/register" >{"Register..."}</Link>
          <span className="or">{" "}<Glyph icon="ellipsis-h" />{" or "}<Glyph icon="ellipsis-h" />{" "}</span>
          <div className="signF">  
            <a href="#" onClick={fb_custom_fb_login()}><img id="faceLogo" src="/images/facebook-logo.png" />{" "}<img id="faceDiv" src="/images/facebook-div.png" />{" "}<span id="faceText">{"Sign in with Facebook"}</span>{" "}</a>
          </div>
        </div>
      </div>

      <div className="col-md-4 browse-anonymously-col"> 
        <button className="browse-anonymously">{"Check out the music!"}</button>
      </div>

    </div>
  </div>
</div>

<div className="container desc" id="music_div">
  <div className="row">
    <div className="col-md-4 desc2"> <img src="/images/logo-ccmixter.png" />
      <p>{"Musicians post and share samples and a cappellas - all free!"}</p>
      <div className="getStarted"><Link href="/tree">{"Get Started"}</Link></div>
    </div>
    <div className="col-md-4 desc2"> <img src="/images/logo-dig.png" />
      <p>{"Discover free music for games, videos, podcasts, etc."}</p>
      <div className="getStarted"><a href="http://dig.ccmixter.org">{"Get Started"}</a></div>
    </div>
    <div className="col-md-4 desc2"> <img src="/images/logo-tune.png" />
      <p>{"License royalty-free music for commercial projects."}</p>
      <div className="getStarted"><a href="http://tunetrack.net/artistech/pages/licensing/">{"Get Started"}</a></div>
    </div>
  </div>
</div>

  <div className="container footer">
    <div className="row">
    <div className="col-md-4 footer1">
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
    </div>
    <div className="col-md-4 footer1">
      <h1>{"RESOURCES"}</h1>
      <div className="separator2"></div>
      <ul>
      <li><a href="https://github.com/ArtisTechMedia/ccMixterHost/tree/php5.5">{"ccHost on GitHub"}</a></li>
      <li><a href="https://github.com/ArtisTechMedia/dig.ccMixter">{"ccMixter on GitHub"}</a></li>
      <li><a href="/query-api">{"Query API"}</a></li>
      <li><a href="/pool_api_doc">{"Sample Pool API"}</a></li>
      <li><a href="/credits">{"Site Credits"}</a></li>
      </ul>
    </div>
    <div className="col-md-4 footer1">
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
    </div>
    </div>
  </div>
  <div className="container disclaimer">
    <p>{"This text and images on this site are licensed under a Creative Commons Attribution Noncommercial 3.0 United States License. This site is operated by ArtisTech Media."}</p>
  </div>


</div>
);

function index() {
  return homePage;
}

index.title = 'ccMixter Home';

index.path = '/';

index.selfContained = true;

module.exports = index;

