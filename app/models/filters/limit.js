import makeQueryFilter  from '../query-filter-make';

const Limit = module.exports = makeQueryFilter({
  propName: 'limit',
  displayName: 'display',
});

Limit.MIN_LIMIT    = 10;

module.exports = Limit;