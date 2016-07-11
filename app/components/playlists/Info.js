import React      from 'react';
import SharePopup from '../SharePopup';
import Glyph      from '../vanilla/Glyph';

import Link               from '../services/LinkToRoute';
import LinkToPeople       from '../services/LinkToPeopleRoute';
import LinkToPlaylist     from '../services/LinkToPlaylistRoute';

import Toggle                  from '../bound/Toggle';
import { EditableTagsDiv }     from '../bound/Tags';

import DeletePlaylist          from './DeletePlaylist';
import { CurrentUserTracker,
         ModelTracker }        from '../../mixins';

import BoundInlineFormattedTextEditor  from '../bound/FormattedTextEditor';

// FIXME: feature button is ugly
class Feature extends CurrentUserTracker(React.Component)
{
  constructor() {
    super(...arguments);
  }

  render() {
    const { user: {isAdmin=false} = {} } = this.state;
    return isAdmin && <Toggle store={this.props.store} className="featured" propName="isFeatured" text="Featured" />;
  }
}

// you can't return null from a stateless component
class EditQueryLink extends React.Component
{
  constructor() {
    super(...arguments);
  }

  render() {
    const { store } = this.props;
    const { permissions:{canEdit=false}, model:{head, head:{isDynamic}} } = store;

    if( !canEdit || !isDynamic ) {
      return null;
    }
    var href = LinkToPlaylist.url(head) + '/edit';

    return (<Link className="btn btn-success" href={href}><Glyph icon="edit" />{" edit query"}</Link>);
  }
}

function ShareURL(model) {
  if( global.IS_SERVER_REQUEST ) {
    return '#';
  }
  return  LinkToPlaylist.url(model,true);
}

function Curator(props) {
  var model = props.store.model.head;

  return(
      <div className="playlist-curator playlist-bg-color">
        <LinkToPeople model={model.curator} avatar suburl="playlists" />
      </div>
    );  
}

class Tags extends React.Component
{
  constructor() {
    super(...arguments);
  }

  render() {
    const { tags: {length}, permissions: {canEdit=false} = {} } = this.props.store;
    return (length || canEdit ?
            <div className="playlist-tags playlist-bg-color">
              <EditableTagsDiv store={this.props.store} delayCommit />
            </div> : null);
  }
}

function ActionButtonBar(props) {

  const { store, store:{model:{head}} } = props;

  return(
      <div className="action-btn-toolbar playlist-bg-color">
        <SharePopup     model={head} modelLink={ShareURL} med nosubmit />
        <Feature        store={store} />
        <EditQueryLink  store={store} />
        <DeletePlaylist store={store} />
      </div>
    );
}

class Description extends React.Component
{
  constructor() {
    super(...arguments);
  }

  render() {
    const { store } = this.props;
    const { description } = store.getProperties(['description']);
    const { permissions: {canEdit=false} = {} } = store;
    return (description.length || canEdit ?
            <div className="playlist-tags playlist-bg-color">
              {!description.length && canEdit ? <span>{" add a description "}</span> : ''}
              <BoundInlineFormattedTextEditor store={store} propName="description" htmlName="descriptionRaw" />
            </div> : null);
  }
}


class Info extends ModelTracker(React.Component)
{
  constructor() {
    super(...arguments);
  }

  render() {
    const { store } = this.state;

    return (
        <div className="playlist-info hidden-xs hidden-sm">
          <Description store={store} />
          <ActionButtonBar store={store} />
          <Curator store={store} />
          <Tags store={store} />
        </div>
      );

  }
}

module.exports = Info;

//