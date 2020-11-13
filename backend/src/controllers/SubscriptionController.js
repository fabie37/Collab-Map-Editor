const Subscription = require('../models/Subscription')
const jwt = require('jsonwebtoken')

module.exports = {
	create(req, res) {
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.sendStatus(401)
			} else {
				const user_id = authData.user._id
				const { eventId } = req.params

				const subscription = await Subscription.create({
					user: user_id,
					event: eventId
				})

				await subscription
					.populate('event')
					.populate('user', '-password')
					.execPopulate()


				const ownerSocket = req.connectUsers[subscription.event.user]
				if(ownerSocket) {
					req.io.to(ownerSocket).emit('subscription_request', subscription)
				}

				return res.json(subscription)
			}
		})
	},

	async getSubscription(req, res) {
		const { subscription_id } = req.params
		try {
			const subscription = await Subscription.findById(subscription_id)
			await subscription
				.populate('event')
				.populate('user', '-password')
				.execPopulate()

			return res.json(subscription)
		} catch (error) {
			return res.status(400).json({ message: 'Subscription not found' })
		}

	}
}