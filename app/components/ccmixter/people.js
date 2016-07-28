/* eslint "react/no-danger":0 */
import React   from 'react';
import Tiles            from '../remix-tree/tiles';
import css              from './style/people';

import Followers        from './follow';
import FollowButton     from '../bound/follow-button';

import { TagString }    from '../../unicorns';

import {  ModelTracker} from '../../mixins';

import {  InlineCss,
          CollapsingText,
          ExternalLink,
          FormField as FormItem }  from '../vanilla';

import {  HorizontalForm,
          FormControl }  from '../vanilla/form';

import { Row,
         FluidContainer,
         Column }       from '../vanilla/grid';

class Description extends ModelTracker(React.Component)
{
  stateFromStore(store) {
    return { html: store.model.artist.descriptionHTML };
  }

  render() {
    return (<CollapsingText html={this.state.html} />);
  }

}

class Header extends React.Component
{
  render() {
    var a = this.props.store.model.artist;
    var html = { __html: a.name };
    return(
        <div className="people-head">
          <img className="img-circle" src={a.avatarURL} /> 
          <h3 dangerouslySetInnerHTML={html} />
          <Description store={this.props.store} />
          <div className="clearfix" />
          <Overview store={this.props.store} />
        </div>
    );
  }
}

class Overview extends React.Component
{
  render() {

    const { 
      store, 
      store:{model:{artist}} 
    } = this.props;
    
    const { homepage, joined, name } = artist;

    return (
      <HorizontalForm>
          <FormItem title="member since">
            <FormControl>{joined}</FormControl>
          </FormItem>
          {homepage && <FormItem title="homepage">
                          <FormControl><ExternalLink href={homepage} text={name} /></FormControl>
                          </FormItem>}
          <Followers store={store} followType="following" title="follows" />
          <Followers store={store} followType="followers" title="followers" />
          <FollowButton store={store} />
      </HorizontalForm>
      );
  }
}

const UPLOAD_FILTER = /(remix|editorial_pick|sample|acappella)/;

class PeoplePage extends ModelTracker(React.Component)
{
  render() {
    const { store, store:{error,model} } = this.state;

    if( error ) {
      return (<div className="well"><h1>{"wups, can't find that artist"}</h1></div>);
    }
    
    var qp = model.queryParams;
    var showHeader = !(('offset' in qp) && parseInt(qp.offset) > 0) &&
                     !TagString.filter(qp.reqtags, UPLOAD_FILTER).getLength();

    return  (
      <FluidContainer className="people">
        <InlineCss css={css} id="people-css"/>        
        {showHeader
          ? <Row><Column cols="8" offset="2"><Header store={store} /></Column></Row>
          : <h2 className="center-text">{model.artist.name}</h2>
        }
        <Row>
          <Column cols="10" offset="1">
            <Tiles store={store} skipUser />
          </Column>
        </Row>
      </FluidContainer>
    );
  }

}

module.exports = PeoplePage;

