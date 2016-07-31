import FilterFactory from '../lib/filter-factory';
import Filters       from '../../models/filters';

const ccMixterFilterFactory = new FilterFactory( { 
                                    filters: Filters,
                                    alwaysHide: [ 'reqtags', 'f', 't', 'template', 'dataview', 'datasource' ],
                                    hideOnDefault: [ 'limit', 'lic', 'digrank', 'type' ]
                                  });

module.exports = ccMixterFilterFactory;
