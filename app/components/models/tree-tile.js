import React            from 'react';
import { PlayButton }   from '../audio-player';
import LinkToUpload     from '../services/link-to-upload-route';
import LinkToPeople     from '../services/link-to-people-route';
import UploadInfoButton from '../models/upload-info-button';

class TreeTile extends React.Component
{
  constructor() {
    super(...arguments);
    this.onClick = this.onClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.model.id !== nextProps.model.id;
  }

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    LinkToUpload.navigateTo(this.props.model);
  }

  render() {
    const { model, skipUser = false, onPlay } = this.props; 
    const { artist, fileInfo: { isMP3 = false } = {} } = model;
    return(
      <li className="tile" >
        <div className="tile-wrapper" onClick={this.onClick} >
          <LinkToUpload model={model} truncate /> 
          <div className="tools">
            <UploadInfoButton model={model} />
            {isMP3
              ? <PlayButton btnType="warning" className="play-button" model={model} onPlay={onPlay}/> 
              : null
            }            
          </div>
        </div>
        <LinkToPeople model={artist} skipUser={skipUser} />
      </li>
      );
  }
}

module.exports = TreeTile;

//
