import React from 'react';

import TrackbackPopup   from './TrackbackPopup';
import ExternalLink     from '../vanilla/ExternalLink';


function Trackback(props) {
  var tb = props.model;
  var cls = props.className || '';
  return( 
    <li className={cls}>
      <div>
        {tb.embed 
            ? (<TrackbackPopup trackback={tb} />)
            : (<ExternalLink href={tb.url} subname={tb.type} text={tb.name} />)
        }
        {' '}<span className="light-color">{tb.artist.name}</span>
      </div>
    </li>
  );
}

module.exports = Trackback;

