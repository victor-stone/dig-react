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

    const { tags } = params;

    var qparams = mergeParams( {}, 
                               qc.remixes, 
                               { tags },
                               queryParams );

    return Remixes.fromQuery(qparams);
  },

  urlFromStore(store) {
    const tags = store.getParameter('tags').serialize();

    return '/tags/' + tags + store.queryString( qc.visibility.tags );
  }

});

module.exports = tags;

