interface Order {
    "_id": String;
    "products": [];
    "total": Number;
    "orderBy": []
}

const orderReducer = (
    state: { loading: boolean, orders: Order[] } = { loading: false, orders: [] },
    action: { orders: Order[], order: Order, type: string; }) => {
    switch (action.type) {
        case 'SHOW_LOADING': {
            return { ...state, loading: true }
        }
        case 'HIDE_LOADING': {
            return { ...state, loading: false }
        }
        case 'GET_ORDER': {
            return { ...state, loading: false, orders: action.orders }
        }
        default:
            return state;
    }
}

export {
    orderReducer
};