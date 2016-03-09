/*eslint "react/no-danger":0 */
/* globals $ */

import React       from 'react';
import Link        from '../Link';

import { ModelTracker }  from '../../mixins';

const MAX_LINKS_SHOW = 5;

var TreeLinks = React.createClass({

  getInitialState() {
    return this.splitFiles(this.props.files);
  },

  componentDidMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    var linkID = '#link_' + this.props.id;
    var tailID = '#tail_' + this.props.id;
    $(tailID)
      .on('show.bs.collapse', () => $(linkID).text('show less') )
      .on('hide.bs.collapse', () => $(linkID).text('show all') );
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
          <Link href={'/tree/' + s.artist.id + '/' + s.id}>
            <span className="tree-link-name">{s.name}</span>
            {' '}
            <span className="tree-link-artist">{s.artist.name}</span>
          </Link>
        </li>      
      );
    };

    var tail = this.state.tail ? this.state.tail.map( fileMapper ) : null;
    var cls  = this.state.tail ? 'tree-link-more' : 'tree-link-more hidden';
    return (
        <div className="panel panel-info" id={this.props.id}>
          <div className="panel-heading">
            <h3 className="panel-title">{this.props.title}</h3>
          </div>
          <div className="panel-body">
            <ul className="tree-link-head">
              {this.state.head.map( fileMapper )}
            </ul>
            <ul className="collapse tree-link-tail" id={'tail_' + this.props.id}>
              {tail}
            </ul>
            <button id={'link_' + this.props.id} data-toggle="collapse" className={cls} href={'#tail_' + this.props.id}>{'show all'}</button>
          </div>
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


module.exports = {
  SamplesFrom,
  SamplesUsedIn
};

//