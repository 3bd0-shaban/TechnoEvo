import mongoose, { Document, model, Model, Schema } from 'mongoose'

interface iBlog extends Document {
    _id: string,
    title: string
    content: string,
    user: string,
    url: string,
    createdAt: string,
    image: {
        public_id: string,
        url: string
    }
}

const BlogSchema: Schema = new Schema({
    title: {
        required: true,
        type: String
    },
    content: {
        type: String
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
        }
    }
}, { timestamps: true })

export const Blog = (mongoose.models.Blog ||
    model('Blog', BlogSchema)) as Model<iBlog>
