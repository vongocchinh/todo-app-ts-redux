import React from 'react'
import Item from './Item';
import { GET_ALL_CART, Get_AMOUNT_ALL,removeCartID } from './../../reducer/Cart/Cart';
import { useAppSelector } from '../../reducer/store.hooks';
import { useAppDispatch } from './../../reducer/store.hooks';
interface CartTS{

}
const Cart:React.FC<CartTS>=()=> {
    const dispatch=useAppDispatch();
    const dataCart = useAppSelector(GET_ALL_CART);
    const GET_TONG_CART = useAppSelector(Get_AMOUNT_ALL);
    const removeCart=(id:string)=>{
        dispatch(removeCartID(id))
    }
    return (
        <div className="list">
                <div className="item">
                    <h2>CART ME</h2>
                    <h3>{GET_TONG_CART}</h3>
                </div>
                <div className="list-item">
                {dataCart.map((value, key) => {
                    return <Item removeCart={removeCart} value={value} key={key} />
                })}
                </div>

            </div>
    )
}
export default Cart;