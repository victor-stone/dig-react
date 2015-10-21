
module.exports = {

  default: {  
    limit: 10,
    digrank: '280',
    oneof: 'remix,extended_mix',
  },

  instrumental: {
    reqtags: 'instrumental,-vocals,-male_vocals,-female_vocals',
  },   

  recent: {
    digrank: '10000',
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