import Filter    from '../../models/filters/sort';
import Select    from '../properties/controls/Select';

class SortFilter extends Select
{
}

SortFilter.defaultProps = { property: Filter, options: Filter.options, id: 'sort' };

module.exports = SortFilter;
