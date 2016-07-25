import React          from 'react';
import Trackback      from './Trackback';
import CollapsingList from '../vanilla/CollapsingList';
import LinkToUpload   from '../services/LinkToUploadRoute';

function Link(props) {
  const { model, model: {id, artist:{id:artistId}} } = props;
  return <LinkToUpload model={model} key={'fl_' + id}>{' '} <span className="tree-link-artist">{artistId}</span></LinkToUpload>;
}

class TreelinkList extends CollapsingList
{
  listElement(model,key) {
    return (<li key={key}>{
              'embedBinding' in model
                ? <Trackback model={model} key={'tb_' + model.id}/>
                : <Link model={model} key={'fl_' + model.id} />
              }</li>);
  }
}

function TreeLinks(props)
{
  return (
      <div className="panel panel-warning" id={props.id}>
        <div className="panel-heading">
          <h3 className="panel-title">{props.title}</h3>
        </div>
        <div className="panel-body">
          <TreelinkList model={props.model} />
        </div>
      </div>
    );
}

module.exports = TreeLinks;


//