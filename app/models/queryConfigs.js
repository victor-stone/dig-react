
var MAGIC_SORT_DIGRANK = '280';

module.exports = {

  default: {  
    limit: 10,
    digrank: MAGIC_SORT_DIGRANK,
    oneof: 'remix,extended_mix',
  },

  pells: {
    limit: 10,
    reqtags: 'acappella',
  },
  
  instrumental: {
    reqtags: 'instrumental,-vocals,-male_vocals,-female_vocals',
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
    tags: 'loops,techno',
    oneof: 'experimental,dubstep,electronica',
    reqtags: 'remix',
    type: 'any'  
  },

  film: {
    tags: 'soundtrack,ambient,music_for_film',
    type: 'any'        
  },

};