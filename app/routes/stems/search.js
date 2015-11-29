import React            from 'react';
import qc               from '../models/query-configs';
import Samples          from '../stores/samples';
import { mergeParams,
         TagString }    from '../unicorns';
import {  StemsBrowser,
          StemsQueryOptions,
          PageHeader }    from '../components';

var stemsSearch = React.createClass({

  render() {
    var store    = this.props.store;
    var search   = (new TagString(store.model.queryParams.tags)).toString();
    return (
      <div>
        <StemsQueryOptions store={store} />
        <PageHeader icon="search" subTitle="Search" title={search}/>
        <div className="container-fluid">
          <StemsBrowser store={store} />
        </div>
      </div>
    );      
  },

});

stemsSearch.title = 'Samples Browser - Search';

stemsSearch.path = '/search';

function addSearchStringAsSelectedTags(tagModels,search) {
  var searchArr = search.split(/\s/g);
  var len = searchArr.length;
  for( var i = 1; i < len; i++ ) {
    searchArr.push( [searchArr[i-1],searchArr[i]].join('_') );
  }
  var searchTags = new TagString(searchArr);
  var tags       = new TagString(tagModels.map( t => t.id ));
  var valid      = tags.intersection(searchTags);
  return valid;
}

stemsSearch.store = function(params,queryParams) {
  var store = new Samples();
  return store.tags.sampleCategories()
    .then( tagModels => {
      var tags = addSearchStringAsSelectedTags(tagModels,queryParams.searchp);
      var qparams = mergeParams( {}, qc.samples, { tags: tags.toString() } );
      return store.getModel(qparams);
    }).then( () => store );
};

module.exports = stemsSearch;

