import { Document } from "mongoose";

export interface iUser extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  image: {
    public_id: string;
    url: string;
  };
}
