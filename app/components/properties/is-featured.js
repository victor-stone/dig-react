import Filter    from '../../models/properties/is-featured';
import Toggle    from './controls/toggle';

class IsFeaturedToggle extends Toggle
{
}

IsFeaturedToggle.defaultProps = { 
  Property: Filter, 
  className: 'btn' 
};

module.exports = IsFeaturedToggle;