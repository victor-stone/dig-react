import React from 'react';

import SharePopup      from '../../SharePopup';
import DownloadPopup   from '../../DownloadPopup';
import { PlayButton }  from '../../AudioPlayer';

class Actions extends React.Component
{
  render() {
    const { model } = this.props;

    return (
        <ul className="actions">
          <li>
            <PlayButton big fixed model={model} />
          </li>
          <li className="hidden-xs">
            <DownloadPopup big fixed model={model} />
          </li>
          <li>
            <SharePopup big fixed model={model} />
          </li>
        </ul>
      );
  }
}

module.exports = Actions;

