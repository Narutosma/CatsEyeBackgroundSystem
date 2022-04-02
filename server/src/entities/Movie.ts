import { ArrayMinSize, IsInt, IsNotEmpty, Max, Min, validate } from "class-validator";
import { plainToClass, Type } from 'class-transformer';
import 'reflect-metadata';
import { BaseEntitles } from "./BaseEntitles";
// 电影类
export class Movie extends BaseEntitles{
    @IsNotEmpty({message: "电影名称不能为空"})
    @Type(() => String)
    public name: string;

    @IsNotEmpty({message: "电影类型不能为空"})
    @ArrayMinSize(1, {message: "电影类型至少有一个"})
    @Type(() => String)
    public type: string[];

    @IsNotEmpty({message: "地区不能为空"})
    @ArrayMinSize(1, {message: "地区至少有一个"})
    @Type(() => String)
    public areas: string[];

    @IsNotEmpty({message: "电影时长不能为空"})
    @Min(1, {message: "电影最少要有1分钟"})
    @Max(9999, {message: "电影最长时长不能过多"})
    @IsInt({message: "电影时长不能为小数"})
    public timeLong: number;

    @IsNotEmpty({message: "是否热映不能为空"})
    public isHot: boolean = false;

    @IsNotEmpty({message: "是否上映不能为空"})
    public isComing: boolean = false;

    @IsNotEmpty({message: "是否是经典影片不能为空"})
    public isClasic: boolean = false;

    public description?: string;

    public poster?: string;

    /**
     * 将平面对象转换为movie对象
     */
    public static transform(plainObject: object): Movie{
        return super.BaseTransform(Movie, plainObject);
    }
}
