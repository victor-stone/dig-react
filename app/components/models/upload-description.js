import React             from 'react';
import { PlayButton }    from '../audio-player';
import CollapsingText    from '../vanilla/collapsing-text';
import Ribbon            from '../vanilla/ribbon';
import LinkToPeople      from '../services/link-to-people-route';
import PeopleAvatar      from './people-avatar';

class UploadDescription extends React.Component
{
  shouldComponentUpdate(nextProps) {
    return this.props.model.id !== nextProps.model.id;
  }

  render() {
    var model = this.props.model;

    return(
        <div className="tree-head">
          {model.edPick && <Ribbon className="edpick" text="ed\npick" />}
          <PeopleAvatar model={model.artist} />
          <h3>{model.name}</h3>
          <h4 className="clearfix"><LinkToPeople model={model.artist} /></h4>
          <CollapsingText html={model.descriptionHTML} />
          <div className="clearfix" />
          {this.props.children}
          {model.fileInfo && model.fileInfo.isMP3
            ? <PlayButton model={model} className="tree-play-button"/>
            : null
          }
        </div>
    );
  }
}


module.exports = UploadDescription;

//