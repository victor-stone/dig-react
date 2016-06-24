import React         from 'react';
import Browse        from '../Browse';
import PageHeader    from '../../vanilla/PageHeader';

/*
  display a list playlists that have these tags
*/
function Tags(props) {
  return (        
    <div className="container-fluid playlist-tags-page">
      <PageHeader icon="tags" subTitle="tags" title={props.store.model.queryParams.tags} />
      <Browse store={props.store} />
    </div>
  );
}

module.exports = Tags;

//