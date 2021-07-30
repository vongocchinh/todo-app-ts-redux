
import { UserModel } from './../reducer/User/User';



const validateUserModel=(user:UserModel):Promise<UserModel>=>new Promise((resolve,reject)=>{
    setTimeout(() => {
        if(user.name===''){
            reject('Thất Bai 201');
        }else
        if(user.name&&user.name.length>0){
            // reject("ok 200")
        }
        resolve(user);
    }, 500);
})


export const validationDeleteUser=(id:string):Promise<string> =>new Promise((resolve,reject)=>{
    setTimeout(() => {
        if(id===''){
            reject('Mess error');
        }
        resolve(id);
    }, 500);
})


export default validateUserModel;