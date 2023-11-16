interface User {
    "_id": String;
    "name": String;
    "email": String,
    "phone": String,
    "address": String,
}

const userReducer = (
    state: { loading: boolean, users: User[] } = { loading: false, users: [] },
    action: { users: User[], user: User, type: string; }) => {
    switch (action.type) {
        case 'SHOW_LOADING': {
            return { ...state, loading: true }
        }
        case 'HIDE_LOADING': {
            return { ...state, loading: false }
        }
        case 'GET_USER': {
            return { ...state, loading: false, users: action.users }
        }
        default:
            return state;
    }
}

export {
    userReducer
};