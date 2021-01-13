const Map = require('../models/Map')
const Layer = require('../models/Layer')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = {
	createNode(req, res) {
        //check that user is logged in
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.statusCode(401)
			} else {
				const { node_category, connected_nodes, node_coordinates, node_start_date, node_end_date, node_description } = req.body
                
                const node_user_id = await User.findById(authData.user._id)
                const node_layer_id = await Layer.findById(req.body.layer_id)

				if (!node_user_id) {
					return res.status(400).json({ message: 'User does not exist!' })
                }
                if (!node_layer_id) {
					return res.status(400).json({ message: 'Layer does not exist!' })
				}

				try {
					const node = await Node.create({
                        node_user_id: authData.user._id,
                        node_layer_id: req.body.layer_id,
						node_category,
						connected_nodes,
                        node_coordinates,
                        node_start_date, 
                        node_end_date, 
                        node_description
					})

					return res.json(node)
				} catch (error) {
					return res.status(400).json({ message: error })
				}
			}
		})

    },
    
    getNodeById(req, res) {
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.sendStatus(401)
			} else {
				const { node_id } = req.params
				try {
					const nodes = await Node.findById(node_id)

					if (nodes) {
						return res.json({ authData: authData, nodes: nodes })
					}
				} catch (error) {
					return res.status(400).json({ message: 'node_id does not exist!' })
				}
			}

		})
	},

	delete(req, res) {
		jwt.verify(req.token, 'secret', async (err) => {
			if (err) {
				res.statusCode(401)
			} else {
				const { node_id } = req.params
				try {
					await Node.findByIdAndDelete(node_id)
					return res.status(204).send()

				} catch (error) {
					return res.status(400).json({ message: 'No node found with that id' })
				}
			}
		})
	}
}