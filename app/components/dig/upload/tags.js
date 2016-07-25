import React from 'react';

import Link  from '../../services/link-to-route';

const cls = 'btn-exp btn-tag light-on-hover';

const url = '/tags/';

const tag = t => <Link key={t} href={url + t} className={cls} text={t} />;

class UploadTags extends React.Component
{
  render() {
    return <div>{this.props.tags.map(tag)}</div>;
  }
}

module.exports = UploadTags;

