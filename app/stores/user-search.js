import rsvp             from 'rsvp';
import Query            from './query';
import QueryFilters     from './lib/query-filters';
import { mergeParams }  from '../unicorns';
import events           from '../models/events';
import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';

class UserSearch extends QueryFilters(Query) {

  constructor(defaultParams) {
    super(...arguments);
    this._queryParams = {};
    this.model = {};
    this._defaultParams = defaultParams;
  }

  get queryParams() {
    return this._queryParams;
  }

  refresh(queryParams) {
    const qp = mergeParams( {}, this._defaultParams, this._queryParams, queryParams );
    return this.searchUsers(qp).then( items => {
      this.model = { items };
      this.emit( events.MODEL_UPDATED, this.model );
    });
  }

  // only look at the beginning of the user_name or user_real_name  
  lookUpUsers( str, queryParams = {}, deferName = null ) {
    var q = mergeParams( { lookup: str }, this._defaultParams, queryParams );
    return this.searchUsers( q, deferName );
  }
  
  // search the entire users record
  searchUsers(params,deferName,deferThis) {

    const { lookup, searchp } = params;

    if( !lookup && !searchp ) {
      return  rsvp.resolve([]);
    }

    this._queryParams = Object.assign({},params);
    
    params.dataview ='user_basic';
    
    return (deferThis || this).query(params,deferName)
                  .then( serialize( ccmixter.User.UserBasic ) );
  }

  findUser(id,deferName,deferThis) {
    var qparams = {
      user: id,
      dataview: 'user_basic',
    };
    return (deferThis || this).queryOne(qparams,deferName).then( serialize( ccmixter.User.User ) );
  }

  // ids is a comma separated string of id's
  findUsers(ids,deferName) {
    var qp = { ids, t: 'user_list' };
    return this.query(qp,deferName)
                  .then( serialize( ccmixter.User.User ) );
  }

}

module.exports = UserSearch;