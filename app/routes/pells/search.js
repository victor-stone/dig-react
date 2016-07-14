import React              from 'react';
import qc                 from '../../models/query-configs';
import Acappellas         from '../../stores/acappellas';
import { mergeParams }    from '../../unicorns';
import Browse             from '../../components/pells/Browse';
import { SearchHeader,
         DidYouMean }     from '../../components';
import { Row,
         Container,
         Column }     from '../../components/vanilla/Grid';

function NoHits() {
  return(<div ></div>);
}

function search(props) {
  var store = props.store;
  return (<div>
            <SearchHeader store={store} />
            <DidYouMean store={store} artists><NoHits /></DidYouMean>
            <Container className="pells-page">
              <Row>
                <Column cols="7" className="pell-browser">
                  <div className="tab-content">
                    <Browse.PellsListing store={store} />
                  </div>
                </Column>
                <Column cols="3">
                  <Browse.PellDetail store={store} />
                </Column>
              </Row>
            </Container>
          </div>);
}

search.title = 'Search';

search.store = function(params,queryParams) {
  
  var opts     = mergeParams( {}, qc.pells );
  var qparams  = mergeParams( {}, opts, queryParams );

  return Acappellas.storeFromQuery(qparams, opts);
};

module.exports = search;

