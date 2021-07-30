
import { ProductModel } from '../reducer/Product/Product';



export const validateProductModel=(product:ProductModel):Promise<ProductModel>=>new Promise((resolve,reject)=>{
    setTimeout(() => {
        if(product.name===''){
            reject('Thất Bai 201');
        }else
        if(product.name&&product.name.length>0){
            // reject("ok 200")productprod
        }
        resolve(product);
    }, 500);
})


export const validationDeleteProduct=(id:string):Promise<string> =>new Promise((resolve,reject)=>{
    setTimeout(() => {
        if(id===''){
            reject('Mess error');
        }
        resolve(id);
    }, 500);
})


export const validationUpdate=(product:ProductModel):Promise<ProductModel>=> new Promise((resolve,reject)=>{
    setTimeout(() => {
        if(product.id===''){
            reject("error 2001")
        }
        resolve(product);
    }, 500);
})