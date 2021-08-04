import axios from "axios";

export default function GET_API(adPoint:string,method: any ,body:object | null){
    return axios({
        method: method,
        url: "http://localhost:3001"+adPoint,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          },
        data: body,
    }).catch(er=>{
        console.log(er);
    })
}