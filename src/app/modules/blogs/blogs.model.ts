import { model, Schema } from "mongoose";
import { TBlog } from "./blogs.interface";

const blogSchema = new Schema<TBlog>({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
})


export const Blog = model<TBlog>("Blog", blogSchema)