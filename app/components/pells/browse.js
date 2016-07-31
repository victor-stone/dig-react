import React              from 'react';
import QueryOptions       from './query-options';
import DownloadPopup      from '../download-popup';
import LinkToRemixTree    from '../services/link-to-remix-tree';
import LinkToPeople       from '../services/link-to-people-route';
import { PlayButton }     from '../audio-player';

import { ModelTracker,
         NowPlayingTracker } from '../../mixins';

import { bindAll }        from 'unicorns';

import InlineCss           from '../vanilla/inline-css';
import browserCSS          from './style/browser';
import { QueryOptionsCSS } from '../filters/query-options';

import { Row,
         Container,
         Column }         from '../vanilla/grid';

class PellsListing extends ModelTracker(React.Component)
{
  stateFromStore(store) {
    return { model: store.model };
  }

  selectLine(pell) {
    return e => {
      e.stopPropagation();
      e.preventDefault();
      this.props.onSelectedPell(pell);
    };
  }

  render() {

    const { items, artist } = this.state.model;

    const pellLine = pell => {

      return (<li className="pell" key={pell.id}>        
                  {pell.bpm && <span className="bpm">{'bpm: ' + pell.bpm}</span>}
                  <span className="title" onClick={this.selectLine(pell)}>{pell.name}</span>
                  <PlayButton model={pell} className="pell-play btn-sm" />
                  {!artist && <span className="artist"><LinkToPeople model={pell.artist} /></span>}
              </li>);
    };

    return React.createElement( 'ul', {className:'tab-content'}, items.map(pellLine) );
  }
}

class PellDetail extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = { 
      model: this.props.model,
      show: 'listing'};
  }

  componentWillReceiveProps(newProps) {
    this.setState( { model: newProps.model } );
  }

  render() {
    const { model, model:{name,artist,files} = {} } = this.state;

    if( !model ) {
      return null;
    }

    return (
        <div className="pell-detail">
          <ul className="download-list">
            <li><span className="name">{name}</span></li>
            <li><LinkToPeople className="artist" model={artist} /></li>
            {files.map( file => {
              const { id, extension, nicName, playTime } = file;
              return (
                  <li className="dl-list" key={id} >
                      <DownloadPopup btnClass="sm-download" model={model} file={file} />{" "}
                      <span className="ext">{extension}</span>{" "}
                      {playTime && <span className="playtime">{playTime}</span>}{" "}
                      <span className="nic">{nicName}</span>
                  </li>
                );})
            }
            <li><LinkToRemixTree className="ccm-link pell-detail-foot" model={model} /></li>
          </ul>
        </div>
      );
  }
}

class PellsBrowser extends NowPlayingTracker(React.Component)
{
  constructor() {
    super(...arguments);
    bindAll( this, 'onNowPlayingState', 'onSelectedPell' );
  }

  onNowPlayingState(selected) {
    this.setState( { selected } );
  }

  onSelectedPell(selected) {
    this.setState( { selected });
  }

  render() {
    var store = this.props.store;
    return (

      <Container className="pells-page">
        <InlineCss css={QueryOptionsCSS + browserCSS} id="pell-browser-css" />
        <Row>
          <Column cols="3">
            <PellDetail store={store} model={this.state.selected} />
          </Column>
          <Column cols="7" className="pell-browser">
            <PellsListing store={store} onSelectedPell={this.onSelectedPell} />
          </Column>
          <Column cols="2">
            <QueryOptions store={store} />
          </Column>
        </Row>
      </Container>
    );      
  }

}

module.exports = {
  PellDetail,
  PellsListing,
  PellsBrowser
};

