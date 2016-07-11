import Topics         from '../stores/topics';
import BoundTopicPage from '../components/bound/TopicPage';


const news = Object.assign(BoundTopicPage,{

  path: '/news/:topic',

  title: 'News',

  store(params) {
    return Topics.storeFromTopicName(params.topic)
              .then( store => {
                news.title = store.model.name;
                return store;
              });
  },

  urlFromStore(store) {
    return '/news/' + store.model.id;
  }

});


module.exports = news;