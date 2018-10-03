// Initializes state to 0
const testReducer = ( state = 0, action ) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        case 'ZERO':
            return 0
    }
    return state
}

export default testReducer