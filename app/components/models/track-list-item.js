import React              from 'react';
import LinkToUpload       from '../services/link-to-upload-route';
import LinkToPeople       from '../services/link-to-people-route';
import { PlayButton }     from '../audio-player';
import DeleteButton       from '../vanilla/delete-button';
import { bindAll }        from 'unicorns';


/*
  Display an Upload reacord as a list item <li>

  props
    model     - object   from [stores/uploads].model.items[]
    editing   - boolean  true means display editing controls 
    skipUser  - boolean  true means do NOT dispay artist link

  sourced events
    onDelete(model)  - user clicked on 'delete' button
    onPlay(model)    - user clicked on 'play' button 
*/
class TrackListItem extends React.Component
{
  constructor() {
    super(...arguments);
    bindAll( this, 'onDelete', 'onPlay' );
  }

  onDelete() {
    this.props.onDelete( this.props.model );
  }

  onPlay() {
    this.props.onPlay( this.props.model );
  }

  render() {
    
    const { model, editing, skipUser } = this.props;

    return (
        <li className="tracklist-item">
          {editing && <DeleteButton model={model} onDelete={this.onDelete} />}
          <PlayButton className="play-button" model={model} onPlay={this.onPlay} />
          <LinkToUpload className="track-name" model={model} />
          <LinkToPeople className="track-artist" model={model.artist} skipUser={skipUser} />
        </li>
      );

  }
}

module.exports = TrackListItem;

//