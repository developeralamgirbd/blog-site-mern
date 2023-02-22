const mongoose = require("mongoose");
const Post = require("../../models/postModel");
const ObjectId = mongoose.Types.ObjectId;

exports.showAllPostService = async (authorID)=>{
	return await Post.aggregate([
		{$match: { authorID: ObjectId(authorID)}},

		{$lookup: {
				from: 'users',
				localField: 'authorID',
				foreignField: '_id',
				as: 'authorInfo'
			}},
		{$lookup: {
				from: 'categories',
				localField: 'categoryID',
				foreignField: '_id',
				as: 'categoryInfo'
			}},

		{$facet: {
				totalPost: [
					{$group: {_id:0, count: {$sum: 1}}},
					{$project: {'_id': 0}}
				],
				posts: [
					{$addFields: {
							authorInfo: {$first: "$authorInfo"},
						}},

					{$project: {
							_id: 1,
							title: 1,
							description: 1,
							status:1,
							createDate: "$createdAt",
							updateDate: "$updatedAt",
							authorName: {$concat: ["$authorInfo.firstName", " ", '$authorInfo.lastName'] },
							categoryName: {$first: "$categoryInfo.name"},
						}
					}
				]
			}},

	])
}

exports.showPostByCategoryService = async (categoryID)=>{
	return await Post.aggregate([
		{
			$match: {
				categoryID: ObjectId(categoryID)
			}
		},

		{$lookup: {
				from: 'users',
				localField: 'authorID',
				foreignField: '_id',
				as: 'authorInfo'
			}},
		{$lookup: {
				from: 'categories',
				localField: 'categoryID',
				foreignField: '_id',
				as: 'categoryInfo'
			}},

		{$facet: {
				totalPost: [
					{$group: {_id:0, count: {$sum: 1}}},
					{$project: {'_id': 0}}
				],
				posts: [
					{$addFields: {
							authorInfo: {$first: "$authorInfo"},
						}},

					{$project: {
							title: 1,
							description: 1,
							status:1,
							createDate: "$createdAt",
							updateDate: "$updatedAt",
							authorName: {$concat: ["$authorInfo.firstName", " ", '$authorInfo.lastName'] },
							categoryName: {$first: "$categoryInfo.name"},
						}
					}
				]
			}},
	]);
}

exports.showPostByStatusService = async (authorID, status)=>{
	return await Post.aggregate([
		{$match: { authorID: ObjectId(authorID), status }},

		{$lookup: {
				from: 'users',
				localField: 'authorID',
				foreignField: '_id',
				as: 'authorInfo'
			}},
		{$lookup: {
				from: 'categories',
				localField: 'categoryID',
				foreignField: '_id',
				as: 'categoryInfo'
			}},

		{$facet: {
				totalPost: [
					{$group: {_id:0, count: {$sum: 1}}},
					{$project: {'_id': 0}}
				],
				posts: [
					{$addFields: {
							authorInfo: {$first: "$authorInfo"},
						}},

					{$project: {
							title: 1,
							description: 1,
							status:1,
							createDate: "$createdAt",
							updateDate: "$updatedAt",
							authorName: {$concat: ["$authorInfo.firstName", " ", '$authorInfo.lastName'] },
							categoryName: {$first: "$categoryInfo.name"},

						}
					}
				]
			}},
	]);
}

exports.searchPostService = async (authorID, search)=>{
	return await Post.aggregate([
		{$match: { authorID: ObjectId(authorID), title: {$regex: search, $options: "i" }}},

		{$lookup: {
				from: 'users',
				localField: 'authorID',
				foreignField: '_id',
				as: 'authorInfo'
			}},
		{$lookup: {
				from: 'categories',
				localField: 'categoryID',
				foreignField: '_id',
				as: 'categoryInfo'
			}},

		{$facet: {
				totalPost: [
					{$group: {_id:0, count: {$sum: 1}}},
					{$project: {'_id': 0}}
				],
				posts: [
					{$addFields: {
							authorInfo: {$first: "$authorInfo"},
						}},

					{$project: {
							title: 1,
							description: 1,
							status:1,
							createDate: "$createdAt",
							updateDate: "$updatedAt",
							authorName: {$concat: ["$authorInfo.firstName", " ", '$authorInfo.lastName'] },
							categoryName: {$first: "$categoryInfo.name"},

						}
					}
				]
			}},
	]);
}
