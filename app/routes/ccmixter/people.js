import React            from 'react';
import User             from '../../stores/user';
import People           from '../../components/ccmixter/People';
import { mergeParams }  from '../../unicorns';
import qc               from '../../models/query-configs';
import SubNav           from '../../components/ccmixter/GallerySubNav';
import { PushPeruseModel } from '../../mixins';

var people = React.createClass({
  mixins: [PushPeruseModel],

  render() {
    return (<People store={this.props.store} />);
  }  
});

people.path = '/people/:userid';

people.title = 'People';

people.subnav = function(props) {
  return (<SubNav paging {...props} all className="people-subnav" />);
};

people.store = function(params,queryParams) {
  var defopts = mergeParams( {}, qc.people, { u: params.userid } );
  var qparams = mergeParams( {}, defopts, queryParams );
  return User.storeFromQuery(qparams, defopts )
          .then( store => {
            people.title = !this.error && store.model.artist.name;
            return store;
          });
};

module.exports = people;

