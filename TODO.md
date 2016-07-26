### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| app/routes/credits.js | 11 | Get this the hell out of /routes
| app/stores/collection.js | 133 | don't assume this behavoir and have a policy flag
| app/stores/collection.js | 233 | investigate generalizing cachedFetch
| app/stores/collection.js | 328 | this and all mention of 'reqtags' need to be factored out of here
| app/stores/playlist.js | 44 | this should return a Playlist store (no?)
| app/stores/playlist.js | 76 | investigate if tags setter/getter are called anymore
| app/stores/playlist.js | 90 | make this a property
| app/stores/playlist.js | 136 | (-ish) all remote property settings need to be done elsewhere
| app/stores/upload.js | 131 | check if artist is really needed!
| app/unicorns/index.js | 5 | break TagString into separate npm module
| app/unicorns/index.js | 6 | move browser scripts somewhere else
| app/components/audio-player/wav-image.js | 35 | export full xml+svg and put in <img> tag
| app/components/bound/req-tags-nav-tabs.js | 28 | replace all oassign with Object.assign
| app/components/bound/tags.js | 267 | tag cats should be navtabs, not just stacked on top of each other
| app/components/models/tags.js | 466 | reconcile this with floating checks above
| app/components/models/track-list-sorting.js | 7 | allow multiple of these on a page
| app/components/playlists/track-list.js | 32 | this can't possible be the best way to do this
| app/components/services/link-to-people-route.js | 79 | this belongs somewhere else
| app/components/services/play-all-button.js | 9 | this is too Playlist aware
| app/components/services/play-all-button.js | 44 | check this code
| app/components/stems/detail.js | 35 | these tags used to be filtered by genre/instrument
| app/components/stems/tags.js | 10 | use real defines here
| app/components/vanilla/accordion.js | 65 | #accordion should be property.id
| app/components/vanilla/collapsing-text.js | 70 | doesn't this hurt SEO??
| app/components/vanilla/paging-limit.js | 3 | don't assume 10, 20, 40, etc.
| app/components/vanilla/paging.js | 5 | don't assume that ?offset= is the proper URL formation
| app/routes/playlists/curators.js | 18 | this is too much code for here
| app/routes/playlists/search.js | 1 | this page is broken
| app/services/ccmixter/user.js | 11 | convert all the this._currentUser magic to a 'Set'
| app/stores/tools/totals-cache.js | 12 | investigate if this should include 't' and 'template'

### FIXMEs
| Filename | line # | FIXME
|:------|:------:|:------
| app/stores/userfeed.js | 68 | this is not the right user of defaultParams
| app/components/models/zip-file.js | 3 | incoming tags are not being highlighted
| app/components/services/play-all-button.js | 51 | this assuming this is cleared out somewhere