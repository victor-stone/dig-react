import Filter    from '../../models/filters/unmixed-only';
import Toggle    from './controls/Toggle';

class UnmixedOnlyFilter extends Toggle
{
}

UnmixedOnlyFilter.defaultProps = { filter: Filter, className: 'btn' };

module.exports = UnmixedOnlyFilter;