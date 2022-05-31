import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

// Passenger Schema
export const PassengerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true, dropDups: true }
  },
  trips: { type: Number, required: true, default: 0 },
  airlineId: { type: Schema.Types.ObjectId, required: true },
});
// Passenger Model
export interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airlineId: string;
}
