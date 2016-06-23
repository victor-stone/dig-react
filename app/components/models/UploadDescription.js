import React             from 'react';
import { PlayButton }    from '../AudioPlayer';
import CollapsingText    from '../vanilla/CollapsingText';
import Ribbon            from '../vanilla/Ribbon';
import LinkToPeople      from '../services/LinkToPeopleRoute';
import PeopleAvatar      from './PeopleAvatar';

class UploadDescription extends React.Component
{
  shouldComponentUpdate(nextProps,nextState) {
    return this.props.model.id !== nextState.props.model.id;
  }

  render() {
    var model = this.props.model;

    return(
        <div className="tree-head">
          {model.edPick && <Ribbon className="edpick" text="\ned\npick\n" />}
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