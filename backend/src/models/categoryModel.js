const {Schema, model} = require('mongoose');

const categorySchema = new Schema({

    name: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        lowercase: true,
        unique: [true, 'Category already exit']
    },
    postsID: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        }
    ],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }

}, {versionKey: false, timestamps: true});



const CategoryModel = model('Category', categorySchema);

module.exports = CategoryModel;
