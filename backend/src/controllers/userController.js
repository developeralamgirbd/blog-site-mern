const validator = require("validator");
const {createToken, comparePassword, hashPassword} = require('../helper/auth');

const { registerService, userDetailsService, userFindByEmailService, userProfileUpdateService, passwordUpdateService }  = require('../services/userService/userService');

exports.register = async (req, res)=>{
	try{

		const user = await registerService(req.body);
		const token = user.generateConfirmationToken();

		await user.save({ validateBeforeSave: false });

		user.password = undefined;

		res.status(200).json({
			status: 'success',
			message: 'Successfully registered',
			data: user
		})
		
	}catch(error){
		console.log(error)
		res.status(500).json({
			status: 'fail',
			error: error.message
		})
	}
};

exports.login = async (req, res) => {
	try {
		const {email, password}  = req.body;

		const user = await userFindByEmailService(email);

		if (!user[0]){
			return res.status(400).json({
				status: 'fail',
				error: 'User not found. Please create an account'
			})
		}

		const isPasswordValid = comparePassword(password, user[0].password);

		if(!isPasswordValid){
			return res.status(400).json({
				status: 'fail',
				error: 'Password is not correct'
			})
		}

		if(user[0].status !== 'active'){
			return res.status(400).json({
				status: 'fail',
				error: 'Your account is not active. please contact Administrator'
			})
		}

		const token = createToken(user[0]);
		user[0].password = undefined;

		res.cookie('token', token, {
			httpOnly: true,
			// secure: true // only works https
		})

		res.status(200).json({
			status: 'success',
			message: "successfully logged in",
			data: {
				user: user[0],
				token
			}
		})
	}catch (error) {
		console.log(error);
		res.status(500).json({
			status: "fail",
			error: error.message,
		});
	}
};

exports.profile = async (req, res)=>{
	try {
		const User = await userDetailsService(req.auth?.email);

		if (!User[0]){
			return res.status(401).json({
				status: 'fail',
				error: 'User not found'
			});
		}

		res.status(200).json({
			status: 'success',
			data: User[0]
		})

	}catch (error) {
		console.log(error)
		res.status(401).json({
			status: 'fail',
			error: error.message
		})
	}
};

exports.profileUpdate = async (req, res)=>{
	try {

		const User = await userProfileUpdateService(req.auth?._id, req.body);

		if (!User){
			return res.status(400).json({
				status: 'fail',
				error: 'Profile not updated'
			})
		}

		res.status(200).json({
			status: 'Profile successfully updated',
			data: User
		})
	}catch (error) {
		console.log(error)
		res.status(400).json({
			status: 'fail',
			error: error.message
		});
	}
}


exports.passwordUpdate = async (req, res)=>{
	try {
		const oldPassword = req.body.oldPassword;
		const password = req.body.password;
		const confirmPassword = req.body.confirmPassword;

		if(oldPassword === ''){
			return res.status(400).json({
				status: 'fail',
				error: "Old password is required"
			});
		}

		const user = await userFindByEmailService(req.auth?.email);

		const userHashPassword =  user[0] ? user[0].password : '';

		const isPasswordValid = comparePassword(oldPassword, userHashPassword);

		if (!isPasswordValid){
			return res.status(400).json({
				status: 'fail',
				error: "Old password doesn't match"
			});
		}

		const isValidate = validator.isStrongPassword(password, {
			minLength: 8,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1,
			minLowercase: 1
		})
		if (!isValidate){
			return res.status(400).json({
				status: 'fail',
				error: "Password is not strong, please provide a strong password"
			});
		}
		if (password !== confirmPassword){
			return res.status(400).json({
				status: 'fail',
				error: "Password doesn't match"
			});
		}

		const hash = hashPassword(password);

		await passwordUpdateService(req.auth?.email, hash);

		res.status(200).json({
			status: 'success',
			message: 'Password changed successfully'
		});

	}catch (error) {
		console.log(error)
		res.status(500).json({
			status: 'fail',
			error: error.message
		});
	}
}





