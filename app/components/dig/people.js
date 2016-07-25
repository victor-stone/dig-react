import React         from 'react';
import QueryOptions  from './query-options';
import PeopleHeader  from '../models/people-header';
import Remixes       from './remixes';

const People = React.createClass({

  render() {
    const { store, store:{error=null,model} } = this.props;

    if( error ) {
      return (<div className="well"><h1>{"wups, can't find that artist"}</h1></div>);
    }
    
    return  (
      <div>
        <PeopleHeader host="http://beta.ccmixter.org" model={model.artist} />
        <Remixes store={store} skipUser>
          <QueryOptions store={store} />
        </Remixes>
        <Remixes.NotALotHere store={store} />
      </div>
    );
  },

});

module.exports = People;

