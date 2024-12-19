import { model, Schema } from "mongoose";
import { TUser } from "./auth.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

const userSchema = new Schema<TUser>({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password
            return ret
        }
    }
})


userSchema.pre('save', async function (next) {
    const user = this

    user.password = await bcrypt.hash(
        user.password, Number(config.bcrypt_salt_rounds)
    )
})

userSchema.post('save', async function (doc, next) {
    doc.password = ''
    next()
})


export const Auth = model<TUser>("User", userSchema)