import Filter    from '../../models/filters/upload-type';
import Select    from '../properties/controls/Select';

class UploadTypeFilter extends Select
{
}

UploadTypeFilter.defaultProps = { property: Filter, options: Filter.options };

module.exports = UploadTypeFilter;

