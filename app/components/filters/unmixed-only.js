import Filter    from '../../models/filters/unmixed-only';
import Toggle    from '../properties/controls/toggle';

class UnmixedOnlyToggle extends Toggle
{
}

UnmixedOnlyToggle.defaultProps = { 
  Property: Filter, 
  className: 'btn' 
};

module.exports = UnmixedOnlyToggle;