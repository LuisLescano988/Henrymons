const router = require('express').Router();
const { Type } = require('../db');
const axios = require('axios');




router.get('/', async (req, res) => {
    try {
        let typesApi = await axios.get('https://pokeapi.co/api/v2/type');
        let types = typesApi.data.results.map(p => p.name);        
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