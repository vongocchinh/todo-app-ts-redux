import {configureStore} from '@reduxjs/toolkit';
import User from './../reducer/User/User';
import Cart from './../reducer/Cart/Cart';
const store=configureStore({
    reducer:{
        Cart,
        User,
    }
})
export type RootState=ReturnType<typeof store.getState>

export type AppDispatch=typeof store.dispatch
export default store;