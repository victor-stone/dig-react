import React            from 'react';
import { FeaturedPage } from '../../components/dig';
import { mergeParams }  from 'unicorns';
import qc               from '../../models/query-configs';
import Remixes          from '../../stores/remixes';

var tags = React.createClass({

  render() {
    var title = this.props.params.tags.replace(/[^a-z_]+/,' ');
    return (
      <FeaturedPage {...this.props} icon="tags" subTitle="Tags" title={title} />
    );      
  },
});

Object.assign(tags,{
  title: 'Tags',

  path: '/tags/:tags',

  subnav: FeaturedPage.subnav,

  store(params,queryParams) {
    var opts    = mergeParams( {}, qc.remixes, { tags: params.tags } );
    var qparams = mergeParams( {}, opts, queryParams );
    return Remixes.storeFromQuery(qparams, opts);
  },

  urlFromStore(store) {
    return '/tags/' + store.queryParams.tags + store.queryString;
  }

});

module.exports = tags;

