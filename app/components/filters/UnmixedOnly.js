import Filter    from '../../models/filters/unmixed-only';
import Toggle    from '../properties/controls/Toggle';

class UnmixedOnlyFilter extends Toggle
{
}

UnmixedOnlyFilter.defaultProps = { property: Filter, className: 'btn' };

module.exports = UnmixedOnlyFilter;