const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	password: String,
	email: String,
	profilePic: String,
}, {
	toJSON: {
		virtuals: true
	}
})

UserSchema.virtual('profilePic_url').get(function () { return `http://localhost:8000/files/${this.profilePic}` })

module.exports = mongoose.model('User', UserSchema)
