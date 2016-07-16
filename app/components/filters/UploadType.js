import Filter    from '../../models/filters/upload-type';
import Select    from './controls/Select';

class UploadTypeFilter extends Select
{
}

UploadTypeFilter.defaultProps = { filter: Filter, options: Filter.options };

module.exports = UploadTypeFilter;

