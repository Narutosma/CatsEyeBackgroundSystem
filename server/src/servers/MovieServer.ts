import { MovieModel } from "../db";
import { IMovie } from "../db/MoiveSchema";
import { Movie } from "../entities/Movie";
import { SearchCondition } from "../entities/SearchCondition";

interface IFindMovieResult {
    count: number;
    data: IMovie[];
    errors: string[];
}

export default class MovieServer{
    /**
     * 添加电影对象
     * @param movie 电影信息
     */
    public static async add(movie: Movie): Promise<IMovie | string[]>{
        // 先将对象转换成Movie对象
        const m = Movie.transform(movie);
        // 验证数据是否正确
        const errors = await m.validateThis();
        if(errors.length > 0){
            return errors;
        }

        // 向数据库里添加数据
        return await MovieModel.create(m);
    }
    /**
     * 根据id修改电影信息
     * @param id 修改电影id
     * @param movie 修改内容
     */
    public static async edit(id: string, movie: Movie): Promise<string[]>{
        // 先将对象转换成Movie对象
        const m = Movie.transform(movie);
        // 验证数据是否正确
        const errors = await m.validateThis(true);
        if(errors.length > 0){
            return errors;
        }

        await MovieModel.updateOne({_id: id}, movie);
        return errors;
    }
    /**
     * 根据id删除电影信息
     * @param id 电影id
     */
    public static async delete(id: string):Promise<void>{
        await MovieModel.deleteOne({_id: id});
    }
    /**
     * 根据id搜索电影信息
     * @param id 电影id
     */
    public static async findById(id: string): Promise<IMovie | null>{
        return await MovieModel.findById({_id: id});
    }
    /**
     * 搜索电影信息
     * @param condition page limit key 搜索信息
     */
    public static async find(condition: SearchCondition): Promise<IFindMovieResult>{
        // 先将对象转换成Movie对象
        const c = SearchCondition.transform(condition);
        // 验证数据是否正确
        const errors = await c.validateThis();
        if(errors.length > 0){
            return {
                count: 0,
                data: [],
                errors
            };
        }
        // 查找数据
        const result = await MovieModel.find({
            name: {$regex: new RegExp(c.key)}
        }).skip((c.page - 1) * c.limit).limit(c.limit);

        // 数据总数
        const count = await MovieModel.find({
            name: {$regex: new RegExp(c.key)}
        }).count();

        // 返回结果
        return {
            count,
            data: result,
            errors: []
        };;
    }
}