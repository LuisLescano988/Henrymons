const axios = require('axios');
const { Pokemon, Type } = require('../db');

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon')
    const first20 = apiUrl.data.results
    const apiUrl2 = await axios.get(apiUrl.data.next)
    const last20 = apiUrl2.data.results
    const allLinks = first20.map(e => e.url).concat(last20.map(e => e.url))
    const promises = allLinks.map(e => axios.get(e))
    const allData = Promise.all(promises)
        .then(resp => {
            let final = resp.map(p => {
                return {
                    id: p.data.id,
                    name: p.data.name.toUpperCase(),
                    hp: p.data.stats[0].base_stat,
                    image: p.data.sprites.front_default,
                    attack: p.data.stats[1].base_stat,
                    defense: p.data.stats[2].base_stat,
                    speed: p.data.stats[5].base_stat,
                    height: p.data.height,
                    weight: p.data.weight,
                    types: p.data.types.map(e => e.type.name),
                }
            })
            return final
        })
    return allData
}

const getDbInfo = async () => {
    try {
        return await Pokemon.findAll({ 
            include: {
                model: Type,
                attributes: ['name']
            }
        })
    } catch (error) {
        return error;
    }
}

const getAllInfo = async () => {
    const apiInfo = await getApiInfo(); 
    const dbInfo = await getDbInfo();
    const infoTotal = dbInfo.concat(apiInfo);
    return infoTotal; 
  };

module.exports = {
      getApiInfo,
      getDbInfo,
      getAllInfo
}