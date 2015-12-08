import React from 'react';
import { Link, Glyph } from '../../components';


const homePage = (
  <div>
<div className="dig-img container">
  <div className="row">
    <div className="col-md-8 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-12">
      <h1>{"You Already "}<br className="hidden-xs" />{"Have Permission"}</h1>
      <h3>{"The music discovery site used in"}<br className="hidden-xs" />{" over 1 million videos and games"}</h3>
    </div>
  </div>
</div>
 <a name="howitworks"></a>
<h2 className="center-text">{"How it Works"}</h2>
<div className="container-fluid">
  <div className="row how panel-group">
    <div className="col-md-4">
      <div className="panel">
        <div className="panel-body">
          <div className="home-glyph musicians-glyph"></div>
        </div>
        <div className="panel-footer center-text">
          {"Musicians upload to "}
          <img src="images/ccmixter.png" />
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="panel">
        <div className="panel-body">
          <div className="home-glyph findMusic-glyph">
            <div className="urHere">
              {"You"}<br />{"are"}<br />{"here!"}</div>
          </div>
        </div>
        <div className="panel-footer center-text">
          {"You find music at "}
          <img src="images/logo-black.png" />
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="panel">
        <div className="panel-body">
          <div className="home-glyph project-glyph"></div>
        </div>
        <div className="panel-footer center-text">
          {"You put it into your project"}
          <div className="project-icons">
            <Glyph icon="youtube" />
            <Glyph icon="steam" />
            <Glyph icon="vimeo" />
            <Glyph icon="soundcloud" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="row gso-links panel-group">
    <div className="col-md-4">
      <div className="panel">
        <div className="panel-heading">
          <h1 className="panel-title">{"Instrumental Music for Film & Video"}</h1>
        </div>
        <div className="panel-body">
          {"Find that perfect soundtrack or theme music for your film or video project."}
        </div>
        <div className="panel-footer center-text">
          <Link href="/film" className="btn btn-default">{"Dig!"}</Link>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="panel">
        <div className="panel-heading">
          <h1 className="panel-title">{"Free Music for Commerical Projects"}</h1>
        </div>
        <div className="panel-body">
          {"Thousands of hours of free music - all you have to do is give credit to the musicians."}
        </div>
        <div className="panel-footer center-text">
          <Link href="/free" className="btn btn-default">{"Dig!"}</Link>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="panel">
        <div className="panel-heading">
          <h1 className="panel-title">{"Music for Video Games"}</h1>
        </div>
        <div className="panel-body">
          {"Eclectic, eccentric, experimental genres for themes and looping backgrounds"}
        </div>
        <div className="panel-footer center-text">
          <Link href="/games" className="btn btn-default">{"Dig!"}</Link>
        </div>
      </div>
    </div>
  </div>
</div>  
</div>
);

function index() {
  return homePage;
}

index.title = 'dig.ccMixter Home';

index.path = '/';

module.exports = index;

