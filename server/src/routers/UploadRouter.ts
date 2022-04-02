import Express from 'express';
import multer from 'multer';
import path from 'path';
import { ResponseHelper } from './ResponseHelper';
const router = Express.Router();

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../../public/upload'),
    // 设置上传文件的名称
    filename (req, file, cb) {
        const time = new Date().getTime();
        const ext = path.extname(file.originalname);
        cb(null, `${time}${ext}`);
    }
  });

const exts = ['.jpg', '.png', '.gif', '.jpeg'];

const upload =  multer({
     storage,
     limits: {
         // 限制上传文件的大小 为 1M
         fileSize: 1024 * 1024
     },
     fileFilter(req, file, cb){
         // 限制文件后缀
         const ext = path.extname(file.originalname);
         if(exts.includes(ext)){
            cb(null, true);
         }else{
            cb(new Error('请上传正确的文件类型!!!'));
         }
     }
    }).single('imgfile');

router.post('/', (req, res) => {
    upload(req, res, err => {
        if (err) {
            // 发生错误
            ResponseHelper.sendErrorData(err.message, res);
        }else{
            // 一切都好
            const url = `/upload/${req.file?.filename}`
            ResponseHelper.sendDate(url, res);
        }
      })
});


export default router;