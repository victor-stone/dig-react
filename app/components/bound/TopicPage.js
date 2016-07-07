import React          from 'react';
import TopicPage      from '../vanilla/TopicPage';
import Topic          from '../models/Topic';


function BoundTopicPage(props) {
  return <TopicPage title={props.store.model.name}><Topic store={props.store.model} /></TopicPage>;
}
module.exports = BoundTopicPage;