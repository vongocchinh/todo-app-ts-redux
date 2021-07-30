

type ProductModel={
    id:string,
    name:string,
    price:number,
    des:string
}

type onAddCart=(product:ProductModel)=>void;

type onDeleteProduct=(id:string)=>void

type removeCart=(id:string)=>void

type onUpdate=(value:ProductModel)=>void

