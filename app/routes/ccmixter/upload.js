import Upload    from '../../stores/upload';
import RemixTree from '../../components/RemixTree';

const Tree =RemixTree;

Tree.path = '/files/:user/:id';

Tree.store = function(params/*,queryParams*/) {
  return Upload.storeFromQuery(params.id,params.user,Upload.ALL).then( store =>
            { 
                Tree.title = !store.error && store.model.upload.name;
                return store;
            });
};

module.exports = Tree;
