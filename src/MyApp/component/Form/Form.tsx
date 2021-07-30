import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react'
// import { addUser } from '../../reducer/User/User';
import { useAppDispatch } from './../../reducer/store.hooks';
import { ADD_Product_ASYNC,  Update_Product_ASYNC } from '../../reducer/Product/Product';

interface FormInterface{
data:ProductModel
}


 const Form:React.FC<FormInterface>=({data})=>{
    const [input, setInput] = useState({
        name:'',
        price:0,
        des:''
    })

    useEffect(() => {
        if(data.id){
            setInput({
                name:data.name,
                price:data.price,
                des:data.des
            })
        }
    }, [data])
    const dispatch=useAppDispatch();
    const onSubmit=(e:any)=>{
            e.preventDefault();
            if(data.id){
                var product={
                    id:data.id,
                    name:input.name,
                    price:input.price,
                    des:input.des
                }
                dispatch(Update_Product_ASYNC(product));
                setInput({
                    name:'',
                    price:0,
                    des:''
                })
                e.target.reset();
            }else{
                var id:string= nanoid();
            if(input.name){
                var products={
                    id:id,
                    name:input.name,
                    price:input.price,
                    des:input.des
                }
                dispatch(ADD_Product_ASYNC(products));
                setInput({
                    name:'',
                    price:0,
                    des:''
                })
                e.target.reset();
            }
            }
    }
    const clear=()=>{
        setInput({
            name:'',
            price:0,
            des:''
        })
    }
    const onchange=({target:{name,value}} : React.ChangeEvent<HTMLInputElement>)=>setInput(pre=>{
        (pre as any)[name]=value;
        const newUser={...pre};
        return newUser;
    })
    return (
        <div className="list">
            <form onSubmit={onSubmit}>
                <input defaultValue={input.name||""} required={true} name="name" placeholder="Name product" onChange={onchange} type="text" />
                <input defaultValue={input.price||""} required={true} name="price" placeholder="Price product" onChange={onchange} type="number" />
                <input defaultValue={input.des||""} required={true} name="des" placeholder="Des product" onChange={onchange} type="text" />
                <input value="save"  type="submit" />
                <input onClick={clear} value="clear"  type="reset" />
            </form>
        </div>
    )
}
export default Form;