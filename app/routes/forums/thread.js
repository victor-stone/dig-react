import Forums     from '../../stores/forums';
import ThreadPage from '../../components/bound/thread-page';


const thread = Object.assign(ThreadPage,{

  path: '/thread/:thread',

  title: 'Thread',

  store(params) {
    return Forums.storeFromThread(params.thread)
              .then( store => {
                thread.title = store.model.head.name;
                return store;
              });
  },

  urlFromStore(store) {
    const { model:{head:id} } = store;
    return `/thread/${id}`;
  }
});


module.exports = thread;