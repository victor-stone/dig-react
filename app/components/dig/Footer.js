
import React  from 'react';
import Footer from '../Footer';

function DigFooter() {
  return (
    <Footer>
      <h1>{"There"}</h1>
      <div className="row">
        <div className="col-md-6">
          <a href="http://ccmixter.org"><div className="brand-glyph ccmixter"></div></a>
          <a href="http://tunetrack.net/artistech/"><div className="brand-glyph artistech"></div></a>
        </div>
        <div className="col-md-6">
          <a href="http://tunetrack.net"><div className="brand-glyph tunetrack"></div></a>
          <a href="http://creativecommons.org"><div className="brand-glyph cc"></div></a>
        </div>
      </div>
    </Footer>
    );
}

module.exports = DigFooter;
