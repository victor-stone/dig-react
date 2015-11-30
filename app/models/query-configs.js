
var MAGIC_SORT_DIGRANK = '280';

module.exports = {

  remixes: {  
    limit:   10,
    digrank: MAGIC_SORT_DIGRANK,
    reqtags: 'remix',
    lic:     'all',
  },

  pells: {
    limit:   10,
    lic:     'all',
    reqtags: 'acappella',
    remixmax: 10000
  },
  
  samples: {
    limit: 10,
    oneof: 'sample,contest_source',
    lic: 'all'
  },
  
  pellsFeatured: {
    reqtags: 'acappella,featured',
  },

  pellsCount: {
    reqtags: 'acappella'
  },

  samplesCount: {
    oneof: 'sample,contest_source',
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
    tags: 'soundtrack,ambient,music_for_film',
    type: 'any'        
  },

};