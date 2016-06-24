import React            from 'react';
import { PlayButton }   from '../AudioPlayer';
import LinkToUpload     from '../services/LinkToUploadRoute';
import LinkToPeople     from '../services/LinkToPeopleRoute';
import UploadInfoButton from '../models/UploadInfoButton';

class TreeGalleryElement extends React.Component
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
      <li className="gallery-element" >
        <div className="content-wrapper" onClick={this.onClick} >
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

module.exports = TreeGalleryElement;

//
