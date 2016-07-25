import React          from 'react';
import Topics         from '../stores/topics';
import BoundTopicPage from '../components/bound/topic-page';

function topicpage(props) {
  if( props.store.error ) {
    return <h1 className="well">{"can't find that page!"}</h1>;
  }
  return <BoundTopicPage {...props} />;
}

Object.assign(topicpage,BoundTopicPage,{

  path: '/:pagename',

  title: 'Page',

  store(params) {
    return Topics.storeFromPage(params.pagename)
              .then( store => {
                topicpage.title = store.model.name;
                return store;
              });
  },

  urlFromStore(store) {
    return '/' + store.model.queryParams.type;
  }

});


module.exports = topicpage;