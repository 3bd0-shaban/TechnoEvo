import mongoose, { Document, model, Model, Schema } from 'mongoose'

export interface iUser extends Document {
    name: string
    email: string
    username: string,
    password: string,
    image: {
        public_id: string,
        url: string
    }
}

const UserSchema: Schema = new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        type: String
    },
    username: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USer',
    },
    password: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            required: true,
            type: String,
        },
        url: {
            required: true,
            type: String,
        }
    }
}, { timestamps: true })

export const User = (mongoose.models.User ||
    model('User', UserSchema)) as Model<iUser>
