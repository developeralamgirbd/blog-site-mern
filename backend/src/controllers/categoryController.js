const CategoryModel = require('../models/categoryModel');
const PostModel = require('../models/postModel');
const mongoose = require('mongoose');

const {createService } = require("../services/common/createService");
const {checkAssociateService} = require("../services/common/checkAssociateService");
const {deleteService} = require("../services/common/deleteService");
const {updateService} = require("../services/common/updateService");

const {showCategoryService, categoryFindByName, categoryFindByID} = require("../services/categoryService/categoryService");

exports.create = async (req, res)=>{
    try {

        const category = await createService(req.body, CategoryModel);

        res.status(200).json({
            status: 'success',
            message: 'Successfully created category',
            data: category
        });

    }catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error: error.message
        });
    }

};

exports.showCategory = async (req, res)=>{
    try {

        const categories = await showCategoryService();
        // categories[0].totalCategory[0].count === 0
        if (!categories[0]){
           return res.status(400).json({
                status: 'fail',
                message: 'Category not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Successfully get all category',
            data: categories[0]
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error: error.message
        });
    }
}

exports.updateCategory = async (req, res)=>{
    try {

        const _id = req.body._id;
        const categoryName = req.body.name;

        if (categoryName === ''){
            return res.status(400).json({
                status: 'fail',
                error: 'Category name is required'
            });
        }

        const result = await updateService({_id}, {$set: {name: categoryName}}, CategoryModel);

        if (result.modifiedCount === 0){
            return res.status(400).json({
                status: 'fail',
                error: 'Category not update'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Category update successfully',
            result
        });

    }catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'fail',
            error: error.message
        });
    }
}

exports.deleteCategory = async (req, res)=>{
    try {
        const _id = req.body._id;

        const ObjectId = mongoose.Types.ObjectId;

        const isCategory = await categoryFindByID(_id);

        if(!isCategory[0]){
            return res.status(400).json({
                status: 'fail',
                message: 'Category not found',
            });
        }

        const CheckAssociate = await checkAssociateService({categoryID: ObjectId(_id)}, PostModel);

        if (CheckAssociate[0]){
            return res.status(400).json({
                status: 'fail',
                message: 'Delete failed, Category associate with post'
            });
        }

        const result = await deleteService({_id: ObjectId(_id)}, CategoryModel);

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

