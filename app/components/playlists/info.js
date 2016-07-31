import React      from 'react';
import SharePopup from '../share-popup';
import Glyph      from '../vanilla/glyph';

import Link               from '../services/link-to-route';
import LinkToPeople       from '../services/link-to-people-route';
import LinkToPlaylist     from '../services/link-to-playlist-route';

import DeletePlaylist          from './delete-playlist';
import { ModelTracker }        from '../../mixins';

import Description from '../properties/description';
import Tags        from '../properties/tags';
import IsFeatured  from '../properties/is-featured';

function InfoPanel(props) {
  const cls = 'playlist-bg-color ' + (props.className || '');
  return <div className={cls}>{props.children}</div>;
}

class Feature extends React.Component
{
  render() {
    const { store:{permissions:{canFeature}} } = this.props;
    return canFeature && <IsFeatured store={this.props.store} className="btn btn-success" />;
  }
}

// you can't return null from a stateless component
class EditQueryLink extends React.Component
{
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

  return <LinkToPeople model={model.curator} avatar suburl="playlists" />;
}

function ActionButtonBar(props) {

  const { store, store:{model:{head}} } = props;

  return(
      <InfoPanel className="action-btn-toolbar">
        <SharePopup     model={head} modelLink={ShareURL} med nosubmit />
        <Feature        store={store} />
        <EditQueryLink  store={store} />
        <DeletePlaylist store={store} />
      </InfoPanel>
    );
}

class Info extends ModelTracker(React.Component)
{
  render() {
    const { store, store:{isDynamic} } = this.state;

    return (
        <div className="playlist-info hidden-xs hidden-sm">
          <InfoPanel className="playlist-description" ><Description noTitle store={store} /></InfoPanel>
          <ActionButtonBar store={store} />
          <InfoPanel className="playlist-curator "><Curator store={store} /></InfoPanel>
          <InfoPanel><Tags store={store} delayCommit={!isDynamic} static noTitle canEdit={!isDynamic} /></InfoPanel>
        </div>
      );

  }
}

module.exports = Info;

//