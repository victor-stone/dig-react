import React            from 'react';
import qc               from '../../models/query-configs';
import Samples          from '../../stores/samples';
import { mergeParams }  from '../../unicorns';
import Browse           from '../../components/stems/Browse';
import SubNav           from '../../components/stems/SubNav';


class BrowseStemsPage extends React.Component
{
  render() {
    return <Browse {...this.props} />;
  }
}

BrowseStemsPage.title = 'Samples Browser';

BrowseStemsPage.subnav = SubNav;

BrowseStemsPage.path = '/stems';

BrowseStemsPage.store = function(params,queryParams) {
  var opts    = mergeParams( {type: 'any' }, qc.samples, qc.latest );
  var qparams = mergeParams( { }, opts, queryParams );
  return Samples.storeFromQuery(qparams,opts);
};

module.exports = BrowseStemsPage;

