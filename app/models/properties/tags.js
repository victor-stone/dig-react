
import Filter from '../filters/tags';

// So it turns out the tags query-filter 
// can double as a regular property

// It's up to the store to interpret
// the onValue notification.

// The Collection store will treat 
// it like a query param ?tags=

// The upload/playlist stores will 
// treat it like a property on the
// underlying record and RPC to the
// server to set the value

module.export = Filter;