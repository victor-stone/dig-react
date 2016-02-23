import React from 'react';

import { Glyph, 
         LoadingGlyph } from '../components';

import SamplesListing from '../components/stems/Listing';
import Samples        from '../stores/samples';

var SamplesSection = React.createClass({

    getInitialState() {
        return { 
            loading: true,
            items: null };
    },

    componentWillMount() {
        Samples.storeFromQuery( { tags: 'dubcatcher2,' + this.props.typeTag, type: 'all', u: 'djvadim' } ).then( store => {
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

var DigTheDubCatcher = React.createClass({


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


div.vadim-background > div.para > span,
div.vadim-background > div.para > b {
    color: white
}

.vadim-background .para {
    background-color: rgba(0, 0, 0, .5);
    padding: 8px;
    border-radius: 5px;
    box-shadow: #333 2px 2px;
    margin-bottom: 10px;
}

.vadim-background .para a.ext {
    color: yellow;
}

.vadim-background div.embedded-samples {
  background-color: rgba(246, 249, 237, 1);
}

div.para > div > h3 {
  margin: 0px;
  margin-bottom: 12px;
  text-align: center;
  background-color: #634A37;
  color: white;
  padding: 4px;
  border-radius: 5px;
}
</style>`;

        var css      = { __html: cssText };
        /*eslint "react/no-danger":0 */
        return (
<div className="container-fluid">
    <div dangerouslySetInnerHTML={css} />
    <div className="row">
    <div className="col-md-9 col-md-offset-2">
    <h3>{"Call for Remixes: DJ Vadim - DubCatcher 2"}</h3>
    <h1>{"Dig the Soundtrack"}</h1>
      <div className="vadim-background">
        <div className="para">{"In celebration of the popularilty of our music discovery site "}
        <a href="http://dig.ccmixter.org"><img src="http://dig.ccmixter.org/images/logo.png" /></a> 
        {" "}{` and the release of the `}<a className="ext" href="https://soundcloud.com/dj-vadim/sets/dubcatcher2">DubCatcher 2</a>
        {` ccMixter and DJ Vadim have joined forces again to create a call for remixes. `}<a className="ext" href="#download">{`Download`}</a>
        {` the stems and pells from below and then `}
        <a className="ext" href="http://ccmixter.org/submit">{"submit your remixes to ccMixter"}</a>{` and watch as our
            sharing eco-system places your music into videos across the web. (Keep in mind that video 
            makers prefer instrumentals!)
        `}</div>
        <div className="para">{`Vadim is going to be listening to the remixes posted here at ccMixter and will incorporate his
            favorite ones into a project in the future (stay tuned `}<a className="ext" href="https://twitter.com/DJVadim"><Glyph icon="twitter" />{" DJVadim"}</a>.)</div>        
        <div className="para"><b>{"KaChing! "}</b>{`If you would like to ride the wave of advertising revenue when your music is used
            in a monetized video then consider signing up for `}<a className="ext"  href="http://tunetrack.net/ccmixter/pages/ccplus/">{"ArtisTech Media's ccPlus program"}</a>
            {`! For ccPlus signed artists: Please note
        that DJ Vadim DubCatcher 2 instrumental stems are marked as available for ccPlus remixes (!!) but the a cappellas are not.`}</div>
        <a name="download"></a>
        <div className="para embedded-samples stems-browser"><SamplesSection typeTag="sample" title="Stems"/></div>
        <div className="para embedded-samples stems-browser"><SamplesSection typeTag="acappella" title="Pells"/></div>
      </div>
    </div>

    </div>
</div>
            );
    }
});

DigTheDubCatcher.title = 'Call for Remixes: Dig the DubCatcher';
DigTheDubCatcher.path = 'dig-the-dubcatcher';

module.exports = DigTheDubCatcher;

