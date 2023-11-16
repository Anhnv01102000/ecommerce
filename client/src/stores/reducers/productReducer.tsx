interface Product {
    "_id": String;
    "name": String;
}

const productReducer = (
    state: { loading: boolean, products: Product[] } = { loading: false, products: [] },
    action: { products: Product[], product: Product, type: string; }) => {
    switch (action.type) {
        case 'SHOW_LOADING': {
            return { ...state, loading: true }
        }
        case 'HIDE_LOADING': {
            return { ...state, loading: false }
        }
        case 'GET_PRODUCT': {
            return { ...state, loading: false, products: action.products }
        }
        case 'CREATE_PRODUCT': {
            let listProduct = state.products;
            if (action.product) {
                listProduct = [...listProduct, action.product]
            }
            return {
                ...state,
                // loading: false,
                products: listProduct
            }
        }
        case "EDIT_PRODUCT": {
            let listProduct = state.products;
            const newList: any = listProduct.map(el => {
                if ((el._id === action.product._id)) {
                    return action.product
                }
                return el
            })
            return {
                ...state,
                // loading: false,
                products: newList
            }
        }
        case "DELETE_PRODUCT": {
            let listProduct = state.products;
            const newList = listProduct.filter(el => (el._id !== action.product._id))
            return {
                ...state,
                // loading: false,
                products: newList
            }
        }
        default:
            return state;
    }
}

export {
    productReducer
};