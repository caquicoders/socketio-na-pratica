import mongoose from 'mongoose';

export interface InterfaceAccess extends mongoose.Document {
  id: string;
  address: string;
  browser: {
    name: string;
    version: string;
    major: string;
  };
  engine: { name: string; version: string };
  language: string;
  os: { name: string; version: string };
  page: string;
}

export const AccessSchema = new mongoose.Schema({
  id: String,
  address: String,
  browser: {
    name: String,
    version: String,
    major: String,
  },
  engine: { name: String, version: String },
  language: String,
  os: { name: String, version: String },
  page: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Access = mongoose.model<InterfaceAccess>('Access', AccessSchema);
export default Access;
