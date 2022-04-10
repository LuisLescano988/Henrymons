const axios = require('axios');
const { Pokemon, Type } = require('../db');
 



const getApiInfo = async () => {
    // try {
    //     let arrPokemons = [];
    //     let pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40");// me traigo 20 pokemons
    //     let dataPokemons = pokemons.data.results.map(p => axios.get(p.url));// aca lo pasa a promesa porque hay otra URL 
    //     let results = await Promise.all(dataPokemons).then(response=> {
    //         response.map(p => {
    //             arrPokemons.push({
    //                 id: p.data.id.toString(),
    //                 name: p.data.name,
    //                 hp: p.data.stats[0].base_stat,
    //                 attack: p.data.stats[1].base_stat,
    //                 defense: p.data.stats[2].base_stat,
    //                 speed: p.data.stats[5].base_stat,
    //                 height: p.data.height,
    //                 weight: p.data.weight,
    //                 types: p.data.types.map(el => el.type.name),
    //                 image: p.data.sprites.front_default                    
    //             })
    //         })
    //         return arrPokemons; // array de objetos con los detalles de pokemones
    //     })

    //     return results;// ver de sacarlo

    // } catch (error) {
    //     return error;
    // }

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
        return await Pokemon.findAll({ // traeme todo lo que tengas en el modelo Pokemon e incluime el nombre del tipo del modelo type
            include: {
                model: Type,
                attributes: ['name']
            }
        })
    } catch (error) {
        return error;
    }
}

// const getDbInfo = async () => {
//     const dbinfo = await Pokemon.findAll({
//         include: {
//             model: Type,
//             attributes: ['name']

//         }
//     })
//     const dbpoke = dbinfo.map(e => {
//         return {
//             ...e.dataValues,
//             types: e.types.map(el => el.name)
//         }
//     })
//     return dbpoke
// }

const getAllInfo = async () => {
    const apiInfo = await getApiInfo(); 
    const dbInfo = await getDbInfo();
    const infoTotal = dbInfo.concat(apiInfo);
    //console.log('infoTotal:', infoTotal);
    return infoTotal; 
  };


module.exports = {
      getApiInfo,
      getDbInfo,
      getAllInfo
}