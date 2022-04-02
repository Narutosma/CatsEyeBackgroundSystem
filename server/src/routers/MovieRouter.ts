import Express from 'express';
import MovieServer from '../servers/MovieServer';
import { ResponseHelper } from './ResponseHelper';

const router = Express.Router();

/**
 * 获取单个数据
 */
router.get('/:id', async (req, res) => {
    try{
        const movieId = req.params.id;
        const movie = await MovieServer.findById(movieId);
        ResponseHelper.sendDate(movie, res);
    }catch(e){
        ResponseHelper.sendErrorData('id错误', res);
    }
});

/**
 * 获取多条数据
 */
router.get('/', async (req, res) => {
    const query:any = req.query;
    const result = await MovieServer.find(query);
    ResponseHelper.sendDate(result, res);
})

/**
 * 新增一条数据
 */
router.post('/', async (req, res) => {
    const result = await MovieServer.add(req.body);
    if(Array.isArray(result)){
        ResponseHelper.sendErrorData(result, res);
    }else{
        ResponseHelper.sendDate(result, res);
    }
});

/**
 * 修改一条数据
 */
router.put('/:id', async (req, res) => {
    try{
        const movieId = req.params.id;
        const result = await MovieServer.edit(movieId, req.body);
        if(Array.isArray(result)){
            ResponseHelper.sendErrorData(result, res);
        }else{
            ResponseHelper.sendDate(result, res);
        }
    }catch(e){
        ResponseHelper.sendDate('id错误', res);
    }
})

/**
 * 删除一条数据
 */
router.delete('/:id', async (req, res) => {
    try{
        const movieId = req.params.id;
        await MovieServer.delete(movieId);
        ResponseHelper.sendDate(true, res);
    }catch(e){
        ResponseHelper.sendErrorData('id错误', res);
    }
});

export default router;
