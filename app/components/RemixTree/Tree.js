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


class Tree extends ModelTracker.extender(React.Component)
{
  stateFromStore(store) {
    return { store };
  }

  render() {
    var store = this.state.store;
    var upload = store.model.upload;

    return( 
      <div className="container-fluid">
        <InlineCSS css={css} id="tree"/>
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
            <Accordion withExpandAll>
              <Overview store={store} />
              <FileSection store={store} />
              <Recommends store={store} numItems={upload.numRecommends} />
              <Reviews store={store} numItems={upload.numReviews} />
            </Accordion>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Tree;

//