import React         from 'react';
import Browse        from '../browse';
import PageHeader    from '../../vanilla/page-header';

/*
  display a list playlists that have these tags
*/
function Tags(props) {
  const { store } = props;
  return (        
    <div className="container-fluid playlist-tags-page">
      <PageHeader icon="tags" subTitle="tags" title={store.queryParams.tags} />
      <Browse store={store} />
    </div>
  );
}

module.exports = Tags;

//