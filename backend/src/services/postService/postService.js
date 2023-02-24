const mongoose = require("mongoose");
const Post = require("../../models/postModel");
const ObjectId = mongoose.Types.ObjectId;

exports.postCreateService = async (postBody)=>{
	const category = new Post(postBody);
	await category.save();
	return category;
}

exports.authShowAllPostService = async (authorID)=>{
	return Post.aggregate([
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
					},
					{$limit: 12},
					{$sort: {createDate: -1}}
				]
			}},

	])
}

exports.showAllPostService = async ()=>{
	return Post.aggregate([
		{$match: { }},

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
					},
					{$limit: 12},
					{$sort: {createDate: -1}}
				]
			}},

	])
}

exports.showPostByCategoryService = async (query)=>{

	return Post.aggregate([
		{
			$match: query
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

exports.searchPostService = async (searchQuery)=>{

	 return Post.aggregate([
		{$match: searchQuery},

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

exports.postByID = async (_id)=>{

	return Post.aggregate([
		{$match: { _id: ObjectId(_id)}},

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

exports.postUpdateService = async (_id, authorID, updateBody)=>{
	return Post.updateOne({authorID:  ObjectId(authorID), _id: ObjectId(_id)}, updateBody, {runValidators: true});
}

exports.postDeleteService = async (authorID, _id)=>{

	return Post.remove({authorID:  ObjectId(authorID), _id: ObjectId(_id)});
}

