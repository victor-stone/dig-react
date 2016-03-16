import React            from 'react';
import User             from '../../stores/user';

import {  Remixes,
          ActionButtons,
          Paging   }    from '../../components';

var ExternalLink = ActionButtons.ExternalLink;

const Header = React.createClass({

  render: function() {
    var model = this.props.model;

    var homelink = model.homepage 
            ? <ExternalLink className="btn btn-info" href={model.homepage} text="homepage" />
            : null;

    return (
        <div className="page-header">
          <h1 className="center-text"><img className="img-circle" src={model.avatarURL} /> {model.name}</h1>
          <div className="center-text">
            <ExternalLink className="btn btn-info" href={model.url} text="@ccMixter" /> {homelink}
          </div>
        </div>
      );
    },

});

var people = React.createClass({

  render() {
    var store  = this.props.store;

    if( store.error ) {
      return (<div className="well"><h1>{"wups, can't find that artist"}</h1></div>);
    }
    
    return  (
      <div>
        <Header model={store.model.artist} />
        <Paging store={store} />
        <Remixes store={store} skipUser />
        <Remixes.NotALotHere store={store} />
      </div>
    );
  },

});

people.path = '/people/:userid';

people.title = 'People';

people.store = function(params) {
  return User.storeFromQuery(params);
};

module.exports = people;

