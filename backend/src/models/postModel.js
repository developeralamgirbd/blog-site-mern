const {Schema, model} = require('mongoose');

const postSchema = new Schema({

        title: {
            type: String,
            required: [true, 'Title is required'],
            unique: [true, 'Title is already exit'],
            trim: true,
            lowercase: true,
            minLength: [3, 'Title must be at least 3 character'],
            maxLength: [100, 'Title is too large']
        },

        description: {
            type: String,
            required: [true, 'Description is required']
        },

        status: {
            type: String,
            enum:{
                values: ['published', 'pending', 'draft'],
                message: '{VALUE} is not accepted, please provide published, pending and draft'
            },
            default: 'published'
        },
        categoryID: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
        },
        authorID: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }

}, {versionKey: false, timestamps: true});



const PostModel = model('Post', postSchema);

module.exports = PostModel;

