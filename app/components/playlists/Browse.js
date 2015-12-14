import React              from 'react';
import Tags               from './Tags';
import Link               from '../Link';
import Paging             from '../Paging';
import PageHeader         from '../PageHeader';
import PlayAllButton      from './PlayAllButton';
//import { TagString }      from '../../unicorns'; 
import { ModelTracker }   from '../../mixins';



var Playlists = React.createClass({

  mixins: [ModelTracker],

  stateFromStore: function(store) {
    return { model: store.model };
  },

  render: function() {

    var model = this.state.model;
    
    return (
      <ul className="playlists-list">
      {model.items.map( p => {
        return(<li key={p.id}>
          <PlayAllButton playlist={p.id} />
          <Link href={'/playlist/browse/'+p.id} className="playlist-link">{p.name}<span className="badge">{p.count}</span></Link>          
          <div className="playlist-curator">{"curator: "}<Link href={'/people/' + p.curator.id}>{p.curator.name}</Link></div>
          <Tags model={p.tags} />
        </li>);})
      }
      </ul>
      );
    }
});


var Browse = React.createClass({

  render: function() {
    var store = this.props.store;
    return (
      <div>
        <PageHeader icon="music" title="Playlists" />
        <div className="container playlist-browser">
          <div className="row">
            <div className="col-md-2 col-md-offset-1">
              <Paging store={store} disableBumping />
            </div>
            <div className="col-md-7">
              <Playlists store={store} />
            </div>
          </div>
        </div>
      </div>
    );      
  }

});


module.exports = {
  Playlists,
  Browse
};

