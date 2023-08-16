import { Document } from 'mongoose';

export interface iBlog extends Document {
  title?: string;
  content?: string;
  user?: string;
  url?: string;
  image?: {
    public_id: string;
    url: string;
  };
}
