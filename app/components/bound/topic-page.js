import React          from 'react';
import TopicPage      from '../vanilla/topic-page';
import Topic          from '../models/topic';


function BoundTopicPage(props) {
  return <TopicPage title={props.store.model.name}><Topic model={props.store.model} /></TopicPage>;
}
module.exports = BoundTopicPage;