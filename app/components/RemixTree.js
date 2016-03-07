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

const MAX_LINKS_SHOW = 10;

var TreeLinks = React.createClass({

  getInitialState() {
    return this.splitFiles(this.props.files);
  },

  componentWillReceiveProps(props) {
    this.setState( this.splitFiles(props.files) );
  },

  splitFiles(files) {
    if( files.length > MAX_LINKS_SHOW ) {
      return { head: files.slice(0,MAX_LINKS_SHOW), tail: files.slice(MAX_LINKS_SHOW) };
    }
    return { head: files, tail: null };
  },

  render() {
    var fileMapper = function( s ) {
        return (
        <li key={s.id}>
          <Link href={'/tree/' + s.artist.id + '/' + s.id}>{s.name + ' ' + s.artist.name}</Link>
        </li>      
      );
    };

    return (
        <div className="panel panel-info" id={this.props.id}>
          <div className="panel-heading">
            <h3 className="panel-title">{this.props.title}</h3>
          </div>
          <div className="panel-body">
            <ul>
              {this.state.head.map( fileMapper )}
            </ul>
            {this.state.tail
              ? ( <div>
                    <button data-toggle="collapse" data-parent={'#' + this.props.id} href={'#tail_' + this.props.id}>{"Show all"}</button>
                    <ul className="collapse" id={'tail_' + this.props.id}>
                      {this.state.tail.map( fileMapper )}
                    </ul>
                  </div>
                )
              : null
            }
          </div>
          <div className="panel-footer"></div>
        </div>

      );
  }
});

var SamplesFrom = React.createClass({

  mixins: [ModelTracker],

  stateFromStore(store) {
    return { sources: store.model.sources };
  },

  render() {
    return(
      <TreeLinks title="Samples are used from..." id="sources" files={this.state.sources} />
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
      <TreeLinks title="Samples are used in..." id="remixes" files={this.state.remixes} />
    );
  }
});

var RecommendedBy = React.createClass({

  getInitialState() {
    return { model: null };
  },

  componentWillMount() {
    this.fetchRecommends(this.props.model.id);
  },

  componentWillReceiveProps(nextProps) {
    this.fetchRecommends(nextProps.model.id);
  },

  fetchRecommends(id) {
    if( !this.ratings ) {
      this.ratings = new Ratings();
    }
    this.ratings.recommendedBy(id).then( model => this.setState( { model }) );
  },

  render() {
    if( !this.state.model ) {
      return null;
    }
    var model = this.state.model;
    var title = `Recommends (${this.props.numRecommends})`;
    return (
      <AccordianPanel title={title} icon="thumbs-o-up" id="recc">
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
    this.fetchReviews(this.props.model.id);
  },

  componentWillReceiveProps(nextProps) {
    this.fetchReviews(nextProps.model.id);
  },

  fetchReviews(id) {
    if( !this.topics ) {
      this.topics = new Topics();
    }
   this.topics.reviewsFor(id).then( model => this.setState( { model }) );
  },

  render() {
    if( !this.state.model ) {
      return null;
    }
    var model = this.state.model;
    var reviews = model.map( (r,i) => (
        <div key={i} className={'panel panel-info panel-offset-' + r.indent}>
          <div className="panel-heading">
            <h3 className="panel-title">
              {r.indent 
                ? <span><Glyph icon="arrow-circle-right" />{' ' + r.author.name}</span>
                : <span><img src={r.author.avatarURL} />{' ' + r.author.name}</span>
              }
            </h3>
          </div>
          <div className="panel-body" dangerouslySetInnerHTML={{__html: r.html}} />
          <div className="panel-footer">{r.date}</div>
        </div>
      ));
    var title = `Reviews (${this.props.numReviews})`;
    return (
      <AccordianPanel title={title} id="reviews" icon="pencil">
        {reviews}
      </AccordianPanel>
      );
  }
});

var MainFileOverview = React.createClass({

  render() {
    var model = this.props.model;
    return (
      <AccordianPanel title="Overview" id="overview" icon="info-circle">
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
                        ? <a target="_blank" href={model.purchaseLicenseURL}><img src={model.purchaseLogoURL} /></a>
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
  var title = `Files (${props.model.files.length})`;
  return ( <AccordianPanel title={title} id="files" icon="files-o">
             <Files model={props.model} />
            </AccordianPanel>
        );
}

var MainFile = React.createClass({
  mixins: [ModelTracker],

  stateFromStore(store) {
    return { model: store.model.upload };
  },

  render() {
    var model = this.state.model;
    return(
        <div>
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-md-12">
                <div className="input-group">
                  <span className="input-group-addon">{"by"}</span>
                  <span className="form-control">
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
            <RecommendedBy model={model} numRecommends={model.numRecommends} />
            <Reviews model={model} numReviews={model.numReviews} />
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
          .panel-offset-1 {
            margin-left: 12px;
          }
          .panel-offset-2 {
            margin-left: 32px;
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