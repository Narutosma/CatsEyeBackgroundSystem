import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export abstract class BaseEntitles{
    /**
     *  数据验证
     */

     public async validateThis(editSkip=false): Promise<string[]>{
        const errors = await validate(this, {
            skipUndefinedProperties: editSkip
        });
        const result:string[] = [];
        const error = errors.map(e => {
            const temp:string[] = [];
            for (const key in e.constraints) {
                if (!Object.prototype.hasOwnProperty.call(e, key)) {
                    temp.push(e.constraints[key]);
                }
            }
            return temp;
        });
        error.forEach(e => {
            result.push(...e);
        })
        return result;
    }

    /**
     * 将平面对象转换为movie对象
     */
     protected static BaseTransform<T>(cls: new (...args:any) => T, plainObject: object): T{
        if(plainObject instanceof cls){
            return plainObject;
        }
        return plainToClass(cls, plainObject);
    }
}