import React             from 'react';
import CollapsingText    from '../CollapsingText';
import { ModelTracker }  from '../../mixins';
import Link              from '../Link';
import { PlayButton }    from '../AudioPlayer';
import UploadMenu        from './UploadMenu';

var DescriptionText = React.createClass({

  mixins: [ModelTracker],

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.html !== nextState.html;
  },

  stateFromStore(store) {
    var model = store.model.upload;
    return { html: model.descriptionHTML };
  },

  render() {
    return (<CollapsingText html={this.state.html} />);
  }

});

var Description = React.createClass({
  mixins: [ModelTracker],

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.store.model.upload.id !== nextState.store.model.upload.id;
  },

  stateFromStore(store) {
    return { store };
  },

  render() {
    var model = this.state.store.model.upload;

    return(
        <div className="tree-head">
          {model.edPick
            ? <span className="ribbon orange edpick">{"\ned\npick\n"}</span>
            : null
          }
          <img className="img-circle" src={model.artist.avatarURL} /> 
          <h3>{model.name}</h3>
          <h4 className="clearfix"><Link className="artist" href={'/people/'+model.artist.id}>{model.artist.name}</Link></h4>
          <DescriptionText store={this.state.store} />
          <div className="clearfix" />
          <UploadMenu store={this.state.store} />
          {model.fileInfo && model.fileInfo.isMP3
            ? <PlayButton model={model} className="tree-play-button"/>
            : null
          }
        </div>
    );
  }
});


module.exports = Description;

//