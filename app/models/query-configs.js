
var MAGIC_SORT_DIGRANK = '280';

const stdAlwaysHide = [ 'f', 'format', 't', 'template', 'datasource', 'dataview' ]; 

const stdHideIfDefault = [ 'lic', 'digrank', 'type', 'limit' ];

module.exports = {

  visibility: {
    remixes: {
      alwaysHide: stdAlwaysHide,
      hideIfDefaults: [ 'reqtags', ...stdHideIfDefault ]
    },
    stems: {
      alwaysHide: stdAlwaysHide,
      hideIfDefaults: [ 'reqtags', ...stdHideIfDefault ]
    },
    people: {
      alwaysHide: stdAlwaysHide,
      hideIfDefaults: stdHideIfDefault
    },
    search: {
      alwaysHide: stdAlwaysHide,
      hideIfDefaults: [ 'search_type', ...stdHideIfDefault ]
    },
    tags: {
      alwaysHide: stdAlwaysHide,
      hideIfDefaults: stdHideIfDefault
    },
    pells: {
      alwaysHide: stdAlwaysHide,
      hideIfDefaults: [ 'reqtags', 'remixmax', ...stdHideIfDefault ]
    },
    browsePlaylists: {
      alwaysHide: [  'minitems', 'dynamic', ...stdAlwaysHide ],
      hideIfDefaults: [ 'limit']
    },
    curator: {
      alwaysHide: [ 'user', 'minitems', 'dynamic', ...stdAlwaysHide ],
      hideIfDefaults: [ 'limit' ]
    },
    featuredPlaylists: {
      alwaysHide: [ 'type', 'minitems', ...stdAlwaysHide ],
    },
    featuredInPlaylists: {
      alwaysHide: [ 'user', ...stdAlwaysHide ],
      hideIfDefaults: stdHideIfDefault
    },
    userfeed: {
      alwaysHide: [ 'user', 'following', ...stdAlwaysHide ],
      hideIfDefaults: [ 'limit ']
    }
  },

  remixes: {  
    limit:   '40',
    digrank: MAGIC_SORT_DIGRANK,
    reqtags: 'remix',
    lic:     'all',
  },

  people: {
    limit: '40',
    digrank: -1,
    lic: 'all'
  },

  pells: {
    limit:   10,
    lic:     'all',
    reqtags: 'acappella,-autoplay'
  },
  
  samples: {
    limit: 10,
    reqtags: 'sample,-autoplay',
    lic: 'all'
  },
  
  pellsFeatured: {
    reqtags: 'acappella,featured,-autoplay',
  },

  pellsCount: {
    reqtags: 'acappella'
  },

  samplesCount: {
    oneof: 'sample,contest_source',
  },
  
  playlistTracks: {
    dataview: 'playlist_line',
    sort: 'num_playlists',
    ord:  'desc',
    tags: '-bumper,-site_promo',
    limit: 10,
  },

  browsePlaylists: {
    minitems: 4,  // at least 4 items
    dynamic: 1,   // or dynamic
    limit: 10
  },

  instrumental: {
    reqtags: 'instrumental,-vocals,-male_vocals,-female_vocals',
  },   

  latest: {
    digrank: '-1',
  },

  recent: {
    digrank: '10000',
  }, 

  alltime: {
    digrank: '1',
  },

  magicSort: {
    digrank: MAGIC_SORT_DIGRANK,
  },

  games: {
    tags: '-blues,chill,experimental,dubstep,electronica,minimalist,electro,8_bit,atmospheric,soundscape,psychedelic,psybient,weirdbient,illbient,glitch,techno,loops',
    type:  'any'  
  },

  film: {
    tags: 'soundtrack,ambient,music_for_film,music_for_video,dig_the_soundtrack',
    type: 'any'        
  },

  userfeed: {
    dataview: 'userfeed',
    datasource: 'feed',
    limit: 40
  }

};