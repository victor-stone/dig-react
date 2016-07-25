import React       from 'react';
import InlineCss   from '../vanilla/inline-css';
import { Accordion
               }   from '../vanilla/accordion';

import { ModelTracker }    from '../../mixins';
import { SamplesFrom, 
         SamplesUsedIn }   from '../bound/tree-links';

import FileSection from './files';
import Recommends  from './recommends';
import Reviews     from './reviews';
import Overview    from './overview';
import Description from '../bound/upload-description';
import UploadMenu  from './upload-menu';
import css         from './style/tree';

import { PrevPeruse,
        NextPeruse } from '../peruse-navigation';

import { Row,
         FluidContainer,
         Column }     from '../vanilla/grid';


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
        <InlineCss css={css} id="tree-css"/>
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