import Topics         from '../stores/Topics';
import BoundTopicPage from '../components/bound/TopicPage';


const news = BoundTopicPage;

news.path = '/news/:topic';

news.title = 'News';

news.store = function(params) {
  return Topics.storeFromTopicName(params.topic)
            .then( store => {
              news.title = store.model.name;
              return store;
            });
};

module.exports = news;