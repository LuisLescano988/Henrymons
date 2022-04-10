const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    details: {},
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload                
            };

        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            };

        case 'FILTER_BY_SOURCE':
            const allPokemons = state.allPokemons;
            const filterSource = action.payload === 'Created'
                ? allPokemons.filter(el => el.createdInDb)
                : allPokemons.filter(el => !el.createdInDb)
            return {
                ...state,
                pokemons: action.payload === 'All' 
                ? state.allPokemons : filterSource
            };

        case 'FILTER_BY_TYPES':
            const filterTypes = state.allPokemons;
            const type = action.payload === "All"
                ? filterTypes.filter((pokemon) => pokemon.types.length > 0)
                : filterTypes.filter(
                    (pokemon) =>
                        pokemon.types &&
                        pokemon.types
                            .map((types) => types.name?types.name:types)
                            .includes(action.payload)
                );
            return {
                ...state,
                pokemons: type,
            };

        case 'ORDER_BY_NAME':
            let sortedArray = action.payload === 'asc' ?
                state.pokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                state.pokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                pokemons: sortedArray
            };

        case "ORDER_BY_STRENGTH":
            let orderByStrength =
                action.payload === "higher-strength"
                    ? state.pokemons.sort((a, b) => {
                        return b.attack - a.attack;
                    })
                    : state.pokemons.sort((a, b) => {
                        return a.attack - b.attack;
                    });
            return {
                ...state,
                pokemons: orderByStrength,
            };
            
        case 'GET_POKEMON_NAME':
            return {
                ...state,
                pokemons: action.payload
            };

        case 'GET_DETAILS':
            return {
                ...state,
                details: action.payload
            };

        case 'CLEAN_DETAILS':
            return {
                ...state,
                details: {}
            }
        // case 'SHOW_WEIGHT':
        //     let pokeAll = state.pokemons;
        //     pokeAll.sort((a, b) => {
        //         return a.weight - b.weight;
        //         });
        //     let arrSlice = pokeAll.slice(0, 4)
        //     console.log('pokeAll', arrSlice)
        // return {
        //     ...state,
        //     pokemons: arrSlice
        // }
        default:
            return state;
    };
};

export default rootReducer;