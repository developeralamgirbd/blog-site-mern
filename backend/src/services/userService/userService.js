const User = require('../../models/userModel');

exports.registerService = async(userData)=>{

	const user = new User(userData);
	await user.save();
	return user;
};

exports.userDetailsService = async (email)=>{
	return await User.aggregate(  [
		{$match: {email } },
		{$project: {_id:0, password: 0, confirmationToken: 0, confirmationTokenExpire:0,createdAt:0, updatedAt: 0, passwordChangedAt: 0, passwordResetToken: 0, passwordResetExpires: 0}}
	] );
};



exports.userFindByEmailService = async (email)=>{
	return User.aggregate(  [
		{$match: {email } }
	] );
};



exports.passwordUpdateService = async (email, hashPassword)=>{
	const user = await User.updateOne(
		{email: email},
		{$set: {
				password: hashPassword,
				passwordChangedAt: new Date()
			}}
	);
	return user;
}

exports.userProfileUpdateService = async (_id, firstName, lastName)=>{
	 const user = await User.updateOne({_id}, {$set: {
			 firstName,
			 lastName,
		 }}, {runValidators: true});
	return user;
}




