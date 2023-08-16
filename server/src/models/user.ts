import mongoose, { Schema } from 'mongoose';
import { iUser } from 'types/iUser';

const UserSchema: Schema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      type: String,
    },
    username: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'USer',
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        required: true,
        type: String,
      },
      url: {
        required: true,
        type: String,
      },
    },
  },
  { timestamps: true },
);

const User = mongoose.model<iUser>('users', UserSchema);
export default User;
