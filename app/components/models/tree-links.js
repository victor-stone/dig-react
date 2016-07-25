import React          from 'react';
import Trackback      from './trackback';
import CollapsingList from '../vanilla/collapsing-list';
import LinkToUpload   from '../services/link-to-upload-route';

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