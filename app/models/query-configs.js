
var MAGIC_SORT_DIGRANK = '280';

module.exports = {

  default: {  
    limit:   10,
    digrank: MAGIC_SORT_DIGRANK,
    reqtags: 'remix',
  },

  pells: {
    limit:    10,
    lic:     'all',
    offset:  0,
    reqtags: 'acappella',
    filter:  'featured'
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
    tags:  'loops,techno',
    oneof: 'experimental,dubstep,electronica',
    type:  'any'  
  },

  film: {
    tags: 'soundtrack,ambient,music_for_film',
    type: 'any'        
  },

};