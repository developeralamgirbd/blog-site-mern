const mongoose = require("mongoose");
const PostModel = require('../models/postModel');
const CategoryModel = require('../models/categoryModel');

const {categoryFindByID, categoryFindByName} = require("../services/categoryService/categoryService");

const {deleteService} = require("../services/common/deleteService");
const {checkAssociateService} = require("../services/common/checkAssociateService");

const {updateService} = require("../services/common/updateService");

const {
    showAllPostService,
    postCreateService,
    searchPostService,
    showPostByCategoryService,
    postUpdateService,
    postDeleteService, postByID
}
    = require('../services/postService/postService');


exports.create = async (req, res)=>{
    try {

        const {title, description, categoryID, } = req.body;

        const isCategory = await categoryFindByID(categoryID);

        if (!isCategory[0]){
            return res.status(400).json({
                status: 'fail',
                message: 'Category not found'
            });
        }

        const postBody = {title, description, categoryID, authorID: req.auth._id};

        const post = await postCreateService(postBody);

        res.status(200).json({
            status: 'success',
            data: post
        });

    }catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error: error.message
        });
    }

};

exports.showAllPost = async (req, res)=>{
    try {
        const authorID = req.auth._id;

        const post = await showAllPostService(authorID);

        if (!post[0]){
            return res.status(400).json({
                status: 'fail',
                message: 'Post not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Successfully get all post',
            data: post[0]
        });

    }catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error: error.message
        });
    }
}

exports.updatePost = async (req, res)=>{
    try {
        const _id = req.params.id;
        const authorID = req.auth._id;
        const {title, description, categoryID} = req.body;

        const isCategory = await categoryFindByID(categoryID);

        if (!isCategory[0]){
            return res.status(400).json({
                status: 'fail',
                message: 'Category not found'
            });
        }

        const findPost = await postByID(_id);

        if (!findPost[0]){
            return res.status(400).json({
                status: 'fail',
                message: 'Post not found'
            });
        }

        const updateBody = {
            title: title !== '' ? title : findPost[0].title,
            description: description !== '' ? description : findPost[0].description,
            categoryID: categoryID !== '' ? categoryID : findPost[0].categoryID
        };

        // only update logged user post, not allow other person post update
        const data = await postUpdateService(_id, authorID, updateBody);

        if (!data){
            return res.status(400).json({
                status: 'fail',
                message: 'Post not updated'
            });
        }

        res.status(200).json({
            status: 'success',
            data
        });

    }catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error: 'Server error occurred'
        });
    }
}

exports.authSearchPosts = async (req, res)=>{
    try {

        const authorID = req.auth._id;
        const keyword = req.params.keyword;

        const ObjectId = mongoose.Types.ObjectId;

        const searchQuery = { authorID: ObjectId(authorID), title: {"$regex": keyword, "$options": "i" }};

        const posts = await searchPostService(searchQuery)

        if (!posts[0]){
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }

        res.status(200).json({
            status: 'Success',
            data: posts
        })

    }catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error: 'Server error occurred'
        });
    }
}

exports.searchPosts = async (req, res)=>{
    try {

        const keyword = req.params.keyword;

        const searchQuery = { title: {$regex: keyword, $options: "i" }};

        const posts = await searchPostService(searchQuery)

        if (posts[0].posts.length === 0){
            return res.status(400).json({
                status: 'fail',
                message: 'Post not found'
            });
        }

        res.status(200).json({
            status: 'Success',
            data: posts
        })

    }catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error: error.message
        });
    }
}

exports.authShowPostByCategory = async (req, res)=>{
    try {

        const categoryName =  req.params.name.toLowerCase();
        const authorID = req.auth._id;

        const isCategory = await categoryFindByName(categoryName);

        if (!isCategory[0]){
            return res.status(400).json({
                status: 'fail',
                message: 'Category not found'
            });
        }
        const ObjectId = mongoose.Types.ObjectId;
        const query = {authorID: ObjectId(authorID), categoryID: ObjectId(isCategory[0]['_id'])}

        const post = await showPostByCategoryService(query);

        if (!post[0].posts[0]){
            return res.status(400).json({
                status: 'fail',
                message: 'Post not found'
            });
        }

        res.status(200).json({
            status: 'Success',
            message: `Post show by ${categoryName} category successfully`,
            data: post
        })

    }catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error: error.message
        });
    }
}

exports.showPostByCategory = async (req, res)=>{
    try {

        const categoryName =  req.params.name.toLowerCase();

        const isCategory = await categoryFindByName(categoryName);

        if (!isCategory[0]){
            return res.status(400).json({
                status: 'fail',
                message: 'Category not found'
            });
        }
        const ObjectId = mongoose.Types.ObjectId;
        const query = {categoryID: ObjectId(isCategory[0]['_id'])}

        const post = await showPostByCategoryService(query);

        if (!post[0].posts[0]){
            return res.status(400).json({
                status: 'fail',
                message: 'Post not found'
            });
        }

        res.status(200).json({
            status: 'Success',
            message: `Post show by ${categoryName} category successfully`,
            data: post
        })

    }catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error: error.message
        });
    }
}

exports.showSinglePost = async (req, res)=>{
    try {

        const _id =  req.params.id;

        const post = await postByID(_id);

        if (!post[0]){
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }

        res.status(200).json({
            status: 'Success',
            data: post
        })

    }catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error: error.message
        });
    }
}

exports.deletePost = async (req, res)=>{
    try {
        const _id = req.params.id;
        const result = await postDeleteService(_id);

        if(!result){
           return res.status(400).json({
                status: 'fail',
                message: 'Invalid request',
            });
        }

        res.status(200).json({
            status: 'success',
            data: result
        });

    }catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error: 'Server error occurred'
        });
    }
}


