import {createSlice} from '@reduxjs/toolkit'
import { nanoid } from 'nanoid';
import { RootState } from '../store';
import { CartModel } from './type.cart';





const data:CartModel[]=[];



const CartSlice=createSlice({
    name:"carts",
    initialState:data,
    reducers:{
        addCart:(state,action)=>{
            var index = state.findIndex(v=>v._id===action.payload._id);
            if(index===-1){
                var id:string=nanoid();
                state.push({...action.payload,amount:1,id_cart:id})
            }else{
                state[index].amount += 1;
            }
        },
        removeCartID:(state,action)=>{
            var index = state.findIndex(v=>v._id===action.payload);
            if(index!==-1){
                state.splice(index,1);
            }
        }
    }
})


export const {addCart,removeCartID}=CartSlice.actions;
export default CartSlice.reducer;

export const Get_AMOUNT_ALL=(state:RootState)=>{
    let tong:number=0;
    state.Cart.forEach(v=>{
        tong +=v.amount;
    })
    return tong;
}
export const GET_ALL_CART=(state:RootState)=>state.Cart;