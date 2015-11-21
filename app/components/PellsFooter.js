
import React  from 'react';
import Footer from './Footer';

function DigFooter() {
  return (
    <Footer>
      <h1>{"There"}</h1>
      <ul>
        <li><a href="http://dig.ccmixter.org">{"Music for Video"}</a></li>
        <li><a href="http://stems.ccmixter.org">{"Stems and Samples"}</a></li>
        <li><a href="http://ccmixter.org">{"ccMixter"}</a></li>
        <li><a href="http://tunetrack.net/artistech/">{"ArtIsTech"}</a></li>
        <li><a href="http://tunetrack.net">{"TuneTrack"}</a></li>
        <li><a href="http://creativecommons.org">{"Creative Commons"}</a></li>
      </ul>
    </Footer>
    );
}

module.exports = DigFooter;
