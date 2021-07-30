import React, { } from 'react'
import './styles.css';
import Form from './../Form/Form';

import { useSelector } from 'react-redux'
import { GetALLDataUser, GET_VALIDATION_USER, setValidationAddUser, GET_VALIDATION_DELETE_USER, setValidationDeleteUser, DELETE_USER_ASYNC } from './../../reducer/User/User';
import { useAppDispatch, useAppSelector } from './../../reducer/store.hooks';
import { addCart, removeCart } from '../../reducer/Cart/Cart';
import { GET_ALL_CART, Get_AMOUNT_ALL } from './../../reducer/Cart/Cart';
import DeleteIcon from '@material-ui/icons/Delete';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { toast } from 'react-toastify';
let myIcon: React.ReactElement<typeof DeleteIcon> = <DeleteIcon fontSize="small" color="primary" />;
let myIconCart: React.ReactElement<typeof DeleteIcon> = <ShoppingCartIcon fontSize="small" color="secondary" />;
interface HomeInterface {

}




const Item = (props: any) => {

    const dispatch = useAppDispatch();

    const OnDelete = () => {
        dispatch(DELETE_USER_ASYNC(props.value.id));
    }
    // const onUpdate = () => {
    //     dispatch(updateUser(props.value.id));
    // }
    const addCArt = () => {

        var cart = {
            id: props.value.id,
            name: props.value.name,
        }
        dispatch(addCart(cart));
    }
    return (
        <div className="item">
            <div className="div">
                <p>{props.value.name}</p>
                <p>{props.value.price}</p>
                <p>{props.value.des}</p>
            </div>
            <div className="div-2"><p onClick={OnDelete}>{myIcon}</p><p onClick={addCArt}>{myIconCart}</p></div>
        </div>
    )
}

const ITEM_CART = (props: any) => {
    const dispatch = useAppDispatch();
    const ONDELETE = () => {
        dispatch(removeCart(props.value.id))
    }
    return (
        <div className="item">
            <div className="div">
                <p>{props.value.name}</p><p>{props.value.amount}</p>
            </div>
            <div className="div-2">
                <p onClick={ONDELETE}>{myIcon}</p>
            </div>
        </div>
    )
}
const Home: React.FC<HomeInterface> = () => {

    const UserStore = useSelector(GetALLDataUser);
    const dataCart = useAppSelector(GET_ALL_CART);
    const GET_TONG_CART = useAppSelector(Get_AMOUNT_ALL)
    const VALIDATION = useAppSelector(GET_VALIDATION_USER);
    const VALIDATION_DELETE = useAppSelector(GET_VALIDATION_DELETE_USER);
    const dispatch = useAppDispatch();
    if (VALIDATION === 1) {
        console.log("DANG LOAD ADD");

    }
    if (VALIDATION === 0) {
        toast.info("ADD USER SUCCESS");
        dispatch(setValidationAddUser(''));
    }
    console.log(VALIDATION_DELETE);

    if (VALIDATION_DELETE === 1) {
        console.log("dang xoa");

    }
    if (VALIDATION_DELETE === 0) {
        toast.info("DELETE SUCCESS");
        dispatch(setValidationDeleteUser(''));
    }
    return (
        <div className="container">
            <Form />
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
               {UserStore.map((value, key) => {
                    return (
                        <Item value={value} key={key} />
                    )
                })}
                </div>
            </div>

            <div className="list">
                <div className="item">
                    <h2>CART ME</h2>
                    <h3>{GET_TONG_CART}</h3>
                </div>
                <div className="list-item">
                {dataCart.map((value, key) => {
                    return <ITEM_CART value={value} key={key} />
                })}
                </div>

            </div>

        </div>
    )
}


export default Home;