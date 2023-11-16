// store/reducers/cartReducer.js
const initialState = {
    cartItems: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_CART_ITEMS':
            return { ...state, cartItems: action.cart };
        default:
            return state;
    }
};

export {
    cartReducer
} 
