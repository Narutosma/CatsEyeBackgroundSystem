import mongoose from 'mongoose';
import { Movie } from '../entities/Movie';

export interface IMovie extends Movie, mongoose.Document{}

const moiveSchema = new mongoose.Schema<IMovie>({
    name: String,
    type: [String],
    areas: [String],
    timeLong: Number,
    isHot: Boolean,
    isComing: Boolean,
    isClasic: Boolean,
    description: String,
    poster: String
}, {
    versionKey: false
});

export default mongoose.model<IMovie>('Movie', moiveSchema);