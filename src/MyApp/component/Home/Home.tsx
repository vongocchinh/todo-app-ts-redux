import React, { useState } from 'react'
import './styles.css';
import Form from './../Form/Form';

import { useSelector } from 'react-redux'
import {  GET_VALIDATION_DELETE_Product, GET_VALIDATION_UPDATE_PRODUCT, selectAllProduct,  setValidationAddProduct, setValidationDeleteProduct, setValidationUpdateProduct } from '../../reducer/Product/Product';
import { useAppDispatch, useAppSelector } from './../../reducer/store.hooks';
import { addCart } from '../../reducer/Cart/Cart';
import { toast } from 'react-toastify';
import Item from '../Item/Item';
import { GET_VALIDATION_Product, DELETE_Product_ASYNC } from './../../reducer/Product/Product';
import Cart from './../Cart/Cart';
// import { RootState } from '../../reducer/store';

interface HomeInterface {
}


const Home: React.FC<HomeInterface> = () => {
    const [data, setData] = useState({
        id:'',
        name:'',
        price:0,
        des:''
    });
    // const ProductStore = useSelector(GetALLDataProduct);
    const ProductStore = useSelector(selectAllProduct);
    // const PID=useSelector<RootState>(state=>selectByProductID(state,'1'))
    const VALIDATION = useAppSelector(GET_VALIDATION_Product);
    const VALIDATION_DELETE = useAppSelector(GET_VALIDATION_DELETE_Product);
    const VALIDATION_UPDATE=useAppSelector(GET_VALIDATION_UPDATE_PRODUCT);
    const dispatch = useAppDispatch();
    if (VALIDATION === 0) {
        toast.info("ADD Product SUCCESS");
        dispatch(setValidationAddProduct(''));
    }
    if (VALIDATION_DELETE === 0) {
        toast.info("DELETE SUCCESS");
        dispatch(setValidationDeleteProduct(''));
    }

    if(VALIDATION_UPDATE===0){
        toast.info("Update success");
        dispatch(setValidationUpdateProduct(''))
    }

    const OnDelete = (id: string) => {
        dispatch(DELETE_Product_ASYNC(id));
    }
    const addCArt = (product: ProductModel) => {
        var cart = {
            id: product.id,
            name: product.name,
        }
        dispatch(addCart(cart));
    }
    const onUpdate=(product:ProductModel)=>{
        setData({
            name:product.name,
            price:product.price,
            id:product.id,
            des:product.des
        })
    }
    return (
        <div>
            <h2 style={{textAlign:"center",marginTop:"50px"}}>APP TODO LIST</h2>
            <div className="container">
            <Form data={data} />
            <div className="list">
                <div className="title">
                    <div className="div">
                        <p>Name</p>
                        <p>Price</p>
                        <p>Des</p>
                    </div>
                    <div className="div-3">
                        <p>Option</p>
                    </div>
                </div>
                <div className="list-item">
                    {ProductStore.map((value, key) => {
                        return (
                            <Item addCart={addCArt} onUpdate={onUpdate} OnDelete={OnDelete} value={value} key={key} />
                        )
                    })}
                </div>
            </div>

            <Cart />

        </div>
        </div>
    )
}


export default Home;