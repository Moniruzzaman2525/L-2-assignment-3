import { model, Schema } from "mongoose";
import { BlogModel, TBlog } from "./blogs.interface";

const blogSchema = new Schema<TBlog, BlogModel>({
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

// checking blog using id
blogSchema.statics.isUserExistsById = async function (id) {
    return await Blog.findById(id)
}


export const Blog = model<TBlog, BlogModel>("Blog", blogSchema)