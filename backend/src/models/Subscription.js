const mongoose = require('mongoose')


//************************************************************************************************* */
// DEPRECATED - leftover from another project, will be removed, use only as a code template!!!
//************************************************************************************************* */



const SubscriptionSchema = new mongoose.Schema({
	date: () => Date.now(),
	approved: Boolean,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	event: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event'
	}
})

module.exports = mongoose.model('Subscription', SubscriptionSchema)