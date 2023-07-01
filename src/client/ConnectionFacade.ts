import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

type header =  {[key:string]:string} | undefined;

export default class ConnectionFactory{
    private static instance: ConnectionFactory;
    private constructor(){}
    public static getInstance(): ConnectionFactory{
        if(!ConnectionFactory.instance){
            ConnectionFactory.instance = new ConnectionFactory();
        }
        return ConnectionFactory.instance;
    }


    private generateConfig<T>(url:string, method: "get"|"post"|"put", params:header|undefined, data: T|undefined, headers: header|undefined):AxiosRequestConfig{
        return {
            responseType: 'json',
            url,
            method,
            params: params ?? {},
            headers : headers ?? {},
            data : data ?? null
        };
    }

    public getData<T,R>(url:string, params:header|undefined, data: T|undefined, headers: header|undefined) : Promise<AxiosResponse<R>>{
        const request = this.generateConfig<T>(url,"get",params,data,headers);
        return axios<T,AxiosResponse<R>>(request);
    }

    public postData<T,R>(url:string, params:header|undefined, data: T|undefined, headers: header|undefined) : Promise<AxiosResponse<R>>{
        const request = this.generateConfig<T>(url,"post",params,data,headers);
        return axios<T,AxiosResponse<R>>(request);
    }

    public putData<T,R>(url:string, params:header|undefined, data: T|undefined, headers: header|undefined) : Promise<AxiosResponse<R>>{
        const request = this.generateConfig<T>(url,"put",params,data,headers);
        return axios<T,AxiosResponse<R>>(request);
    }

}