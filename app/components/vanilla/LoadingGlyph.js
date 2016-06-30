import React       from 'react';
import Glyph       from './Glyph';

class LoadingGlyph extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = { loading: this.props.loading };
  }

  componentWillReceiveProps(nextProps) {
    this.setState( { loading: nextProps.loading } );
  }

  shouldCompnentUpdate(nextProps) {
    return this.state.loading !== nextProps.loading;
  }

  render() {
    const { color = 'white' } = this.props;
    const { loading } = this.state;

    if( !loading ) {
      return null;
    }

    var style = { color };

    return( <Glyph style={style} {...this.props} icon="spinner" pulse /> );
  }  
}

module.exports = LoadingGlyph;