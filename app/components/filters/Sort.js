import Filter    from '../../models/filters/sort';
import Select    from './controls/Select';

class SortFilter extends Select
{
}

SortFilter.defaultProps = { filter: Filter, options: Filter.options, id: 'sort' };

module.exports = SortFilter;
