import ccmixter         from '../models/ccmixter';
import serialize        from '../models/serialize';
import Eventer          from '../services/eventer';
import queryAjaxAdapter from '../services/query-ajax-adapter';
import { oassign }      from '../unicorns';

class Query extends Eventer
{
  constructor() {
    super(...arguments);
    this.adapter = queryAjaxAdapter;
  }

  query(params) {
    return this.adapter.query(this._clean(params));
  }
  
  queryOne(params) {
    return this.adapter.queryOne(this._clean(params));
  }
  
  findUser(id) {
    var qparams = {
      u: id,
      dataview: 'user_basic',
      f: 'js'
    };
    return this.queryOne(qparams).then( serialize( ccmixter.User ) );
  }

  findUsers(queryParams) {
    var qp = oassign( {
      t: 'user_list',
      f: 'js',
    }, queryParams );
    return this.query(qp).then( serialize( ccmixter.User ) );
  }

  searchUsers(params) {
    params.dataview ='user_basic';
    params.f = 'js';
    return this.query(params).then( serialize( ccmixter.UserBasic ) );
  }
  
  count(qparams) {
    var countParams = this.countParams(qparams);
    return this.queryOne(countParams);
  }

  countParams(qparams) {
    var countParams = { f: 'count' };
    var exclude = [ 'limit', 'digrank', 'sort', 'ord', 'f', 'format' ];
    for( var k in qparams ) {
      if( !exclude.contains(k) && qparams[k] ) {
        countParams[k] = qparams[k];
      }
    }
    return countParams;    
  }

  transaction(promise) {
    this.adapter._inc();
    return promise.finally( () => this.adapter._dec() );
  }

  _clean(p) {
    var t = {};
    for( var k in p ) {
      if( !(typeof p[k] === 'undefined' || (typeof p[k] === 'string' && p[k].length === 0)) ) {
        t[k] = p[k];
      }
    }
    return t;
  }
}

module.exports = Query;
