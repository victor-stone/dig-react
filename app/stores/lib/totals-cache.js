import rsvp             from 'rsvp';
import { TagString,
         LibArray }     from 'unicorns';

const MAX_CACHE_KEYS = 50;

class TotalsCache {
  constructor(reqtagFilters) {
    this._filters    = reqtagFilters;
    this._regex      = new RegExp('^(' + reqtagFilters.join('|') + ')$'); 
    this._totals     = new Map();

    // TODO: investigate if this should include 't' and 'template'
    this._skip = LibArray.from([ 'offset', 'limit', 'dataview', 'reqtags', '_', 'f' ]);
  }

  cacheableTagFromTags(tags) {
    return this.filter(tags).toString();
  }

  filter(tags) {
    return (new TagString(tags)).filter( this._regex );
  }

  getTotals(params,store) {

    const { _filters:reqtagFilters, _regex:filter, _totals:totals } = this;

    var keyParams = {};
    Object.keys(params).sort().forEach( k => {
      if( !this._skip.contains(k) && params[k] ) {
        keyParams[k] = params[k];
      }
    });

    // the incoming reqtags often have other 
    // reqtags that we don't know about 
    // this preserves them:
    const bareReqtags = new TagString(params.reqtags);
    bareReqtags.remove( bareReqtags.filter(filter) );

    keyParams.reqtags = bareReqtags.toString();

    const result = totals.get(keyParams);

    if( result ) {
      return rsvp.resolve(result);
    }

    const countParams = Object.assign({},keyParams);

    let counts = { 
        all: store.count(countParams),
      };

    // the reqtag doubles as a reqtag and batchName
    reqtagFilters.forEach( reqtag => { 
      countParams.reqtags = bareReqtags.add(reqtag).toString();
      counts[reqtag] = store.count(countParams,reqtag);
      bareReqtags.remove(reqtag);
    });

    return store.flushBatch(counts)
            .then( result => {
              if( totals.size > MAX_CACHE_KEYS ) {
                totals.clear();
              }
              totals.set(keyParams,result);
              return result;
            });
  }
}

module.exports = TotalsCache;

