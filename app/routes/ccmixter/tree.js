import React             from 'react';
import { Gallery,
         GallerySubNav } from '../../components/ccmixter/';
import qc                from '../../models/query-configs';
import Store             from '../../stores/remixes';

import { mergeParams, 
         oassign }       from '../../unicorns';

import { PushPeruseModel } from '../../mixins';

var TreePage = React.createClass({

  mixins: [PushPeruseModel],
  
  render() {
    return <Gallery {...this.props} />; 
  }
});


TreePage.title = 'Remix Tree';

TreePage.path  = '/tree';

TreePage.subnav = function(props) {
  return (<GallerySubNav paging store={props.store} />);
};

TreePage.store = function(params,queryParams) {
  var qopts = oassign({},qc.remixes);
  if( queryParams && 'reqtags' in queryParams ) {
    qopts.reqtags = queryParams.reqtags;
  }
  var opts = mergeParams( {}, qopts, qc.latest );
  var qparams = mergeParams( {}, opts, queryParams );
  return Store.storeFromQuery(qparams, opts);
};

module.exports = TreePage;

