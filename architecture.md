#Architecture 

<img src="http://dig.ccmixter.org/images/ccmixter.png" />

## Terms

- **upload** a record in ccMixter's upload database. Could be a remix record, sample or a cappella
- **file** a specific file in a record. Could be an mp3, zip, flac
- **store** a component responsible for calling the Query API and retrieve data from ccMixter
- **upload-list** a type of store that specializes in collections of upload records
- **playlist** an upload-list that specializes in remixes (At some point the term 'playlist' is going to be replaced with 'remixes' and 'playlist' will mean an actual playlist from ccMixter)
- **queryParam** this should always mean a parameter to a URI, specifically targeting the Query API
- **filter** one or more queryParams that are presented to the user as a means of filtering the a collection of upload records
- **component** (or **view**) a React component. Pretty most of the time a component will have a store associated with it.

## Routing states
The router supports 2 types of transitions. 
- A *hard* transition is a total route change that resets all state across the board. 
- A *soft* transition occurs when the user wants to filter or paginate the current view (assuming the current view's store supports soft transitions).


1. New route (route is not the current route)
  1. Load the routes store with query params
  2. Emit 'navigate-to' event
2. Watch store for query option change event
  1. Get query string from store
  2. If string? update browser bar
  3. No string? get path from component, update browser bar
3. Browser back/forward navigation
  1. new route? go to 1.i
  2. current route?
    1. grab query from browser history
    2. push into store


##Upload-List Stores Spec
The base upload-list store is used for displaying and interacting with remixes, samples and pells.

### Initialization
Stores are associated with components but are initialized *before* their companion UI components 
so that the models can be passed into the component on mounting. This makes it possible to 
render the page whole on the server in one render pass.

The store is initialized with the query params and a hash of default properties. The query params, 
if any, are applied to the default params to perform the Query API call.

### Apply filters
New queries params can be pushed into the store as a way of notifying the store the user wants a 
different view on the data. 

The upload-list supports 2 types of pushes:
- A *hard* push will reset all the state in the store's model (below).
- A *soft* push will only update the state related to which uploads are displaying.

A push will trigger `OPTIONS_CHANGED` event which will allow UI components that display 
filters to update and the router to update the browser bar.

A Query API fetch will be made during the push. When the model comes back the store
will trigger a `MODEL_UPDATED` event allowing components to update their state and
redraw.

### Tags

An upload-list store has a (dynamic) property called `tags` that can manage tags. This
property is a an instance of the `Tag` store at `stores/tags` path.

The tags store can be used to fetch *all* the tags availabe in the system. This is used
to diplay lists of checkboxes and other UI tag selection mechanisms.

Once the user has selected tags the component can invoke methods on the tag store like
`store.tags.addSelected` or `store.tags.clearSelected` which, in turn, will trigger 
hard push of the Query API `tags=` parameter into the main upload-list store. This will
result in a `TAGS_CHANGED` event from the main store.

### Reponding to model updates

In response to model update events the receiver (components) can inspect the `model`
parameter in the store

```javascript
store.model = {
  items: [],             // array of uploads - .length should be the same as limit= parameter
  total: Number(),       // total number records that matches the original query
  queryParams: {},       // the query params used to create this model
  artist: {},            // the full artist record if the query had a u= parameter
  totals: {              // (if requested): a hash with the totals for each type of pell
     featured: Number(), // the actual keys are based on the reqtags into the query
     rap: Number(),
     spoken_word: Number(),
     melody: Number()
     },
};
```


- Initialize from query/defaults
- Push options into store  
  - types of pushes
    - Filterable options
    - Pagination
    - Soft query
    - Clear params
  - trigger an option change event
  - return query promise
    - .then( trigger 'new model' event)
- Add/remove/clear tags
  - some kind of relationship with tags store goes here 
- Search string
  - (no query options here)
- Static list (e.g. Now Playing)
- Get QueryString

## Options wrappers
Options wrappers watch for 
- License
- Sort
- Limit
- Pagination (offset)
- BPM
- Unmixed (pells)
- Search
- Clear 


