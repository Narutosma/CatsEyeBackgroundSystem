import Express from 'express';
import MovieRouter from './routers/MovieRouter';
import UploadRouter from './routers/UploadRouter';

const app = Express();
app.use('/upload', Express.static('public/upload'))
app.use(Express.json());
app.use('/api/movie', MovieRouter);
app.use('/api/upload', UploadRouter);
app.listen(3000);