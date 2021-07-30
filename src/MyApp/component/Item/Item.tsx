import React from 'react'


import DeleteIcon from '@material-ui/icons/Delete';
// import { ProductModel } from '../../reducer/Product/Product';
import EditIcon from '@material-ui/icons/Edit';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
let myIconCart: React.ReactElement<typeof DeleteIcon> = <ShoppingCartIcon fontSize="small" color="secondary" />;
let myIcon: React.ReactElement<typeof DeleteIcon> = <DeleteIcon fontSize="small" color="primary" />;
let iconEdit: React.ReactElement<typeof DeleteIcon> = <EditIcon fontSize="small" color="primary" />;



interface ItemTS{
    value:ProductModel;
    addCart:onAddCart;
    OnDelete:onDeleteProduct;
    onUpdate:onUpdate
}
 const Item:React.FC<ItemTS>=({value,addCart,OnDelete,onUpdate})=> {

    const onDelete = () => {
        OnDelete(value.id);
    }
    const addCArt = () => {
        addCart(value);
    }
    const onClickUpdate=()=>{
        onUpdate(value);
    }
    return (
        <div className="item">
            <div className="div">
                <p>{value.name}</p>
                <p>{value.price}</p>
                <p>{value.des}</p>
            </div>
            <div className="div-2"><p onClick={onClickUpdate}>{iconEdit}</p><p onClick={onDelete}>{myIcon}</p><p onClick={addCArt}>{myIconCart}</p></div>
        </div>
    )
}
export default Item;