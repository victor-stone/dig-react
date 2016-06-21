import React         from 'react';
import ExternalLink  from '../vanilla/ExternalLink';
import LinkToPeople  from '../services/LinkToPeopleRoute';

function Header(props)
{
  var model = props.model;

  var homelink = model.homepage && <ExternalLink className="btn btn-info" href={model.homepage} text="homepage" />;

  return (
      <div className="page-header">
        <h1 className="center-text"><img className="img-circle" src={model.avatarURL} /> {model.name}</h1>
        <div className="center-text">
          <LinkToPeople className="btn btn-info" thumb model={model} /> {homelink}
        </div>
      </div>
    );
}

module.exports = Header;

