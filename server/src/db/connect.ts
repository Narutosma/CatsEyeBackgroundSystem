/*
* 链接 mongodb数据库
*/
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/movie');
mongoose.connection.on('open', () => {
    console.log('连接成功');
})
