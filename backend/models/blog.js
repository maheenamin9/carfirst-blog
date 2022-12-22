const mongoose = require('mongoose');
const Joi = require('joi');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    },
    date: {
        type: Date,
        default: Date.now
    },
    fileName: {
        type: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: "pending"
    }
})

const Blog = mongoose.model('Blog', blogSchema);

function validateBlog(blog) {
    const schema = Joi.object({
        title: Joi.string().required().min(6).max(100),
        category: Joi.string().required(),
        description: Joi.string().required().min(10).max(500),
    })
    return schema.validate(blog);
}

exports.Blog = Blog;
exports.validate = validateBlog;