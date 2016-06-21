/*eslint "react/no-danger":0 */
/* globals $ */

import React          from 'react';
import Link           from '../services/LinkToRoute';
import Trackbacks     from '../Trackbacks';
import MoreOrLessLink from '../MoreOrLessLink';

import { ModelTracker }  from '../../mixins';

const MAX_LINKS_SHOW = 3;

function TreeLink( props ) {
  var s = props.s;
  return (
        <li>
          <Link href={'/files/' + s.artist.id + '/' + s.id}>
            <span className="tree-link-name">{s.name}</span>
            {' '}
            <span className="tree-link-artist">{s.artist.name}</span>
          </Link>
        </li>      
      );
}

var TreeLinks = React.createClass({

  mixins: [ModelTracker],

  componentDidMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    $('#tail_' + this.props.id)
      .on('show.bs.collapse', () => this.showMoreOrLess('less') )
      .on('hide.bs.collapse', () => this.showMoreOrLess('more') );
  },

  showMoreOrLess(moreOrLess) {
    this.setState({
      showLess: moreOrLess === 'less',
    });
  },

  stateFromStore(store) {
    var files      = store.model[this.props.id];
    var trackbacks = this.props.trackbacks ? store.model.trackbacks : null;
    var filelen    = files.length || 0;
    var tblen      = trackbacks ? trackbacks.length : 0;
    
    if( filelen + tblen > MAX_LINKS_SHOW ) {
      if( filelen > MAX_LINKS_SHOW ) {
        return { head: files.slice(0,MAX_LINKS_SHOW), 
                 tbhead: null,
                 tail: files.slice(MAX_LINKS_SHOW), 
                 tbtail: trackbacks };
      } else {
        var diff = MAX_LINKS_SHOW - filelen;
        return { head: files,
                 tbhead: trackbacks.slice(0,diff),
                 tail: null,
                 tbtail: trackbacks.slice(diff) };
        }
    }

    return { head: files, 
             tbhead: trackbacks,
             tail: null, 
             tbtail: null  };
  },

  render() {
    var head    = this.state.head   ? this.state.head.map( s => <TreeLink s={s} key={'fl_' + s.id} />) : null;
    var tail    = this.state.tail   ? this.state.tail.map( s => <TreeLink s={s} key={'fl_' + s.id} />) : null;
    var tbhead  = this.state.tbhead ? this.state.tbhead.map( tb => (<Trackbacks.Trackback model={tb} key={'tb_' + tb.id}/>) ) : null;
    var tbtail  = this.state.tbtail ? this.state.tbtail.map( tb => (<Trackbacks.Trackback model={tb} key={'tb_' + tb.id} />) ) : null;
    return (
        <div className="panel panel-warning" id={this.props.id}>
          <div className="panel-heading">
            <h3 className="panel-title">{this.props.title}</h3>
          </div>
          <div className="panel-body">
            <ul className="tree-link-head">
              {head}
              {tbhead}
            </ul>
            <ul className="collapse tree-link-tail" id={'tail_' + this.props.id}>
              {tail}
              {tbtail}
            </ul>
            {tail || tbtail
              ? <MoreOrLessLink targetId={'tail_' + this.props.id} less={this.state.showLess} />
              : null
            }
          </div>
        </div>

      );
  }
});

var SamplesFrom = React.createClass({

  mixins: [ModelTracker],

  stateFromStore(store) {
    return { store };
  },

  render() {
    return(
      <TreeLinks title="Uses samples from..." id="sources" store={this.state.store} />
    );
  }
});

var SamplesUsedIn = React.createClass({

  mixins: [ModelTracker],

  stateFromStore(store) {
    return { store };
  },

  render() {
    return(
      <TreeLinks title="Samples are used in..." id="remixes" store={this.state.store} trackbacks />
    );
  }
});


module.exports = {
  SamplesFrom,
  SamplesUsedIn
};

//