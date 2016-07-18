### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| app/routes/credits.js | 11 | Get this the hell out of /routes
| app/stores/collection.js | 129 | don't assume this behavoir and have a policy flag
| app/stores/collection.js | 224 | investigate generalizing cachedFetch
| app/stores/collection.js | 319 | this and all mention of 'reqtags' need to be factored out of here
| app/stores/playlist.js | 54 | make this a property
| app/stores/playlist.js | 100 | make this a property
| app/stores/playlist.js | 231 | this should return a Playlist store (no?)
| app/stores/upload.js | 124 | check if artist is really needed!
| app/unicorns/index.js | 5 | break TagString into separate npm module
| app/unicorns/index.js | 6 | move browser scripts somewhere else
| app/components/AudioPlayer/WavImage.js | 35 | export full xml+svg and put in <img> tag
| app/components/bound/InputField.js | 24 | should implement shouldComponentUppdate
| app/components/bound/ReqTagsNavTabs.js | 28 | replace all oassign with Object.assign
| app/components/bound/Tags.js | 256 | tag cats should be navtabs, not just stacked on top of each other
| app/components/models/EditableTrackList.js | 8 | All these lists that are model.items[] should just be model[]
| app/components/models/StaticTrackList.js | 5 | allow multiple of these on a page
| app/components/models/Tags.js | 466 | reconcile this with floating checks above
| app/components/services/LinkToPeopleRoute.js | 79 | this belongs somewhere else
| app/components/services/PlayAllButton.js | 9 | this is too Playlist aware
| app/components/services/PlayAllButton.js | 44 | check this code
| app/components/stems/Detail.js | 35 | these tags used to be filtered by genre/instrument
| app/components/stems/Tags.js | 10 | use real defines here
| app/components/vanilla/Accordion.js | 65 | #accordion should be property.id
| app/components/vanilla/Paging.js | 5 | don't assume that ?offset= is the proper URL formation
| app/components/vanilla/PagingLimit.js | 3 | don't assume 10, 20, 40, etc.
| app/routes/playlists/curators.js | 18 | this is too much code for here
| app/routes/playlists/search.js | 1 | this page is broken
| app/services/ccmixter/user.js | 11 | convert all the this._currentUser magic to a 'Set'
| app/stores/tools/totals-cache.js | 12 | investigate if this should include 't' and 'template'

### FIXMEs
| Filename | line # | FIXME
|:------|:------:|:------
| app/stores/playlist.js | 88 | all remote property settings need to be done elsewhere
| app/stores/userfeed.js | 68 | this is not the right user of defaultParams
| app/components/bound/EditableTitle.js | 6 | Edit controls styles on EditableTitle are wacky
| app/components/playlists/Info.js | 18 | feature button is ugly
| app/components/models/ZIPFile.js | 3 | incoming tags are not being highlighted
| app/components/services/PlayAllButton.js | 51 | this assuming this is cleared out somewhere