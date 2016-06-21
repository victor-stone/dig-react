
import React from 'react';
import Link from './services/LinkToRoute';


function Footer(props) {
    return (
      <div className="container-fluid footer footer-pad">
        <div className="row">
          <div className="col-md-3">
            <h1>{"Here"}</h1>
            <ul>
              <li><Link href="/licenses">{"Licenses"}</Link></li>
              <li><a href="http://ccmixter.org/privacy">{"Privacy"}</a></li>
              <li><a href="http://ccmixter.org/terms">{"Terms"}</a></li>
              <li><a href="/keep-ccmixter-open-and-free"><i className="fa fa-heart"></i>{" Donate(!)"}</a></li>
              <li><Link href="/credits#credits">{"Credits"}</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            {props.children}
          </div>
          <div className="col-md-3">
            <h1>{"Everywhere"}</h1>
            <ul>
              <li><a href="https://twitter.com/ccmixtermusic"><i className="fa fa-twitter"></i>{" Twitter"}</a></li>
              <li><a href="https://www.youtube.com/channel/UCU7QBXVX4gcePOcEyha7yng"><i className="fa fa-youtube"></i>{" YouTube"}</a></li>
              <li><a href="https://vimeo.com/ccmixter"><i className="fa fa-vimeo"></i>{" Vimeo"}</a></li>
              <li><a href="https://www.facebook.com/CCMixter"><i className="fa fa-facebook"></i>{" Facebook"}</a></li>
              <li><a href="http://instagram.com/ccmixter"><i className="fa fa-instagram"></i>{" Instagram"}</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h1>{"Resources"}</h1>
            <ul>
              <li><a href="https://github.com/victor-stone/dig-react"><i className="fa fa-github"></i>{" GitHub"}</a></li>
              <li><a href="http://ccmixter.org/query-api">{"Query API"}</a></li>
              <li><a href="https://ccmixter.org/forum">{"Forums"}</a></li>
              <li><a href="http://ccmixter.org/media/people/contact/admin">{"Contact"}</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
}

module.exports = Footer;
