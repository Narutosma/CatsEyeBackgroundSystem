import { Response } from "express";


export class ResponseHelper{
    // 响应错误信息
    public static sendErrorData(error: string | string[], res: Response){
        if(Array.isArray(error)){
            error = error.join(';');
        }
        res.send({
            error,
            data: null
        });
    }

    // 响应常规信息
    public static sendDate(data: any, res: Response){
        res.send({
            error: '',
            data
        })
    }

    // 响应分页数据
}