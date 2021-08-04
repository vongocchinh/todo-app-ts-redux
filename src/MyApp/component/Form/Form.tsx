// import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react'
// import { addUser } from '../../reducer/User/User';
import { useAppDispatch } from './../../reducer/store.hooks';
import { ADD_Product_ASYNC,  Update_Product_ASYNC } from '../../reducer/Product/action.product';

interface FormInterface{
data:ProductModel,
}


 const Form:React.FC<FormInterface>=({data})=>{
    const [input, setInput] = useState({
        name:'',
        price:0,
        description:'',
        brand:'',
        images:{},
        sale:0
    })
    const [img, setImg] = useState<any>();
    useEffect(() => {
        if(data._id){
            setInput({
                name:data.name,
                price:Number(data.price),
                description:data.description,
                brand:data.brand,
                images:data.images,
                sale:Number(data.sale)
            })
            setImg(data.images);
        }
    }, [data])
    const dispatch=useAppDispatch();
    const onSubmit=(e:any)=>{
            e.preventDefault();
            if(data._id){
                var product:ProductModel={
                    _id:data._id,
                    name:input.name,
                    price:Number(input.price),
                    description:input.description,
                    brand:input.brand,
                    images:img,
                    sale:Number(input.sale)
                }
                dispatch(Update_Product_ASYNC(product));
                setInput({
                    name:'',
                    price:0,
                    description:'',
                    brand:'',
                    images:'',
                    sale:0
                })
                e.target.reset();
            }else{
            if(input.name){
                var products:ProductModelAdd={
                    name:input.name,
                    price:Number(input.price),
                    description:input.description,
                    brand:input.brand,
                    images:img,
                    sale:Number(input.sale)
                }
                dispatch(ADD_Product_ASYNC(products));
                setInput({
                    name:'',
                    price:0,
                    description:'',
                    brand:'',
                    images:'',
                    sale:0
                })
                e.target.reset();
            }
            }
    }
    const clear=()=>{
        setInput({
            name:'',
            price:0,
            description:'',
            brand:'',
            images:'',
            sale:0
        })
    }
    const onchange=({target:{name,value}} : React.ChangeEvent<HTMLInputElement>)=>setInput(pre=>{
        (pre as any)[name]=value;
        const newUser={...pre};
        return newUser;
    })

    const onchangeFile=({target:{name,files}} : React.ChangeEvent<HTMLInputElement>)=>{
       if(files&&files?.length > 0){
            setImg(files[0]);
       }
    }
    return (
        <div className="list">
            <form onSubmit={onSubmit}>
                <input defaultValue={input.name||""} required={true} name="name" placeholder="Name product" onChange={onchange} type="text" />
                <input defaultValue={input.price||""} required={true} name="price" placeholder="Price product" onChange={onchange} type="number" />
                <input defaultValue={input.description||""} required={true} name="description" placeholder="Des product" onChange={onchange} type="text" />
                <input defaultValue={input.brand||""} required={true} name="brand" placeholder="Brand product" onChange={onchange} type="text" />
                <input defaultValue={input.sale||""} required={true} name="sale" placeholder="Sale product" onChange={onchange} type="text" />
                <input  required={false} name="images" placeholder="Images product" onChange={onchangeFile} type="file" />
                <input value="save"  type="submit" />
                <input onClick={clear} value="clear"  type="reset" />
            </form>
        </div>
    )
}
export default Form;