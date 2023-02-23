const {Schema, model} = require('mongoose');

const categorySchema = new Schema({

    name: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        lowercase: true,
        unique: [true, 'Category already exit']
    }

}, {versionKey: false, timestamps: true});



const CategoryModel = model('Category', categorySchema);

module.exports = CategoryModel;
