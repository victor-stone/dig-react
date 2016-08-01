import querystring            from 'querystring';
import { quickLoop }          from 'unicorns';

/*
    This class operates on the properties of a store derived from QueryFilter.

    When ClassName.propertyName is the same as instance.name (internally this._propName)
    then the filter is considered to be the 'owner' of the parameter. 

    When they are different the filter can be thought of as 'virtual'. 
*/
class QueryParameters
{
  constructor({ 
      store,
      filterFactory
    }) 
  {
    this._store     = store;
    this._factory   = filterFactory;
  }

  /*
    injest a hash of query parameters
  */
  deserialize( hash ) {

    const store = this._store;

    store.isFilterEventsDisabled = true;
    quickLoop( Object.keys(hash), propName => this.setFilterValue( propName, hash[propName] ) );
    store.isFilterEventsDisabled = false;

    return this;
  }

  /*
    emit a hash of query parameters 
  */
  serialize() {
    return this._getHash();
  }

  /*
    emit a hash of 'display' values
  */
  hash() {

    // The current values for the set of query params is a calcuated
    // value. Therefore the values in just the native filters can not be relied
    // upon. e.g. the 'tags' native filter's does not necessarily reflect the
    // the current value in the 'instrumentOnly' virtual filter.

    // Step 1. get the current native hash
    //
    const hash = this._getHash();

    // Step 3. isolate the native filters (their propName is the same as their map index name)
    //
    const nativeFilters = this._store.queryFilters.filter( ([n,f]) => n === f.name );

    // Step 4: fetch the display value property (not deserialized()) 
    //
    quickLoop( nativeFilters, ([n,f]) => hash[n] = f.value );

    return hash;
  }


  /*
      emit a query string "foo=bar&etc=fee"
  */
  queryString({ hideIfDefaults = [], alwaysHide = [] }) {

    let { queryFilters:filters } = this._store;

    alwaysHide && (filters = filters.filter( ([n]) => !alwaysHide.contains(n) ));

    const hash = this._serializeValues({ filters, hideIfDefaults });

    return querystring.stringify(hash);

  }

  /*
      set the native value of a query parameter
  */
  setFilterValue( propName, value ) {
    const store = this._store;
    store.hasProperty( propName ) 
      ? store.getProperty( propName ).deserialize( value )
      : store.addProperty( this._factory.makeFilter( propName ), value );
  }

  _getHash() {
    return this._serializeValues({ filters: this._store.queryFilters });
  }

  _serializeValues({ filters, hideIfDefaults }) {

    const hash = {};

    const virutalFilters = [];

    const ql = quickLoop; // cache the lookp of the func

    // We can't get the final version of the query param values
    // until we are sure we have the native versions first

    ql( filters, ([propName,filter]) => {

      const { name } = filter;

      if( propName === name ) {

        const nativeValue = filter.serialize();
        
        if( nativeValue ) {
          const hideIfDefault = hideIfDefaults && hideIfDefaults.contains(name);
          (!hideIfDefault || filter.isDirty) && (hash[name] = nativeValue);
        }

      } else {

        virutalFilters.push(filter);

      }
    });

    ql( virutalFilters, f => {
        const value = f.serialize(hash[f.name]);
        value && (hash[f.name] = value);
      });

    return hash;    
  }

}

module.exports = QueryParameters;
