import React from 'react';

import LinkToUpload from '../../services/LinkToUploadRoute';

const HOST = 'http://beta.ccmixter.org';

const artist = model => <span className="light-color">{model.artist.name}</span>;

const remix = (model,i) => <li key={i}><LinkToUpload host={HOST} model={model} /> {artist(model)}</li>;

class Remixes extends React.Component
{
  render() {

    const { remixes = [] } = this.props.model;

    return (
        <div>
          <h3 className="center-text">{"Remixes"}</h3>
          <ul className="remix-list">
            {remixes.length
              ? remixes.map(remix)
              : <li><span className="light-color">{"no remixes yet!"}</span></li>
            }
          </ul>
        </div>
      );
  }
}


module.exports = Remixes;

