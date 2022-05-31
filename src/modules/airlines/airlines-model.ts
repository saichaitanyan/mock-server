import * as mongoose from 'mongoose';
// Airlines Schema
export const AirlinesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true, dropDups: true },
  },
  country: {
    type: String,
    required: true,
    trim: true,
    index: { unique: false, dropDups: true }
  },
  logo: {
    type: String,
    required: false,
    trim: true,
    index: { unique: true, dropDups: true }
  },
  established: { type: Number, required: true },
  website: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true, dropDups: true }
  },
  headquartes: {
    type: String,
    required: true,
    trim: true,
    index: { unique: false, dropDups: true }
  },
});
// Airlines Model
export interface Airlines {
  _id: string;
  name: string;
  country: string;
  logo: string;
  established: number;
  website: string;
  headquartes: string;
}
