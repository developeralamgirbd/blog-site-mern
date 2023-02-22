const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
	email: {
		type: String,
		validate: [validator.isEmail, "Provide a valid Email"],
		trim: true,
		lowercase: true,
		required: [true, "Email address is required"],
		unique: true
	},
	firstName: {
		type: String,
		required: [true, 'First name is required'],
		minLength: [3, 'First name must be 3 character'],
		maxLength: [100, 'First name is too large'],
		trim: true,
		lowercase: true
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
		minLength: [3, 'Last name must be 3 character'],
		maxLength: [100, 'Last name is too large'],
		trim: true,
		lowercase: true,

	},

	phone: {
		type: String,
		required: [true, 'Mobile number is required'],
		unique: true,
		validate: {
			validator: (value)=>
				validator.isMobilePhone(value, ['bn-BD']),
			message: 'Please provide a valid phone number, only BD mobile number support'
		}
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		validate:{
			validator: (value)=>
				validator.isStrongPassword(value, {
					minLength: 8,
					minUppercase: 1,
					minNumbers: 1,
					minSymbols: 1,
					minLowercase: 1
				}),
			message: 'Please provide a strong password'
		}
	},
	confirmPassword: {
		type: String,
		required: [true, 'Confirm Password is required'],
		validate: {
			validator: function(value){
				return value === this.password
			},
			message: 'Password does not match'
		}
	},
	status: {
		type: String,
		enum: ['active', 'inactive', 'blocked'],
		default: 'active'
	},
	confirmationToken: String,
	confirmationTokenExpire: Date,

	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,

	verified: {
		type: Boolean,
		default: false
	}

}, {versionKey: false, timestamps: true});

userSchema.pre('save', function(next){
	if(!this.isModified('password')){
		return next();
	}
	
	const password = this.password;
	this.password = bcrypt.hashSync(password);
	this.confirmPassword = undefined;
	next();
});


userSchema.methods.generateConfirmationToken = function(){
	const token = crypto.randomBytes(32).toString('hex');

	this.confirmationToken = token;

	let date = new Date();
	date.setMinutes( date.getMinutes() + 5);
	this.confirmationTokenExpire = date;
	return token;
};




userSchema.methods.comparePassword = function(password, hash){
	return bcrypt.compareSync(password, hash);
}

userSchema.methods.hashPassword = function(password){
	return bcrypt.hashSync(password);
}


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

