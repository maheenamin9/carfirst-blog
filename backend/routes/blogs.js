const express = require('express');
const router = express.Router();
const { Blog, validate } = require('../models/blog');
const _ = require('lodash');
const multer = require('multer');
const path = require('path');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const asyncHandler = require('express-async-handler');

// file storage engine
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, "image-" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: fileStorageEngine });

router.post('/', upload.single("image"), auth, asyncHandler(async (req, res) => {
    // console.log(req.file);
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let blog = new Blog({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        fileName: req.file.filename,
        postedBy: req.user._id,
        status: req.body.status
    })
    await blog.save();
    res.send(blog);
}))

router.get('/', auth, asyncHandler(async (req, res) => {
    const { page, itemsPerPage} = req.query;
    const blogs = await Blog.find()
        .populate("postedBy", "-_id")
        .sort({ date: -1 })
        .limit(itemsPerPage * 1)
        .skip((page - 1) * itemsPerPage)
        .exec();
    const count = await Blog.countDocuments();

    res.send({
        blogs,
        totalPages: Math.ceil(count/itemsPerPage),
        count
    });
}))

router.put("/updateStatus/:id", [auth, admin], asyncHandler(async (req, res) => {

    // 1. query first approach
    // firstly, find the blog
    // const blog = await Blog.findOne({ _id: req.params.id })
    // if(!blog) return res.status(404).send("Blog with the given id not found");

    // // update the blog and save it
    // blog.status = "approved"
    // await blog.save();
    // res.send(blog);

    // 2. update first approach
    const blog = await Blog.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            status: req.body.status
        }
    })
    res.send(blog);
}))

module.exports = router;