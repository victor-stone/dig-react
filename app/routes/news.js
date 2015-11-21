import React          from 'react';
import { TopicPage,
         TopicBody }  from '../components/Topic';
import Topics         from '../stores/topics';

function news(props) {
  return <TopicPage title={props.store.model.name}><TopicBody store={props.store} /></TopicPage>;
}

news.path = '/news/:topic';

news.title = 'News';

news.store = function(params/*,queryParams*/) {
  return Topics.storeFromTopicName(params.topic)
            .then( store => {
              news.title = store.model.name;
              return store;
            });
};

module.exports = news;