import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseEntitles } from './BaseEntitles';

export class SearchCondition extends BaseEntitles{
    @IsInt({message: "page不能为小数"})
    @Min(1, {message: "page的最小值为1"})
    @Type(() => Number)
    public page:number = 1;
    @IsInt({message: "limit不能为小数"})
    @Min(0, {message: "limit不能为负数"})
    @Type(() => Number)
    public limit:number = 10;
    @Type(() => String)
    public key:string = '';
    public static transform(plainObject: object): SearchCondition{
        return super.BaseTransform(SearchCondition, plainObject);
    }
}