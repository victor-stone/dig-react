
import React from 'react';
import { PageHeader, PanelSlider } from '../components';
import env        from '../services/env';

env.assert(PanelSlider,`no PanelSlider`);

var Tree = React.createClass({

  render() {
    return  ( 
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <PageHeader title="experiment" icon="tree" />
          <PanelSlider.SliderRow /> 
        </div>
      </div>
    );
  },

});

module.exports = Tree;
