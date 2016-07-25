import React         from 'react';
import ExternalLink  from '../vanilla/external-link';
import LinkToPeople  from '../services/link-to-people-route';

function Header(props)
{
  const { model, host = null } = props;
  const { homepage, avatarURL, name } = model;

  const homelink = homepage && <ExternalLink className="btn btn-info" href={homepage} text="homepage" />;

  return (
      <div className="page-header">
        <h1 className="center-text"><img className="img-circle" src={avatarURL} /> {name}</h1>
        {!global.IS_SERVER_REQUEST &&
          <div className="center-text">
            <LinkToPeople host={host} className="btn btn-info" thumb model={model} /> {homelink}
          </div>
        }
      </div>
    );
}

module.exports = Header;

