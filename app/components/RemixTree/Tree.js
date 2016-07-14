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

import { Row,
         FluidContainer,
         Column }     from '../vanilla/Grid';


class Tree extends ModelTracker(React.Component)
{
  render() {
    const store = this.state.store;

    if( store.error ) {
      return <h1 className="well">{"There does not seem to be anything here...?"}</h1>;
    }

    const { upload:{numRecommends,numReviews} } = store.model;

    return( 
      <FluidContainer>
        <InlineCSS css={css} id="tree-css"/>
        <Row>
          <Column cols="2">
            <PrevPeruse store={store}/>
          </Column>
          <Column cols="6" offset="1">
            <Description store={store} />
            <UploadMenu store={store} />
          </Column>
          <Column cols="2" offset="1">
            <NextPeruse store={store}/>
          </Column>
        </Row>
        <Row>
          <Column cols="4" offset="2">
            <SamplesFrom store={store} />
          </Column>
          <Column cols="4">
            <SamplesUsedIn store={store} />
          </Column>
        </Row>
        <Row>
          <Column cols="6" offset="3">
            <Accordion withExpandAll id="accordion">
              <Overview store={store} />
              <FileSection store={store} />
              <Recommends store={store} numItems={numRecommends} />
              <Reviews store={store} numItems={numReviews} />
            </Accordion>
          </Column>
        </Row>
      </FluidContainer>
    );
  }
}

module.exports = Tree;

//