import { createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../Api/Api';
import { ProductModelAdd } from './type.product';
export const ADD_Product_ASYNC = createAsyncThunk(

    "Products/addProduct",
    async (Product: ProductModelAdd) => {
        var result = await API.validateProductModelAdd(Product);
        return result as ProductModel;
    })


export const DELETE_Product_ASYNC = createAsyncThunk("Products/deleteProduct", async (_id: string) => {
    var result = await API.validationDeleteProduct(_id);
    // console.log(result);
    return result as string;
})


export const Update_Product_ASYNC = createAsyncThunk('Products/updateProduct', async (product: ProductModel) => {
    var result = await API.validationUpdate(product);
    return result as ProductModel;
})


export const GET_DATA_PRODUCT_ASYNC=createAsyncThunk("Products/getProduct",async ()=>{
    var result=await API.GET_PRODUCT();
    return result as ProductModel[];
})
