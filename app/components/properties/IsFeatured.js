import Filter    from '../../models/properties/is-featured';
import Toggle    from './controls/Toggle';

class IsFeaturedToggle extends Toggle
{
}

IsFeaturedToggle.defaultProps = { property: Filter, className: 'btn' };

module.exports = IsFeaturedToggle;