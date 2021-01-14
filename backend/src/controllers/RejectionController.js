const Subscription = require('../models/Subscription')
const jwt = require('jsonwebtoken')

//************************************************************************************************* */
// DEPRECATED - leftover from another project, will be removed, use only as a code template!!!
//************************************************************************************************* */

module.exports = {
	rejection(req, res) {
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.sendStatus(401)
			} else {
				const { subscription_id } = req.params

				try {
					const subscription = await Subscription.findById(subscription_id);

					if (subscription) {
						subscription.approved = false
						await subscription.save()

						return res.json(subscription)
					}

				} catch (error) {
					return res.status(400).json(error)
				}
			}
		})
	}
}