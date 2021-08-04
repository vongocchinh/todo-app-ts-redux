export interface ProductModel {
    _id: string,
    name: string,
    price: number,
    description: string,
    brand:string,
    sale:number,
    images:object 
}

export interface ProductModelAdd {
    name: string,
    price: number,
    description: string,
    brand:string,
    sale:number,
    images:object 
}







export enum ValidationProduct {
    Fulfilled,
    Pending,
    Reject
}


export enum ValidationDeleteProduct {
    Fulfilled,
    Pending,
    Reject
}

export enum ValidationUpdateProduct {
    Fulfilled,
    Pending,
    Reject
}



export interface InitialState {
    // Products:ProductModel[],
    validationProduct?: ValidationProduct,
    validationDeleteProduct?: ValidationDeleteProduct,
    validationUpdateProduct?: ValidationUpdateProduct,
    messageError?: string
}

// const initialState:InitialState={
//     Products:data,
//     validationProduct:undefined,
//     messageError:undefined
// }