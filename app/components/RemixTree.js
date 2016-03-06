/*eslint "react/no-danger":0 */

import React       from 'react';
import Link        from './Link';
import { Accordian,
         AccordianPanel 
               }   from './Accordian';
import {
          ModelTracker
                }  from '../mixins';

import Glyph       from './Glyph';

import Files   from './stems/Files';
import Ratings from '../stores/ratings';
import Topics  from '../stores/topics';

var SamplesFrom = React.createClass({

  mixins: [ModelTracker],

  stateFromStore(store) {
    return { sources: store.model.sources };
  },

  render() {
    return(
        <div>
          <b>{"Samples are used from..."}</b>
            <ul>
              {this.state.sources.map( s => 
                <li key={s.id}>
                  <Link href={'/tree/' + s.artist.id + '/' + s.id}>{s.name + ' ' + s.artist.name}</Link>
                </li>
              )}
            </ul>
        </div>
    );
  }
});

var SamplesUsedIn = React.createClass({

  mixins: [ModelTracker],

  stateFromStore(store) {
    return { remixes: store.model.remixes };
  },

  render() {
    return(
        <div>
            <b>{"Samples are used in..."}</b>
            <ul>
              {this.state.remixes.map( s => 
                <li key={s.id}>
                  <Link href={'/tree/' + s.artist.id + '/' + s.id}>{s.name + ' ' + s.artist.name}</Link>
                </li>
              )}
            </ul>
        </div>
    );
  }

});

var RecommendedBy = React.createClass({

  getInitialState() {
    return { model: null };
  },

  componentWillMount() {
    this.fetchRecommends();
  },

  componentWillReceiveProps(nextProps) {
    if( this.props.model.id !== nextProps.model.id ) {
      this.fetchRecommends();
    }
  },

  fetchRecommends() {
    if( !this.ratings ) {
      this.ratings = new Ratings();
    }
    this.ratings.recommendedBy(this.props.model.id).then( model => this.setState( { model }) );
  },

  render() {
    if( !this.state.model ) {
      return null;
    }
    var model = this.state.model;
    return (
      <AccordianPanel title="Recommended by" id="recc">
        <ul className="recommends-list">{model.map( (t,i) => <li key={i}>{t.name}</li> )}</ul>
      </AccordianPanel>
      );
  }
});

var Reviews = React.createClass({

  getInitialState() {
    return { model: null };
  },

  componentWillMount() {
    this.fetchReviews();
  },

  componentWillReceiveProps(nextProps) {
    if( this.props.model.id !== nextProps.model.id ) {
      this.fetchReviews();
    }
  },

  fetchReviews() {
    if( !this.topics ) {
      this.topics = new Topics();
    }
   this.topics.reviewsFor(this.props.model.id).then( model => this.setState( { model }) );
  },

  render() {
    if( !this.state.model ) {
      return null;
    }
    var model = this.state.model;
    var reviews = model.map( (r,i) => (
          <div className="form-group" key={i}>
            <div className="col-md-12">
              <div className="input-group">
                <span className="input-group-addon">
                  {r.indent 
                    ? <span><Glyph icon="arrow-circle-right" />{r.author.name}</span>
                    : <span><img src={r.author.avatarURL} />{r.author.name}</span>
                  }
                </span>
                <div className="review-head">{r.date}</div>
                <div dangerouslySetInnerHTML={ {__html: r.html} } />
              </div>
            </div>
          </div>
      ));
    return (
      <AccordianPanel title="Reviews" id="reviews">
        <form className="form-horizontal">
          {reviews}
        </form>      
      </AccordianPanel>
      );
  }
});

var MainFileOverview = React.createClass({

  render() {
    var model = this.props.model;
    return (
      <AccordianPanel title="Overview" id="overview">
          <form className="form-horizontal">
              {model.featuring
                ? (
                    <div className="form-group">
                      <div className="col-md-12">
                        <div className="input-group">
                          <span className="input-group-addon">{"featuring"}</span>
                          <span className="form-control">{model.featuring}</span>
                        </div>
                      </div>
                    </div>
                  )
                : null}
              <div className="form-group">
                <div className="col-md-12">
                  <div className="input-group">
                    <span className="input-group-addon">{"uploaded"}</span>
                    <span className="form-control">{model.date}</span>
                  </div>
                </div>
              </div>
              {model.description
                ? (              
                    <div className="form-group">
                      <div className="col-md-12">
                        <div className="input-group">
                          <span className="input-group-addon">{"info"}</span>
                          <div className="form-control description">{model.description}</div>
                        </div>
                      </div>
                    </div>
                  )
                : null
              }
              <div className="form-group">
                <div className="col-md-12">
                  <div className="input-group">
                    <span className="input-group-addon">{"license"}</span>
                    <span className="form-control">
                      <a target="_blank" href={model.licenseURL}><img src={model.licenseLogoURL} /></a>
                      {model.isCCPlus
                        ? <a target="_blank" href={model.purchaseLogoURL}><img src={model.purchaseLicenseURL} /></a>
                        : null
                      }
                    </span>
                  </div>
                </div>
              </div>
              {model.bpm
                ? (              
                    <div className="form-group">
                      <div className="col-md-12">
                        <div className="input-group">
                          <span className="input-group-addon">{"bpm"}</span>
                          <div className="form-control description">{model.bpm}</div>
                        </div>
                      </div>
                    </div>
                  )
                : null
              }
              {model.nsfw
                ? (              
                    <div className="form-group">
                      <div className="col-md-12">
                        <div className="input-group">
                          <span className="input-group-addon">{"nsfw"}</span>
                          <span className="form-control">{"This music may be NSFW"}</span>
                        </div>
                      </div>
                    </div>
                  )
                : null
              }
              <div className="form-group">
                <div className="col-md-12">
                  <div className="input-group">
                    <span className="input-group-addon">{"tags"}</span>
                    <ul className="tags-list form-control">{model.tags.map( t => <li className="tag" key={t}>{t}</li> )}</ul>
                  </div>
                </div>
              </div>
          </form>
      </AccordianPanel>
      );
  }
});

function FileSection(props) {
  return ( <AccordianPanel title="Files" id="files">
             <Files model={props.model} />
            </AccordianPanel>
        );
}

var MainFile = React.createClass({
  mixins: [ModelTracker],

  stateFromStore(store) {
    return { model: store.model.upload };
  },
/*

artist: Object
bpm: ""
description: "This is the clarinet from the remix"the black&white of it".
↵Hint:
↵Ive  recorded  the clarinet with two microphones,one on the top (AKG C1000) and one below (sennheiser e845) because otherwise you have but a fraction of the consonance,very important!
↵I've uploaded one file in mono and one in stereo.
↵In stereo you can hear the difference of the mic.
↵The left is AKG C1000  and the right is sennheiser e845.
↵Enjoy it!"

downloadSize: "7.14MB"
featuring: ""
fileInfo: Object
files: Array[2]
id: "9081"
isCCPlus: false
isOpen: true
isSpecialLic: false
licenseLogoURL: "https://licensebuttons.net/l/by/3.0/88x31.png"
licenseName: "Attribution (3.0)"
licenseURL: "http://creativecommons.org/licenses/by/3.0/"
licenseYear: "2007"
mediaTags: Object
mediaURL: "http://ccmixter.org/content/stefsax/stefsax_-_Clarinet(the_black_white_on_it).mp3"
name: "Clarinet(the black&white on it)"
purchaseLicenseURL: undefined
purchaseLogoURL: undefined
setFeatureSources: (sources)
tags: TagString
url: "http://ccmixter.org/files/stefsax/9081"
userTags: TagString
wavImageURL*/
  render() {
    var model = this.state.model;
    return(
        <div>
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-md-12">
                <div className="input-group">
                  <span className="input-group-addon">{"by"}</span>
                  <span className="form-control" placeholder="placeholder">
                    <Link className="artist" href={'/people/'+model.artist.id}>{model.artist.name}</Link>
                  </span>
                </div>
              </div>
            </div>
          </form>
          <button className="btn btn-sm btn-warning">
            <Glyph icon="play" />{" PlayIT"}
          </button>
          <Accordian>
            <MainFileOverview model={model} />
            <FileSection model={model} />
            <RecommendedBy model={model} />
            <Reviews model={model} />
          </Accordian>
        </div>
    );
  }
});


var RemixTree = React.createClass({

  render() {
    var store = this.props.store;
    var cssText = `
      <style>
          #accordion .form-control {
            height: initial;
          }
          #accordion .tags-list.form-control li {
            float: left;
            margin-left: 8px;
          }
      </style>
          `;
    var css  = { __html: cssText };
    return( 
      <div className="container-fluid">
        <div dangerouslySetInnerHTML={css} />
        <div className="row">  
          <div className="col-md-4">
            <SamplesFrom store={store} />
          </div>
          <div className="col-md-4">
            <MainFile store={store} />
          </div>
          <div className="col-md-4">
            <SamplesUsedIn store={store} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = RemixTree;

//