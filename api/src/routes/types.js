const router = require('express').Router();
const { Type } = require('../db');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');


// router.get('/', async (req, res, next) => {
//     try {
//         const {data} = await axios.get("https://pokeapi.co/api/v2/type")  // 
//     const typesPoke = data.results.map(t => t)
//     typesPoke.forEach(i => {
//         Type.findOrCreate({
//             where: {
//                 name: i.name,
//                 id: uuidv4()
//             }
//         })
//     })
//     const allTypes = await Type.findAll();

//     return res.status(200).send(allTypes)
//     } catch(err) {
//         next(err);
//     }

// })
router.get('/', async (req, res) => {
    try {
        let typesApi = await axios.get('https://pokeapi.co/api/v2/type');
        let types = typesApi.data.results.map(p => p.name);
        //console.log('ALL TYPES: ', types);
        types.forEach(t => {
            Type.findOrCreate({
                where: { name: t }
            })
        })
        let allTypes = await Type.findAll();
        res.status(200).send(allTypes);
    } catch (e) {
        console.log(e)
    }
});

module.exports = router; 