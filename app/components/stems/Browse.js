import React        from 'react';
import Listing      from './Listing';
import QueryOptions from './QueryOptions';
import Tags         from './Tags';
import InlineCSS    from '../../components/vanilla/InlineCSS';
import css1         from '../../components/stems/style/browse';
import css2         from '../../components/stems/style/listing';


function Stems(props) {
    var store = props.store;

    return (
      <div className="stems-browser content-fluid">
        <InlineCSS css={css1+css2} id="stems-css" />
        <div className="row stems-browser-widget">
          <div  className="col-md-3">
            <Tags store={store} />
          </div>
          <div className="col-md-6 stems-listing-widget">
            <Listing   store={store} />   
          </div>
          <div className="col-md-2 stems-fixed-column">
            <QueryOptions store={store} />
          </div>
        </div>
      </div>
    );
}

/*
class Stems extends React.Component
{
  render() {
    const model = this.props.store.model;
    const sample= model.items[0];
    return <h2>{sample.name}</h2>;
  }
}
*/
module.exports = Stems;

