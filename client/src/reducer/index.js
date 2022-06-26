

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: []
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }

        case 'GET_NAME_POKEMONS':
            return {
                ...state,
                pokemons: action.payload
            }

        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }

        case 'POST_CHARACTER':
            return {
                ...state
            }

        case 'FILTER_BY_TYPE': 
            const allPokemons = state.allPokemons;
            const statusFiltered = action.payload === 'all' ? allPokemons : allPokemons.filter(el => el.status === action.payload)
            return {
                ...state,
                pokemons: statusFiltered
            }

        case 'FILTER_BY_ORIGIN':
            const allPokes = state.allPokemons;
            const originCreated = action.payload === 'cre' ? allPokes.filter(e => e.createdInDB) : allPokes.filter(e => !e.createdInDB)
            return {
                ...state,
                pokemons: action.payload === 'all' ? allPokes : originCreated
            }

        case 'ORDER_BY_NAME': 
            let sortedArr = action.payload === 'asc' ? 
                    state.pokemons.sort((a, b) => {
                        if (a.name > b.name) return 1;
                        if (b.name > a.name) return -1;
                        return 0;
                    }) :
                    state.pokemons.sort((a, b) => {
                        if (b.name > a.name) return 1;
                        if (a.name > b.name) return -1;
                        return 0
                    })
            return {
                ...state,
                pokemons: sortedArr
            }

        case 'ORDER_BY_STRENGTH': 
            let sortedArray = action.payload === 'high' ?
                state.pokemons.sort((a, b) => {
                    return b.attack - a.attack
                })
                : state.pokemons.sort((a, b) => {
                    return a.attack - b.attack
                })
            return {
                ...state,
                pokemons: sortedArray
            }

        default: return state;
    }
}

export default rootReducer;