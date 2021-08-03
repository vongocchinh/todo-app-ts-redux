import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import Product from './../reducer/Product/Product';
// import { ThunkAction } from 'redux-thunk'
import Cart from './../reducer/Cart/Cart';
import { ActionThunk } from './Type.Action';
// import { AnyAction } from 'redux'
const store = configureStore({
    reducer: {
        Cart,
        Product,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: true
        })
            .prepend(
                // correctly typed middlewares can just be used
                // additionalMiddleware,
                // you can also type middlewares manually
                // untypedMiddleware as Middleware<
                //   (action: Action<'specialAction'>) => number,
                //   RootState
                // >
            )
    // prepend and concat calls can be chained
    //   .concat(logger)
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    // AnyAction
    ActionThunk
>




export default store;