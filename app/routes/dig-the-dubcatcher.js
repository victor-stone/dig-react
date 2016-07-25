import React from 'react';

import { Glyph, 
         Link,
         LoadingGlyph } from '../components';

import SamplesListing from '../components/stems/listing';
import Samples        from '../stores/samples';
import PageHeader     from '../components/page-header';

import { Row,
         FluidContainer,
         Column }     from '../components/vanilla/grid';

var SamplesSection = React.createClass({

  getInitialState() {
    return { 
      loading: true,
      items: null };
  },

  componentWillMount() {
    var opts = { tags: 'dubcatcher2,' + this.props.typeTag, type: 'all', user: 'djvadim' };
    Samples.storeFromQuery( opts ).then( store => {
      this.setState( {
        loading: false,
        store
      });
    });
  },

  render() {
    return (<div><h3>{this.props.title}</h3>
      {this.state.loading
        ? <LoadingGlyph />
        : <SamplesListing store={this.state.store} /> 
      }</div>
    );
  }
});

var DownloadSection = React.createClass({
  render() {
    return (
      <ul className="stems-browser">
        <li><SamplesSection typeTag="sample"    title="Stems"/></li>
        <li><SamplesSection typeTag="acappella" title="Pells"/></li>
      </ul>
      );
  }
});

var ContentSection = React.createClass({

  render() {
    return (
      <ul className="vadim-content">
        <li>
          {"In celebration of the popularilty of our music discovery site "}
          <a href="http://dig.ccmixter.org"><img src="http://dig.ccmixter.org/images/logo.png" /></a> 
          {" "}{` and the release of the 
            `}
          <a className="ext" href="https://soundcloud.com/dj-vadim/sets/dubcatcher2">{"DubCatcher 2"}</a>
          {` ccMixter and DJ Vadim have joined forces again to create a call for remixes. 
            `}
          <Link className="ext" href="#download">{"Download"}</Link>
          {` the stems and pells from below and then 
            `}
          <a className="ext" href="http://ccmixter.org/submit">{"submit your remixes to ccMixter"}</a>
          {` and watch as our sharing eco-system places your music into videos across the web. 
            `}
        </li>
        <li>
          {`Vadim is going to be listening to the remixes posted here at ccMixter and will incorporate his
            favorite ones into a project in the future (stay tuned `}
          <a className="ext" href="https://twitter.com/DJVadim"><Glyph icon="twitter" />{" DJVadim"}</a>
          {".)"}
        </li>    
        <li>
          <b>{"KaChing! "}</b>
          {`If you would like to ride the wave of advertising revenue when your music is used
            in a monetized video then consider signing up for `}
          <a className="ext"  href="http://tunetrack.net/ccmixter/pages/ccplus/">{"ArtisTech Media's ccPlus program"}</a>
          {`! For ccPlus signed artists: Please note that DJ Vadim DubCatcher 2 instrumental stems are 
            marked as available for ccPlus remixes (!!) but the a cappellas are not.`}
        </li>
      </ul>
    );
  }
});

var StyleSection = React.createClass({

  render() {
    var cssText = `<style>
.vadim-background {
  background-image: url('/images/vadim-side.png');
  padding-left: 320px;
  padding-right: 22px;
  padding-top: 25px;
  background-repeat: no-repeat;
  background-color: #C5926D;
  min-height: 300px;
  font-size: large;
  border-radius: 8px;
  padding-bottom: 12px;
  margin-bottom: 10px;
}

.vadim-background ul.stems-browser > li,
.vadim-background ul.vadim-content > li {
  padding: 8px;
  border-radius: 5px;
  box-shadow: #333 2px 2px;
  margin-bottom: 10px;
}

.vadim-background ul.vadim-content > li {
  background-color: rgba(0, 0, 0, .5);
  color: white;
}

.vadim-background .vadim-content > li a.ext {
  color: yellow;
}

.vadim-background ul.stems-browser > li {
  background-color: rgba(246, 249, 237, 1);
}

.vadim-background ul.stems-browser > li h3 {
  margin: 0px;
  margin-bottom: 12px;
  text-align: center;
  background-color: #634A37;
  color: white;
  padding: 4px;
  border-radius: 5px;
}
</style>`;

    var css  = { __html: cssText };
    /*eslint "react/no-danger":0 */
    return (
        <div dangerouslySetInnerHTML={css} />
      );
  }
});

var DigTheDubCatcher = React.createClass({


  render() {

    return (
      <FluidContainer>
        <StyleSection />
        <PageHeader subTitle="Dig the Soundtrack" title="Call for Remixes: DJ Vadim - DubCatcher 2" icon="star" />
        <Row>
          <Column cols="9" offset="2">
            <div className="vadim-background">
              <ContentSection />
              <a name="download"></a>
              <DownloadSection />
            </div>
          </Column>
        </Row>
      </FluidContainer>
    );
  }
});

DigTheDubCatcher.title = 'Call for Remixes: Dig the DubCatcher';
DigTheDubCatcher.path  = 'dig-the-dubcatcher';

module.exports = DigTheDubCatcher;

