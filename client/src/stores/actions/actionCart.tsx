import { AppDispatch } from ".."

const updateCartItems = (cartItems) => async (dispatch: AppDispatch) => {
    dispatch({
        type: 'UPDATE_CART_ITEMS',
        cart: cartItems,
    })
}

const getCartItemsFromLocalStorage = () => async (dispatch: AppDispatch) => {
    const cartLocalStorage = localStorage.getItem('listCart')
    if (cartLocalStorage !== null) {
        const cartItemsFromLocalStorage = JSON.parse(cartLocalStorage)
        dispatch({
            type: 'UPDATE_CART_ITEMS',
            cart: cartItemsFromLocalStorage,
        })
    }
}

export {
    updateCartItems,
    getCartItemsFromLocalStorage
}
