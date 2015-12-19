import React from 'react';

import qc                       from '../../models/query-configs';
import { mergeParams }          from '../../unicorns';
import Remixes                  from '../../stores/remixes';
import PageHeader               from '../../components/PageHeader';
import QueryOptions             from '../../components/playlists/QueryOptions';
import { ModelTracker }         from '../../mixins';


var TrackList = React.createClass({

  mixins: [ ModelTracker ],

  stateFromStore: function(store) {
    return { model: store.model };
  },

  render: function() {
    var model = this.state.model;
    return(
        <ul className="track-list">
          {model.items.map( t =>  <li key={t.id}>
                                    <span className="name">
                                      {t.name}
                                    </span>
                                    <span className="by">
                                      {" by "}
                                    </span>
                                    <span className="artist">
                                      {t.artist.name}
                                    </span>
                                  </li> )}
        </ul>
      );
  }
});

var StaticForm = React.createClass({

  render: function() {
    return (
        <div className="row">
          <div className="col-md-6">
            <form className="form-horizontal">
                <div className="form-group">
                    <label htmlhtmlFor="name" className="control-label col-xs-2">{"name"}</label>
                    <div className="col-xs-10">
                        <input type="name" className="form-control" id="name" placeholder="name" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlhtmlFor="inputPassword" className="control-label col-xs-2">{"Password"}</label>
                    <div className="col-xs-10">
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-offset-2 col-xs-10">
                        <div className="checkbox">
                            <label><input type="checkbox" />{" Remember me"}</label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-offset-2 col-xs-10">
                        <button type="submit" className="btn btn-primary">{"Save"}</button>
                    </div>
                </div>
            </form>
          </div>
          <div className="col-md-6">
            <h3>{"preview"}</h3>
            <TrackList store={this.props.store} />
          </div>
        </div>
      );
  }
});

var DynamicForm = React.createClass({

  render: function() {
    var store = this.props.store;
    return (
        <div className="row">
          <div className="col-md-6">
            <QueryOptions store={store} />
          </div>
          <div className="col-md-6">
            <h3>{"preview"}</h3>
            <TrackList store={store} />
          </div>
        </div>
      );
  }
});

var NewPlaylistWidget = React.createClass({

  getInitialState: function() {
    return { tab: 'dynamic' };
  },

  onFilter: function(tab) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.setState( { tab } );
    };
  },

  checkActive: function(tab) {
    return tab === this.state.tab ? 'active' : '';
  },

  render: function() {
    var store = this.props.store;
    return(
      <div>
        <ul className="nav nav-tabs">
          <li className={this.checkActive('static')} ><a href="#" onClick={this.onFilter('static')}>{"static "}</a></li>
          <li className={this.checkActive('dynamic')}><a href="#" onClick={this.onFilter('dynamic')}>{"dynamic "}</a></li>
        </ul>
        <div className="tab-content">
          {this.state.tab === 'static'
            ? <StaticForm   store={store} />
            : <DynamicForm  store={store} />
          }
        </div>
      </div>
      );
  }
});

var NewPlaylist = React.createClass({

  render: function() {
    var store = this.props.store;
    return (
        <div className="new-playlist-widget">
          <PageHeader icon="edit" title="New Playlist" />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <NewPlaylistWidget store={store} />
              </div>
            </div>
          </div>
        </div>
      );
  }
});

NewPlaylist.path = '/new';

NewPlaylist.store = function() {
  var opts = mergeParams( { type: 'any' }, qc.remixes );
  var qparams = mergeParams( {}, opts );
  return Remixes.storeFromQuery(qparams, opts);
};

module.exports = NewPlaylist;

