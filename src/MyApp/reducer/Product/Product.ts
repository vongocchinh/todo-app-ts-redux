import { createSlice,  PayloadAction, createEntityAdapter } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../store';

import {ProductModel,InitialState,ValidationDeleteProduct,ValidationProduct,ValidationUpdateProduct} from './type.product';


import {ADD_Product_ASYNC,DELETE_Product_ASYNC,GET_DATA_PRODUCT_ASYNC,Update_Product_ASYNC} from './action.product'




const data: ProductModel[] = [
]

const productAdapter = createEntityAdapter<ProductModel>(
    {
        selectId: state => state._id,
        sortComparer: (a, b) => a.name.localeCompare(b.name),
    }
);
const initialState = productAdapter.getInitialState<InitialState>({
    validationProduct: undefined,
    messageError: undefined,
    validationDeleteProduct: undefined,
    validationUpdateProduct: undefined
})

const initialStateData = productAdapter.upsertMany(initialState, data);

const ProductSlice = createSlice({
    name: "Products",
    initialState: initialStateData,
    reducers: {
        addProduct: (state, action: PayloadAction<ProductModel>) => {
            // var Product=action.payload;
            // state.Products.push(Product);
            productAdapter.upsertOne(state, action.payload);
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            // var index=state.Products.findIndex(v=>v.id===action.payload)
            // state.Products.splice(index,1);
            productAdapter.removeOne(state, action.payload);
        },

        updateProduct: (state, action: PayloadAction<ProductModel>) => {
            // console.log(action.payload);
        },
        setValidationAddProduct: (state, action) => {
            state.validationProduct = undefined;
        }
        , setValidationDeleteProduct: (state, action) => {
            state.validationDeleteProduct = undefined;
        },
        setValidationUpdateProduct: (state, action) => {
            state.validationUpdateProduct = undefined;
        },
        countSizeProduct: (state, action: PayloadAction<number[]>) => {
        },
        countSizeProductNumber: (state, action: PayloadAction<number>) => {
        },
        updateProductThunk: (state, action: PayloadAction<ProductModel>) => {
            productAdapter.upsertOne(state, action.payload)
        },
        GET_DATA_PRODUCT_ASYNC:(state,action:PayloadAction<ProductModel[]>)=>{
            productAdapter.upsertMany(state,action.payload);
        }

    },
    extraReducers: builder => {
        builder.addCase(ADD_Product_ASYNC.fulfilled, (state, action : PayloadAction<ProductModel> ) => {
            state.validationProduct = ValidationProduct.Fulfilled;
            state.messageError = undefined;
            productAdapter.addOne(state,action.payload);
        });
        builder.addCase(ADD_Product_ASYNC.pending, (state, action) => {
            return {
                ...state,
                validationProduct: ValidationProduct.Pending,
                messageError: undefined
            }
        });
        builder.addCase(ADD_Product_ASYNC.rejected, (state, action) => {
            return {
                ...state,
                validationProduct: ValidationProduct.Reject,
                messageError: action.error.message
            }
        });
        builder.addCase(DELETE_Product_ASYNC.pending, (state, action) => {
            return {
                ...state,
                validationDeleteProduct: ValidationDeleteProduct.Pending,
                messageError: undefined
            }
        });
        builder.addCase(DELETE_Product_ASYNC.fulfilled, (state, action : PayloadAction<string> ) => {
            // var index=state.Products.findIndex(v=>v.id===action.payload);
            // var Products=state.Products;
            // if(index!==-1){
            //     Products.splice(index,1)
            // }
            productAdapter.removeOne(state, action.payload);
            state.validationDeleteProduct = ValidationDeleteProduct.Fulfilled
            state.messageError = undefined
            // state={
            //     ...state,
            //     Products
            // }
        });
        builder.addCase(Update_Product_ASYNC.fulfilled, (state, action) => {

            productAdapter.setOne(state, action.payload);
            state.messageError = undefined;
            state.validationUpdateProduct = ValidationUpdateProduct.Fulfilled
        });
        builder.addCase(GET_DATA_PRODUCT_ASYNC.fulfilled,(state,action: PayloadAction<ProductModel[]>)=>{
            productAdapter.upsertMany(state,action.payload);
        })
    }
});


export const { updateProductThunk, countSizeProductNumber, countSizeProduct, addProduct, deleteProduct, updateProduct, setValidationAddProduct, setValidationDeleteProduct, setValidationUpdateProduct } = ProductSlice.actions;

export default ProductSlice.reducer;

export const {
    selectAll: selectAllProduct,
    selectById: selectByProductID,
    selectIds: selectProductIds,
    selectEntities: selectProductEntities,
    selectTotal: selectProductTotal
} = productAdapter.getSelectors<RootState>(state => state.Product);

// export const GetALLDataProduct=(state:RootState)=>state.Product.Product;

export const GetALLDataProduct = (state: RootState) => state.Product.entities;

export const GET_VALIDATION_Product = (state: RootState) => state.Product.validationProduct;

export const GET_VALIDATION_DELETE_Product = (state: RootState) => state.Product.validationDeleteProduct;

export const GET_VALIDATION_UPDATE_PRODUCT = (state: RootState) => state.Product.validationUpdateProduct;


export interface ObjectCount {
    count: number
}

export const CountAction = (count: ObjectCount): AppThunk => (dispatch, getState) => {
    const sizeProduct = (selectByProductID(getState(), '1'));
    if (sizeProduct) {
    }
};

export const CountActionNumber = (count: number): AppThunk => (dispatch, getState) => {
    dispatch(countSizeProductNumber(count));
};

// as myData