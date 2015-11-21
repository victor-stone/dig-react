import React          from 'react';
import { TopicPage }  from '../components/Topic';
import Topics         from '../stores/topics';


function news(props) {
  return <TopicPage store={props.store} />;
}

news.path = '/news/:topic';

news.title = 'News';

news.store = function(params/*,queryParams*/) {
  return Topics.storeFromTopicName(params.topic)
            .then( store => {
              news.title = store.model.title;
              return store;
            });
};

module.exports = news;