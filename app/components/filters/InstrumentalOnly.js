import Filter      from '../../models/filters/instrumental-only';
import Toggle      from './controls/Toggle';

class InstrumentalOnlyFilter extends Toggle
{
}

InstrumentalOnlyFilter.defaultProps = { filter: Filter, className: 'btn btn-info' };

module.exports = InstrumentalOnlyFilter;

