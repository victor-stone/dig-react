import Filter    from '../../models/properties/is-featured';
import Toggle    from './controls/toggle';

class IsFeaturedToggle extends Toggle
{
}

IsFeaturedToggle.defaultProps = { property: Filter, className: 'btn' };

module.exports = IsFeaturedToggle;