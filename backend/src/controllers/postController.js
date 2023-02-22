
const mongoose = require("mongoose");
const PostModel = require('../models/postModel');
const CategoryModel = require('../models/categoryModel');

const {categoryFindByID, categoryFindByName} = require("../services/categoryService/categoryService");

const {createService} = require("../services/common/createService");
const {updateService} = require("../services/common/updateService");
const {showAllPostService, showPostByStatusService,searchPostService,showPostByCategoryService} = require('../services/postService/postService');
const {deleteService} = require("../services/common/deleteService");
const {checkAssociateService} = require("../services/common/checkAssociateService");


exports.create = async (req, res)=>{
    try {

        const categoryID = req.body.categoryID;

        const isCategory = await categoryFindByID(categoryID);

        if (!isCategory[0]){
            return res.status(400).json({
                status: 'fail',
                message: 'Category not found'
            });
        }

        const createObj = {...req.body};
        createObj.authorID = req.auth._id;

        const post = await createService(createObj, PostModel);


        await updateService({_id: post.categoryID},{$push: {
                postsID: post._id
            }},CategoryModel )

        res.status(200).json({
            status: 'success',
            message: 'Successfully create successfully',
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
        const authorID = req.auth._id;
        const categoryID = req.body.categoryID;
        const _id = req.body._id;

        if (categoryID === ''){
            return res.status(400).json({
                status: 'fail',
                message: 'Category is required'
            });
        }

        const ObjectId = mongoose.Types.ObjectId;
        // Check whether the request category id is in the category collection
        const isCategory = await categoryFindByID(categoryID);

        if (!isCategory[0]){
            return res.status(400).json({
                status: 'fail',
                message: 'Category not found'
            });
        }

        // get category id from post
        const oldCategoryID = await PostModel.aggregate([
            {$match: {_id: ObjectId(_id) }},
            {$project: {_id: 0, categoryID: 1}}
        ]);

        const isOldCatID = oldCategoryID[0] ? oldCategoryID[0]['categoryID'] : 'alamgir12345'

        // post id remove from previous category
        await updateService({_id: ObjectId(isOldCatID)}, {$pull: {
                'postsID': _id
            }}, CategoryModel);


        const updateObj = {...req.body};
        // delete post id from request body
        delete updateObj._id;

        // only update logged user post, not allow other person post update
        const result = await updateService({_id: ObjectId(_id), authorID: ObjectId(authorID)}, updateObj, PostModel );

        if (result.modifiedCount === 0){
            return res.status(400).json({
                status: 'fail',
                message: 'Post not updated'
            });
        }

        // if post category change, push post id in category collection
        await updateService({_id: isCategory[0]['_id']},{$addToSet: {
                postsID: _id
            }},CategoryModel );


        res.status(200).json({
            status: 'success',
            message: 'Post update successfully',
            result
        });

    }catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error: error.message
        });
    }
}

exports.showPostByStatus = async (req, res)=>{
    try {

        const authorID = req.auth._id;
        const status = req.params.status;

        const result = await showPostByStatusService(authorID, status);

        if (!result[0]['posts'][0]){
            return res.status(400).json({
                status: 'fail',
                message: 'Post not found'
            });
        }

        res.status(200).json({
            status: 'Success',
            message: 'Post Select by date successfully',
            date: result
        })

    }catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error: error.message
        });
    }
}

exports.searchPost = async (req, res)=>{
    try {

        const authorID = req.auth._id;
        const search = req.params.search;

        const post = await searchPostService(authorID, search)

        if (post.length === 0){
            return res.status(400).json({
                status: 'fail',
                message: 'Post not found'
            });
        }

        res.status(200).json({
            status: 'Success',
            message: `Post search by ${search}`,
            date: post
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

        const post = await showPostByCategoryService(isCategory[0]['_id']);

        if (post[0].posts.length === 0){
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

exports.deletePost = async (req, res)=>{
    try {
        const _id = req.body._id;
        const result = await deleteService({_id}, PostModel);

        if(result.deletedCount === 0){
           return res.status(400).json({
                status: 'fail',
                message: 'Post not deleted',
            });
        }

        const ObjectId = mongoose.Types.ObjectId;
        const category = await checkAssociateService({postsID: ObjectId(_id)}, CategoryModel);

        // post id remove from previous category
        await updateService({_id: ObjectId(category[0]['_id'])}, {$pull: {
                'postsID': _id
            }}, CategoryModel);

        res.status(200).json({
            status: 'success',
            message: 'Category delete successfully',
            data: result
        });

    }catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error: error.message
        });
    }
}


