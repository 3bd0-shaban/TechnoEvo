import mongoose, { Schema } from 'mongoose';
import { iBlog } from 'types/iBlog';

const BlogSchema: Schema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    content: {
      type: String,
    },
    url: {
      requireed: true,
      type: String,
    },
    user: {
      // required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'USer',
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    image: {
      public_id: {
        // required: true,
        type: String,
      },
      url: {
        // required: true,
        type: String,
      },
    },
  },
  { timestamps: true },
);

const Blog = mongoose.model<iBlog>('blogs', BlogSchema);
export default Blog;
