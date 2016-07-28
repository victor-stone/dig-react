import React     from 'react';
import Select    from '../properties/controls/select';
import Filter    from '../../models/filters/license';

import Glyph     from '../vanilla/glyph';
import Link      from '../services/link-to-route';

function LicenseInfoPopup() {
  return <Link href="/licenses" className="lic-help"><Glyph icon="question-circle" /></Link>;
}

class LicenseFilter extends React.Component
{
  constructor() {
    super(...arguments);
    this.options = Object.assign({},Filter.options);
    const { ccPlusFilter } = this.props;
    if( ccPlusFilter ) {
      this.options[ccPlusFilter] = this.options.ccplus;
      delete this.options.ccplus;
    }
  }
  
  render() {
    const { store, id } = this.props;

    return <div><Select store={store} id={id} Property={Filter} options={this.options} /><LicenseInfoPopup /></div>;
  }
}

LicenseFilter.defaultProps = { id: 'lic' };

module.exports = LicenseFilter;