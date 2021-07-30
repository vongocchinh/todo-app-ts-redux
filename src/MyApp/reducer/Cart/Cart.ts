import {createSlice} from '@reduxjs/toolkit'
import { nanoid } from 'nanoid';
import { RootState } from '../store';
import  { UserModel } from './../User/User';

interface CartModel extends UserModel{
    id_cart:string,
    amount:number
}
const data:CartModel[]=[];



const CartSlice=createSlice({
    name:"carts",
    initialState:data,
    reducers:{
        addCart:(state,action)=>{
            var index = state.findIndex(v=>v.id===action.payload.id);
            if(index===-1){
                var id:string=nanoid();
                state.push({...action.payload,amount:1,id_cart:id})
            }else{
                state[index].amount += 1;
            }
        },
        removeCart:(state,action)=>{
            var index = state.findIndex(v=>v.id===action.payload);
            if(index!==-1){
                state.splice(index,1);
            }
        }
    }
})


export const {addCart,removeCart}=CartSlice.actions;
export default CartSlice.reducer;

export const Get_AMOUNT_ALL=(state:RootState)=>{
    let tong:number=0;
    state.Cart.forEach(v=>{
        tong +=v.amount;
    })
    return tong;
}
export const GET_ALL_CART=(state:RootState)=>state.Cart;