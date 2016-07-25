import React from 'react';

import { Row,
         Container,
         Column }      from '../vanilla/grid';

import {  Actions,
          Header,
          Licenses,
          Tags,
          Trackbacks,
          Remixes   }   from './upload/index';


class Upload extends React.Component
{
 render() {
    const store       = this.props.store;
    const model       = store.model;
    const upload      = model.upload;
    const { name, 
            userTags } = upload;

    return  (
      <div>

        <div className="page-header">
          <h1 className="center-text">{name}</h1>
        </div>

        <Container className="upload-page">
          <Row>
            <Column cols="8" push="4">
              <Row>
                <Column md="6" sm="6">
                  <Header model={upload} />
                </Column>
                <Column cols="6">
                  <Licenses model={upload} />
                </Column>
              </Row>  
              <Row>
                <Column cols="8" className="tags">
                  <Tags tags={userTags} />
                </Column>  
              </Row>
            </Column>
            <Column cols="2" offset="2" pull="8">
              <Actions model={upload} />
            </Column>
          </Row>
          <Row className="used-in">
            <Column md={{cols:5,offset:1}} sm="12" className="trackbacks">
              <Trackbacks model={model} />
            </Column>
            <Column md="5" sm="12" className="remixes">
              <Remixes model={model} />            
            </Column>
          </Row>
        </Container>

      </div>
    );
  }

}

module.exports = Upload;

