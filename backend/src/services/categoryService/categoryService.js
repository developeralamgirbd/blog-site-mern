const Category = require('../../models/categoryModel');
const mongoose = require("mongoose");

exports.showCategoryService = async ()=>{
    return await Category.aggregate([
        {$facet: {
           totalCategory: [
               {$group: {_id:0, count: {$sum: 1}}},
               {$project: {'_id':0}}
           ],
           categories: [
               {$project: {_id:1, name:1, status:1, createdAt:1, updatedAt:1, totalPost: {$size: "$postsID"} }}
           ]
        }},
    ]);
}

exports.categoryFindByName = async (name)=>{
    return await Category.aggregate([
        {$match: {name}},
        {$project: {_id: 1}}
    ]);
}


exports.categoryFindByID = async (_id)=>{

    const ObjectId = mongoose.Types.ObjectId;
    return Category.aggregate([
        {$match: {_id: ObjectId(_id)}}
    ]);
}






