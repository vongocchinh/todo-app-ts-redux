import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { CartModel } from './../../reducer/Cart/Cart';
let myIcon: React.ReactElement<typeof DeleteIcon> = <DeleteIcon fontSize="small" color="primary" />;

interface ItemTS{
value: CartModel,
removeCart:removeCart
}
const Item:React.FC<ItemTS>=({value,removeCart})=> {
    const ONDELETE = () => {
        removeCart(value.id)
    }
    return (
        <div className="item">
            <div className="div">
                <p>{value.name}</p><p>{value.amount}</p>
            </div>
            <div className="div-2">
                <p onClick={ONDELETE}>{myIcon}</p>
            </div>
        </div>
    )
}
export default  Item;