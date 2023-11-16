interface Category {
    "_id": String;
    "name": String;
}

const categoryReducer = (
    state: { loading: boolean, categories: Category[] } = { loading: false, categories: [] },
    action: { categories: Category[], category: Category, type: string; }) => {
    switch (action.type) {
        case 'SHOW_LOADING': {
            return { ...state, loading: true }
        }
        case 'HIDE_LOADING': {
            return { ...state, loading: false }
        }
        case 'GET_CATEGORY': {
            return { ...state, loading: false, categories: action.categories }
        }
        case 'CREATE_CATEGORY': {
            let listCategory = state.categories;
            if (action.category) {
                listCategory = [...listCategory, action.category]
            }
            return {
                ...state,
                // loading: false,
                categories: listCategory
            }
        }
        case "EDIT_CATEGORY": {
            let listCategory = state.categories;
            const newList: any = listCategory.map(el => {
                if ((el._id === action.category._id)) {
                    return action.category
                }
                return el
            })
            return {
                ...state,
                // loading: false,
                categories: newList
            }
        }
        case "DELETE_CATEGORY": {
            let listCategory = state.categories;
            const newList = listCategory.filter(el => (el._id !== action.category._id))
            return {
                ...state,
                // loading: false,
                categories: newList
            }
        }
        default:
            return state;
    }
}

export {
    categoryReducer
};