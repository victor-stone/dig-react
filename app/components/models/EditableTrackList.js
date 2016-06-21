  /* globals $ */
import React           from 'react';
import Tracklist       from './Tracklist';
import StaticTrackList from './StaticTrackList';
import EditControls    from '../vanilla/EditControls';

/*
  Present a tracklist that is optionally editable including sorting

  Props
    model   := object from [stores/upload] assumes model.items[]
    canEdit := boolean true mean show edit controls and allow for editing

  sourced events
    onDelete(model)  - user clicked on 'delete' button
    onPlay(model)    - user clicked on 'play' button 
    onSort(sortkeys) - user is done sorting tracks   
*/
class EditableTracks extends React.Component
{
  constructor() {
    super(...arguments);
    ['onDone','onEditState'].forEach( f => this[f] = this[f].bind(this) );
  }

  onDone() {
    var sortkeys = $('#fo').sortable( 'serialize' );
    this.props.onSort(sortkeys);
    this.setState({editing:false});
  }

  onEditState(editing) {
    this.setState({editing});
  }

  render() {
    var model       = this.props.model;
    var canEdit     = this.props.canEdit;

    return (
      <div className="tracks-widget">
        {canEdit && <EditControls.ButtonGroup onDone={this.onDone} onEditState={this.onEditState} />}
        {this.state.editing 
          ? <StaticTrackList model={model} sortable id="tracks" />
          : <Tracklist model={model} editing={canEdit} onDelete={this.props.onDelete} onPlay={this.props.onPlay}/>
        }
      </div>
    );
  }
}

module.exports = EditableTracks;

//