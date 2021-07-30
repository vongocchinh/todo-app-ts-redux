import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { RootState } from '../store';
import validateUserModel from './../../Api/Api';
import * as API from './../../Api/Api';


export interface UserModel{
    id:string,
    name:string,
    price:number,
    des:string
}

export enum ValidationUser{
    Fulfilled,
    Pending,
    Reject
}


export enum ValidationDeleteUser{
    Fulfilled,
    Pending,
    Reject
}
interface InitialState{
    Users:UserModel[],
    validationUser?:ValidationUser,
    validationDeleteUser?:ValidationDeleteUser,
    messageError?:string
}


export const ADD_USER_ASYNC=createAsyncThunk(
    "Users/addUser",
    async(user:UserModel)=>{
        var result= await validateUserModel(user);

        return result;
    })


export const DELETE_USER_ASYNC=createAsyncThunk("Users/deleteUser",async (id:string)=>{
    var result=await API.validationDeleteUser(id);
    return result;
})



const data: UserModel[] =[
    {id:'1',name:"Samsung A20",price:1000,des:"Mới"},
]


const initialState:InitialState={
    Users:data,
    validationUser:undefined,
    messageError:undefined
}

const UserSlice=createSlice({
    name:"Users",
    initialState:initialState,
    reducers:{
        addUser:(state,action)=>{
            var user=action.payload;
            state.Users.push(user);
        },
        deleteUser:(state,action)=>{
            var index=state.Users.findIndex(v=>v.id===action.payload)
            state.Users.splice(index,1);
        },
        updateUser:(state,action)=>{

        },
        setValidationAddUser:(state,action)=>{
            state.validationUser=undefined;
        }
        ,setValidationDeleteUser:(state,action)=>{
            state.validationDeleteUser=undefined;
        }

    },
    extraReducers:builder=>{
        builder.addCase(ADD_USER_ASYNC.fulfilled,(state,action)=>{
            return {
                ...state,
                validationUser:ValidationUser.Fulfilled,
                messageError:undefined,
                Users:[...state.Users,action.payload]
            }
        });
        builder.addCase(ADD_USER_ASYNC.pending,(state,action)=>{
            return {
                ...state,
                validationUser:ValidationUser.Pending,
                messageError:undefined
            }
        });
        builder.addCase(ADD_USER_ASYNC.rejected,(state,action)=>{
            return {
                ...state,
                validationUser:ValidationUser.Reject,
                messageError:action.error.message
            }
        });
        builder.addCase(DELETE_USER_ASYNC.pending,(state,action)=>{
            return {
                ...state,
                validationDeleteUser:ValidationDeleteUser.Pending,
                messageError:undefined
            }
        });
        builder.addCase(DELETE_USER_ASYNC.fulfilled,(state,action)=>{
            var index=state.Users.findIndex(v=>v.id===action.payload);
            var Users=state.Users;
            if(index!==-1){
                Users.splice(index,1)
            }
            state.validationDeleteUser=ValidationDeleteUser.Fulfilled
            state.messageError=undefined
            state={
                ...state,
                Users
            }
        });
        
    }
});


export const {addUser,deleteUser,updateUser,setValidationAddUser,setValidationDeleteUser}=UserSlice.actions;

export default UserSlice.reducer;


export const GetALLDataUser=(state:RootState)=>state.User.Users;

export const GET_VALIDATION_USER=(state:RootState)=>state.User.validationUser;

export const GET_VALIDATION_DELETE_USER=(state:RootState)=>state.User.validationDeleteUser;