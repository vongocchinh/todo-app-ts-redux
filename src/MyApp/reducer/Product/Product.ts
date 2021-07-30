import {createSlice,createAsyncThunk,PayloadAction , createEntityAdapter} from '@reduxjs/toolkit'
import { RootState } from '../store';
import * as API from '../../Api/Api';


export interface ProductModel{
    id:string,
    name:string,
    price:number,
    des:string
}

export enum ValidationProduct{
    Fulfilled,
    Pending,
    Reject
}


export enum ValidationDeleteProduct{
    Fulfilled,
    Pending,
    Reject
}

export enum ValidationUpdateProduct{
    Fulfilled,
    Pending,
    Reject
}

// interface InitialState{
//     Products:ProductModel[],
//     validationProduct?:ValidationProduct,
//     validationDeleteProduct?:ValidationDeleteProduct,
//     validationUpdateProduct?:ValidationUpdateProduct,
//     messageError?:string
// }

interface InitialState{
    // Products:ProductModel[],
    validationProduct?:ValidationProduct,
    validationDeleteProduct?:ValidationDeleteProduct,
    validationUpdateProduct?:ValidationUpdateProduct,
    messageError?:string
}


export const ADD_Product_ASYNC=createAsyncThunk(
    "Products/addProduct",
    async(Product:ProductModel)=>{
        var result= await API.validateProductModel(Product);
        return result;
    })


export const DELETE_Product_ASYNC=createAsyncThunk("Products/deleteProduct",async (id:string)=>{
    var result=await API.validationDeleteProduct(id);
    return result;
})


export const Update_Product_ASYNC=createAsyncThunk('Products/updateProduct',async (product: ProductModel)=>{
    var result= await API.validationUpdate(product);
    return result;
})

const data: ProductModel[] =[
    {id:'1',name:"product 1",price:1000,des:"Mới"},
    {id:'2',name:"aroduct 1",price:1000,des:"Mới"}
]


// const initialState:InitialState={
//     Products:data,
//     validationProduct:undefined,
//     messageError:undefined
// }

const productAdapter=createEntityAdapter<ProductModel>(
    {
        selectId:state=>state.id,
        sortComparer:(a,b)=>a.name.localeCompare(b.name),
    }
);
const initialState =productAdapter.getInitialState<InitialState>({
    validationProduct:undefined,
    messageError:undefined
})

const initialStateData=productAdapter.upsertMany(initialState,data);

const ProductSlice=createSlice({
    name:"Products",
    initialState:initialStateData,
    reducers:{
        addProduct:(state,action: PayloadAction<ProductModel>)=>{
            // var Product=action.payload;
            // state.Products.push(Product);
            productAdapter.upsertOne(state,action.payload);
        },
        deleteProduct:(state,action)=>{
            // var index=state.Products.findIndex(v=>v.id===action.payload)
            // state.Products.splice(index,1);
            productAdapter.removeOne(state,action.payload);
        },

        updateProduct:(state,action:PayloadAction<ProductModel>)=>{
            console.log(action.payload);
            
        },
        setValidationAddProduct:(state,action)=>{
            state.validationProduct=undefined;
        }
        ,setValidationDeleteProduct:(state,action)=>{
            state.validationDeleteProduct=undefined;
        },
        setValidationUpdateProduct:(state,action)=>{
            state.validationUpdateProduct=undefined;
        },

    },
    extraReducers:builder=>{
        builder.addCase(ADD_Product_ASYNC.fulfilled,(state,action)=>{
            // return {
            //     ...state,
            //     validationProduct:ValidationProduct.Fulfilled,
            //     messageError:undefined,
            //     Products:[...state.Products,action.payload]
            // }
            productAdapter.upsertOne(state,action.payload);
            state.validationProduct=ValidationProduct.Fulfilled;
            state.messageError=undefined;
        });
        builder.addCase(ADD_Product_ASYNC.pending,(state,action)=>{
            return {
                ...state,
                validationProduct:ValidationProduct.Pending,
                messageError:undefined
            }
        });
        builder.addCase(ADD_Product_ASYNC.rejected,(state,action)=>{
            return {
                ...state,
                validationProduct:ValidationProduct.Reject,
                messageError:action.error.message
            }
        });
        builder.addCase(DELETE_Product_ASYNC.pending,(state,action)=>{
            return {
                ...state,
                validationDeleteProduct:ValidationDeleteProduct.Pending,
                messageError:undefined
            }
        });
        builder.addCase(DELETE_Product_ASYNC.fulfilled,(state,action)=>{
            // var index=state.Products.findIndex(v=>v.id===action.payload);
            // var Products=state.Products;
            // if(index!==-1){
            //     Products.splice(index,1)
            // }

            productAdapter.removeOne(state,action.payload);
            state.validationDeleteProduct=ValidationDeleteProduct.Fulfilled
            state.messageError=undefined
            // state={
            //     ...state,
            //     Products
            // }
        });
        builder.addCase(Update_Product_ASYNC.fulfilled,(state,action)=>{

            productAdapter.setOne(state,action.payload);
            state.messageError=undefined;
            state.validationUpdateProduct=ValidationUpdateProduct.Fulfilled
        });
    }
});


export const {addProduct,deleteProduct,updateProduct,setValidationAddProduct,setValidationDeleteProduct,setValidationUpdateProduct}=ProductSlice.actions;

export default ProductSlice.reducer ;

export const {
    selectAll:selectAllProduct,
    selectById:selectByProductID,
    selectIds:selectProductIds,
    selectEntities:selectProductEntities,
    selectTotal:selectProductTotal
}=productAdapter.getSelectors<RootState>(state=>state.Product);

// export const GetALLDataProduct=(state:RootState)=>state.Product.Product;

export const GetALLDataProduct=(state:RootState)=>state.Product.entities;

export const GET_VALIDATION_Product=(state:RootState)=>state.Product.validationProduct;

export const GET_VALIDATION_DELETE_Product=(state:RootState)=>state.Product.validationDeleteProduct;

export const GET_VALIDATION_UPDATE_PRODUCT=(state:RootState)=>state.Product.validationUpdateProduct;