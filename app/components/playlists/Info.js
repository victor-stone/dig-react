import React      from 'react';
import People     from '../People';
import SharePopup from '../SharePopup';
import Glyph      from '../vanilla/Glyph';
import Link       from '../services/LinkToRoute';

import Toggle                  from '../bound/Toggle';
import FormattedText           from '../bound/FormattedTextEditor';
import DeletePlaylist          from './DeletePlaylist';
import { CurrentUserTracker }  from '../../mixins';
import { EditableTagsDiv }     from '../TagEditor';

class Feature extends CurrentUserTracker.extender(React.Component)
{
  constructor() {
    super(...arguments);
  }

  render() {
    return this.state.user.idAdmin && <Toggle propName="isFeatured" text="Featured" />;
  }
}

function EditQueryLink(props) {
    if( !props.store.permissions.canEdit ) {
      return null;
    }

    var head  = props.store.model.head;
    var isDyn = head.isDynamic;
    var href  = '/playlist/browse/' + head.id + '/edit';

    return isDyn && <Link className="btn btn-success" href={href}><Glyph icon="edit" />{" edit query"}</Link>;
}

function ShareLink(model) {
  if( global.IS_SERVER_REQUEST ) {
    return '#';
  }
  return  `http://${document.location.href.replace(document.location.pathname,'')}/playlist/browse/${model.id}`;
}

function Curator(props) {
  var model = props.store.model.head;

  return(
      <div className="playlist-curator playlist-bg-color">
        <People.Link model={model.curator} avatar suburl="playlists" />
      </div>
    );  
}

function Tags(props) {
  return (props.store.tags.length || props.store.permissions.canEdit ?
          <div className="playlist-tags playlist-bg-color">
            <EditableTagsDiv store={this.props.store} delayCommit />
          </div> : null);
}


function ActionButtonBar(props) {
  var store = props.store;
  var model = props.store.model.head;

  return(
      <div className="action-btn-toolbar playlist-bg-color">
        <SharePopup     model={model} modelLink={ShareLink} med />
        <Feature        store={store} />
        <EditQueryLink  store={store} />
        <DeletePlaylist store={store} />
      </div>
    );
}

function Description(props) {
  return( <FormattedText store={props.store} propName="description" htmlName="descriptionRaw" />);
}

function Info(props) {

  var store = props.store;

  return (
      <div className="playlist-info hidden-xs hidden-sm">
        <Description store={store} />
        <ActionButtonBar store={store} />
        <Curator store={store} />
        <Tags store={store} />
      </div>
    );
}

module.exports = Info;

//