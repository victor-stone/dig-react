A word about this folder:

This is the only place where React components should live (as of this writing
there are still a couple ill-placed comps in app/routes, that is being 
corrected in real time) and only React components should live here.

	- **AudioPlayer** - the AudioPlay component (this should probably be under services)
	
	- **bound** - components that are store aware (most of these are actually only aware of specific properties and will be moved to **properties**
	- **filter** - UI widgets that manipulate filters (AKA query parameters)
	- **models** - these are model aware but store agnostic, IOW they know the shape of the object that comes out of a store (like a Thread from the Topics database)
	- **properties** - UI widgets that manipulate specific properties
	- **services** - components that interact with app wide services (like the router)
	- **stems** - the stems (AKA samples) browser
	- **style** - CSS related to components at this level
	- **vanilla** - wrappers for generic HTML, React, Bootstrap, JQuery doo dads 

These are app specific

  - **ccmixter** - components and pages specific to the ccmixter app
	- **dig** - likewise but with dig
	- **pells** - stuff specific to the pells browser
	- **playlists** - components and pages specific to the playlists section of ccmixter
	- **RemixTree** - pages related to the remix tree
	
All other files in this directory are artifacts and will be moved (soon-ish)

The architecture is migrating - initially every bound component was aware of either a store or a model. But it seems the vast majority of 'bound' components really only cared about one specific property. So most of the modules in the **bound** folder have and will mirgrate to **filters** and **properties**.

To that end all the components that deal with listing things (there are a lot of them) actually really care about the 'items[]' element in the 'model' property of the store. Therefore 'items' should be a Property (see ../models) and the components that list them treated as read-only displays.

Same goes for Paging which would see 'offset' (R/W) and 'total' (RO) as properties. (Limit has already been migrated).
