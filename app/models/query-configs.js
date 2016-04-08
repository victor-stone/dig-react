
var MAGIC_SORT_DIGRANK = '280';

module.exports = {

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

};