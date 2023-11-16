// redux saga or redux thunk
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger';
import { productReducer } from './reducers/productReducer';
import { categoryReducer } from './reducers/categoryReducer';
import { userReducer } from './reducers/userReducer';
import { orderReducer } from './reducers/orderReducer';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { cartReducer } from './reducers/cartReducer';

const store = configureStore({
    reducer: combineReducers({
        productReducer,
        categoryReducer,
        userReducer,
        orderReducer,
        cartReducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, thunk),
    devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;