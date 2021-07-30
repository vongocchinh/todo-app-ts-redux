import {configureStore} from '@reduxjs/toolkit';
import Product from './../reducer/Product/Product';
import Cart from './../reducer/Cart/Cart';
const store=configureStore({
    reducer:{
        Cart,
        Product,
    }
})
export type RootState=ReturnType<typeof store.getState>

export type AppDispatch=typeof store.dispatch
export default store;