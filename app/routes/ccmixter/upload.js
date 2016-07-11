import Upload    from '../../stores/upload';
import RemixTree from '../../components/RemixTree';

const Tree = Object.assign(RemixTree,{

  path: '/files/:user/:id',

  title: 'Tree',

  store(params) {
    const { id, user} = params;
    return Upload.storeFromQuery(id,user,Upload.ALL).then( store =>
              { 
                  Tree.title = !store.error && store.model.upload.name;
                  return store;
              });
  },

  urlFromStore(store) {
    const { model:{artist,id} } = store;

    return `/files/${artist.id}/${id}`;
  }

});

module.exports = Tree;
