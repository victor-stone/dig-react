A word about this direcory:

This is the only place where React components should live (as of this writing
there are quite a few ill-placed comps in app/routes, that will be fixed at
some point)

	- lowercase directory names are logical groupings
	- CamelCase direcotry names represent React Components

Some of the logical groupings:

	- bound - components bound to stores
	- models - compponents that represent specialized UI visualizations of models
	- services -  components that interact with services
	- style - css stylesheets (depricated and will go away)
	- vanilla - generic React/JQuery/Bootstrap components

The rest of the directories are 'feature' groupings, e.g.

	- ccmixter (main app pages)
	- playlists
	- stems
	- dig (features specific to the dig app)

In a perfect world the following patterns are the goal:

	- 'vanilla' components NEVER reference any other directory in the entire framework
	- 'models' components ONLY reference 'vanilla' components 
	- 'bound' components ONLY reference 'models' and 'vanilla' (they should not reach into ../stores)
	- 'services' components do what they need to do to abstract the actual services

For an (somewhat extreme) example:

	The Alert component is a React wrapper for bootstrap alert CSS selectors. There is
	an 'Alert.js' in vanilla that is just that.

	However, in order to show an Alert in this framework you have to interact with the 'env' 
	service to trigger an event so the 'Alert' in services implements the static 'Alert.show()'
	method.