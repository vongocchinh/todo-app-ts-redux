import React, { useEffect, useState } from 'react'
import './styles.css';
import Form from './../Form/Form';

import { useSelector } from 'react-redux'
import {
    CountAction, countSizeProductNumber, GET_VALIDATION_DELETE_Product, GET_VALIDATION_Product, GET_VALIDATION_UPDATE_PRODUCT, ObjectCount, selectAllProduct
    , setValidationAddProduct, setValidationDeleteProduct, setValidationUpdateProduct
} from '../../reducer/Product/Product';
import { useAppDispatch, useAppSelector } from './../../reducer/store.hooks';
import { addCart } from '../../reducer/Cart/Cart';
import { toast } from 'react-toastify';
import Item from '../Item/Item';
import {  DELETE_Product_ASYNC, GET_DATA_PRODUCT_ASYNC } from './../../reducer/Product/action.product';
// import Cart from './../Cart/Cart';
interface HomeInterface {
}


const Home: React.FC<HomeInterface> = () => {
    const [data, setData] = useState<ProductModel>({
        _id: '',
        name: '',
        price: 0,
        description: '',
        brand: '',
        images: "",
        sale: 0

    });

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(GET_DATA_PRODUCT_ASYNC())
    }, [dispatch])
    const ProductStore = useSelector(selectAllProduct);

    const VALIDATION = useAppSelector(GET_VALIDATION_Product);
    const VALIDATION_DELETE = useAppSelector(GET_VALIDATION_DELETE_Product);
    const VALIDATION_UPDATE = useAppSelector(GET_VALIDATION_UPDATE_PRODUCT);
    useEffect(() => {
        if (VALIDATION === 0) {
            toast.info("ADD Product SUCCESS");
            dispatch(setValidationAddProduct(''));
        }
        if (VALIDATION_DELETE === 0) {
            toast.info("DELETE SUCCESS");
            dispatch(setValidationDeleteProduct(''));
        }
        if (VALIDATION_UPDATE === 0) {
            toast.info("Update success");
            dispatch(setValidationUpdateProduct(''))
        }
    }, [VALIDATION, VALIDATION_DELETE, VALIDATION_UPDATE, dispatch])

    const OnDelete: onDeleteProduct = (_id: string) => {
        dispatch(DELETE_Product_ASYNC(_id));
    }
    const addCArt: onAddCart = (product: ProductModel) => {
        var cart = {
            _id: product._id,
            name: product.name,
        }
        dispatch(addCart(cart));
    }
    const onUpdate: onUpdate = (product: ProductModel) => {
        setData({
            name: product.name,
            price: product.price,
            _id: product._id,
            brand: product.brand,
            description: product.description,
            images: product.images,
            sale: product.sale

        })
    }
    const count: ObjectCount = { count: 10 }
    return (
        <div>
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>APP TODO LIST</h2>
            <div className="container">
                <Form data={data} />
                <div className="list">
                    <div className="title">
                        <div className="div">
                            <p>Name</p>
                            <p>Price</p>
                            <p onClick={() => dispatch(countSizeProductNumber(115))} >Des</p>
                            <p>Img</p>
                        </div>
                        <div className="div-3">
                            <p onClick={() => dispatch(CountAction(count))}>Option</p>
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
                {/* <Cart /> */}
            </div>
        </div>
    )
}
export default Home;