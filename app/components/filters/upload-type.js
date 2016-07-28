import Filter    from '../../models/filters/upload-type';
import Select    from '../properties/controls/select';

class UploadTypeFilter extends Select
{
}

UploadTypeFilter.defaultProps = { 
  Property: Filter, 
  options: Filter.options 
};

module.exports = UploadTypeFilter;

