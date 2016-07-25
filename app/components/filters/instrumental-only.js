import Filter      from '../../models/filters/instrumental-only';
import Toggle      from '../properties/controls/Toggle';

class InstrumentalOnlyFilter extends Toggle
{
}

InstrumentalOnlyFilter.defaultProps = { property: Filter, className: 'btn' };

module.exports = InstrumentalOnlyFilter;

