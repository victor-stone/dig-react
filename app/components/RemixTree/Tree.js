import React       from 'react';
import InlineCSS   from '../vanilla/InlineCSS';
import { Accordion
               }   from '../vanilla/Accordion';

import { ModelTracker }    from '../../mixins';
import { SamplesFrom, 
         SamplesUsedIn }   from '../bound/TreeLinks';

import FileSection from './Files';
import Recommends  from './Recommends';
import Reviews     from './Reviews';
import Overview    from './Overview';
import Description from '../bound/UploadDescription';
import UploadMenu  from './UploadMenu';
import css         from './style/tree';

import { PrevPeruse,
        NextPeruse } from '../PeruseNavigation';


class Tree extends ModelTracker(React.Component)
{
  render() {
    const store = this.state.store;

    if( store.error ) {
      return <h1 className="well">{"There does not seem to be anything here...?"}</h1>;
    }

    const { upload:{numRecommends,numReviews} } = store.model;

    return( 
      <div className="container-fluid">
        <InlineCSS css={css} id="tree-css"/>
        <div className="row">  
          <div className="col-md-2">
            <PrevPeruse store={store}/>
          </div>
          <div className="col-md-6 col-md-offset-1">
            <Description store={store} />
            <UploadMenu store={store} />
          </div>
          <div className="col-md-2 col-md-offset-1">
            <NextPeruse store={store}/>
          </div>
        </div>
        <div className="row">  
          <div className="col-md-4 col-md-offset-2">
            <SamplesFrom store={store} />
          </div>
          <div className="col-md-4">
            <SamplesUsedIn store={store} />
          </div>
        </div>
        <div className="row">  
          <div className="col-md-6 col-md-offset-3">
            <Accordion withExpandAll id="accordion">
              <Overview store={store} />
              <FileSection store={store} />
              <Recommends store={store} numItems={numRecommends} />
              <Reviews store={store} numItems={numReviews} />
            </Accordion>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Tree;

//