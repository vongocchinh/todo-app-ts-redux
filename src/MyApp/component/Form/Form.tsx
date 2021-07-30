import { nanoid } from 'nanoid';
import React, { useState } from 'react'
// import { addUser } from '../../reducer/User/User';
import { useAppDispatch } from './../../reducer/store.hooks';
import { ADD_USER_ASYNC } from './../../reducer/User/User';

interface FormInterface{

}


 const Form:React.FC<FormInterface>=(props)=>{
    const [input, setInput] = useState({
        name:'',
        price:0,
        des:''
    })
    const dispatch=useAppDispatch();
    const onSubmit=(e:any)=>{
            e.preventDefault();
            var id:string= nanoid();
            if(input.name){
                var user={
                    id:id,
                    name:input.name,
                    price:input.price,
                    des:input.des
                }
                dispatch(ADD_USER_ASYNC(user));
                setInput({
                    name:'',
                    price:0,
                    des:''
                })
                e.target.reset();
            }
            
    }

    const onchange=({target:{name,value}} : React.ChangeEvent<HTMLInputElement>)=>setInput(pre=>{
        (pre as any)[name]=value;
        const newUser={...pre};
        return newUser;
    })
    return (
        <div className="list">
            <form onSubmit={onSubmit}>
                <input required={true} name="name" placeholder="Name product" onChange={onchange} type="text" />
                <input required={true} name="price" placeholder="Price product" onChange={onchange} type="number" />
                <input required={true} name="des" placeholder="Des product" onChange={onchange} type="text" />
                <input value="save"  type="submit" />
            </form>
        </div>
    )
}
export default Form;