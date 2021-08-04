
import { ProductModel, ProductModelAdd } from '../reducer/Product/type.product';
import GET_API from './../util/getApi';


export const GET_PRODUCT = (): Promise<ProductModel[]> => new Promise((resolve, reject) => {
    GET_API('/product', 'GET', null).then((res: any) => {
        if (res.status === 200) {
            let data: ProductModel[] = [];
            res.data.forEach((e: ProductModel) => {
                var product: ProductModel = {
                    _id: e._id,
                    brand: e.brand,
                    description: e.description,
                    images: e.images,
                    name: e.name,
                    price: e.price,
                    sale: e.sale
                }
                data.push(product)
            });
            resolve(data);
        }
    });
})





export const validateProductModelAdd = (product: ProductModelAdd): Promise<ProductModel> => new Promise((resolve, reject) => {
    if (product) {
        GET_API("/product", 'POST', {
            brand: product.brand,
            description: product.description,
            images: product.images,
            name: product.name,
            price: product.price,
            sale: product.sale
        }).then((res: any) => {
            if (res.status === 200) {
                // resolve()
                var product: ProductModel = {
                    _id: res.data._id,
                    brand: res.data.brand,
                    description: res.data.description,
                    images: {},
                    name: res.data.name,
                    price: res.data.price,
                    sale: res.data.sale
                }
                resolve(product)
            }
        });
    }
})





export const validationDeleteProduct = (_id: string): Promise<string> => new Promise((resolve, reject) => {
    if (_id) {
        GET_API(`/product/${_id }`, 'DELETE', null).then((res: any) => {
            if (res.status === 200) {
                   resolve(_id);
            }
        })
    }
})


export const validationUpdate = (product: ProductModel): Promise<ProductModel> => new Promise((resolve, reject) => {
        if(product){
            GET_API(`/product/${product._id}`,'PUT',{
                _id: product._id,
                brand: product.brand,
                description: product.description,
                images: {},
                name: product.name,
                price: product.price,
                sale: product.sale
            }).then((res:any)=>{
                if(res.status===200){
                    resolve({
                        _id: product._id,
                        brand: product.brand,
                        description: product.description,
                        images: {},
                        name: product.name,
                        price: product.price,
                        sale: product.sale
                    });
                }
            })
        }
})