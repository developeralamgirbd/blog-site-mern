const Category = require('../../models/categoryModel');
const mongoose = require("mongoose");

exports.categoryCreateService = async (name)=>{
    const category = new Category({name});
    await category.save();
    return category;
}

exports.showCategoriesService = async ()=>{
    return Category.aggregate([
        {$facet: {
           totalCategory: [
               {$group: {_id:0, count: {$sum: 1}}},
               {$project: {'_id':0}}
           ],
           categories: [
               {$project: {_id:1, name:1, status:1, createdAt:1, updatedAt:1 }}
           ]
        }},
    ]);
}

exports.categoryFindByName = async (name)=>{
    return await Category.aggregate([
        {$match: {name}}
    ]);
}


exports.categoryFindByID = async (_id)=>{

    const ObjectId = mongoose.Types.ObjectId;
    return Category.aggregate([
        {$match: {_id: ObjectId(_id)}}
    ]);
}

exports.categoryUpdateService = async (_id, category)=>{
    return Category.findByIdAndUpdate(_id, {name: category}, {runValidators: true, new: true});
}


exports.categoryDeleteService = async (_id)=>{
    return Category.findByIdAndDelete(_id);
}








