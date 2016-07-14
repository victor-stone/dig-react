
import React  from 'react';
import Footer from '../Footer';
import { Row,
         Column }     from '../vanilla/Grid';

function ccMixterFooter() {
  return (
    <Footer>
      <h1>{"There"}</h1>
      <Row>
        <Column cols="6">
          <a href="http://ccmixter.org"><div className="brand-glyph ccmixter"></div></a>
          <a href="http://tunetrack.net/artistech/"><div className="brand-glyph artistech"></div></a>
        </Column>
        <Column cols="6">
          <a href="http://tunetrack.net"><div className="brand-glyph tunetrack"></div></a>
          <a href="http://creativecommons.org"><div className="brand-glyph cc"></div></a>
        </Column>
      </Row>
    </Footer>
    );
}

module.exports = ccMixterFooter;
