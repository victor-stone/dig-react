import Forums     from '../../stores/forums';
import ThreadPage from '../../components/bound/ThreadPage';


const thread = ThreadPage;

thread.path = '/thread/:thread';

thread.title = 'Thread';

thread.store = function(params) {
  return Forums.storeFromThread(params.thread)
            .then( store => {
              thread.title = store.model.head.name;
              return store;
            });
};

module.exports = thread;