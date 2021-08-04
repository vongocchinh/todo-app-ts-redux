

type ProductModel={
    _id: string,
    name: string,
    price: number,
    description: string,
    brand:string,
    sale:number,
    images:object
}

type ProductModelAdd={
    name: string,
    price: number,
    description: string,
    brand:string,
    sale:number,
    images:object
}
interface CartModel extends ProductModel{
    id_cart:string,
    amount:number
}


type onAddCart=(product:ProductModel)=>void;

type onDeleteProduct=(id:string)=>void

type removeCart=(id:string)=>void

type onUpdate=(value:ProductModel)=>void

