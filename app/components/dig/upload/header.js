import React from 'react';

import LinkToPeople from '../../services/LinkToPeopleRoute';
import Featuring    from './Featuring';

class UploadHeader extends React.Component
{
  render() {
    const { artist, featuring } = this.props.model;
    return (
      <div>
        <LinkToPeople model={artist} avatar />
        <Featuring featuring={featuring} />
      </div>
      );
  }
}

module.exports = UploadHeader;

