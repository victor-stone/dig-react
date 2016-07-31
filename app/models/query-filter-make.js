import QueryFilter from './query-filter';


function makeQueryFilter({ 
  propName, 
  propertyName = propName, 
  displayName  = propName, 
}) 
{

  const Class = class extends QueryFilter {
    constructor() {
      super({ displayName, propName });
    }
  };

  Class.propertyName = propertyName;

  return Class;
}

module.exports = makeQueryFilter;