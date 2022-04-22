import axios from 'axios';

export function getPokemons() {
    return function (dispatch) {
        axios.get('http://localhost:3001/pokemons')
        .then((json)=>
            dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        }))
    };
};

export function getTypes() {
    return function (distpach) {
        try {
            axios.get("http://localhost:3001/types")
            .then((allTypes)=> distpach({
                type: 'GET_TYPES',
                payload: allTypes.data
            }))
        } catch (error) {
            return (error)
        }
    }
}

export function postPokemon(payload) {
    return function () {
        axios.post('http://localhost:3001/pokemons', payload)
        .then((info)=>{
            return info
        })
    }
}

export function filterBySource(payload) {
    return {
        type: 'FILTER_BY_SOURCE',
        payload
    }
};

export function filterByTypes(payload) {
    return {
        type: 'FILTER_BY_TYPES',
        payload
    }
};

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
};

export function orderByStrength(payload) {
    return {
        type: "ORDER_BY_STRENGTH",
        payload,
    };
};

export function getPokemonName(payload) {
    return function (dispatch) {
        try {
            axios.get('http://localhost:3001/pokemons?name=' + payload)
            .then((json)=>{
            return dispatch({
                type: 'GET_POKEMON_NAME',
                payload: json.data
            })})
        } catch (err) {
            console.log(err)
            return dispatch({
                type: 'GET_POKEMON_NAME',
                payload: []
            })
        }
    }
}

export function getDetails(id){
    return function (dispatch) {
        try {
        axios.get('http://localhost:3001/pokemons/'+id)
        .then((pokemons)=>{
            return dispatch({
                type: 'GET_DETAILS',
                payload: pokemons.data[0],            
        });
    });
}catch(e){console.log(e)}
}}

export function resetDetails() {
    return ({
        type: 'RESET_DETAILS',
        
    })
}

