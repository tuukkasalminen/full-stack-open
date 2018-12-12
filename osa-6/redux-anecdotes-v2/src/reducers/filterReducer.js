const filterReducer = (store = '', action) => {
    switch(action.type) {
        case 'FILTER':
            return action.filter
        default:
            return store
    }
}

export const filter = (filter) => {
    return {
        type: 'FILTER',
        filter
    }
}

export default filterReducer