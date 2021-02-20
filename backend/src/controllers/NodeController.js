const Map = require('../models/Map')
const Layer = require('../models/Layer')
const Node = require('../models/Node')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = {
	createNode(req, res) {
        //check that user is logged in
		jwt.verify(req.token, 'secret', async (err, authData) => {
			console.log("Api call coming in!")

			if (err) {
				console.log("Api call fails on 401")
				res.statusCode(401)
			} else {
				console.log("Api call makes it to else")
				const { node_title, node_layer_id, node_category, connected_nodes, node_coordinates, node_start_date, node_end_date, node_description } = req.body
                
                const node_user_id = await User.findById(authData.user._id)
                //const node_layer_id = await Layer.findById(req.body.layer_id)

				if (!node_user_id) {
					console.log("Api call user id doesnt exist")
					return res.status(400).json({ message: 'User does not exist!' })
                }
                if (!node_layer_id) {
					console.log("Api call layer id doesnt exist")
					return res.status(400).json({ message: 'Layer does not exist!' })
				}

				try {
					const node = await Node.create({
						node_title,
                        node_user_id: authData.user._id,
                        node_layer_id,
						node_category,
						connected_nodes,
                        node_coordinates,
                        node_start_date, 
                        node_end_date, 
                        node_description
					})
					console.log("Api call node created")
					return res.json(node)
				} catch (error) {
					console.log("Api call node creation failed" + error)
					return res.status(400).json({ message: error })
				}
			}
		})

	},
	
	getNodeByLayerId(req, res) {
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.sendStatus(401)
			} else {
				const { layer_id } = req.params
				console.log("layer_id:", layer_id)
				if(layer_id == undefined){
					try {
						const nodes = await Node.find({})
						console.log("nodes: ", nodes)
						if (nodes) {
							return res.json({ authData: authData, nodes: nodes })
						}
					} catch (error) {
						return res.status(400).json({ message: 'layer_id does not exist!' })
					}
				}else {
					try {
						const nodes = await Node.find({node_layer_id: layer_id}).exec()
						console.log("nodes: ", nodes)
						if (nodes) {
							return res.json({ authData: authData, nodes: nodes })
						}
					} catch (error) {
						return res.status(400).json({ message: 'layer_id does not exist!' })
					}
				}
			}
		})
	},
    
    // getNodeByLayerId(req, res) {
	// 	jwt.verify(req.token, 'secret', async (err, authData) => {
	// 		if (err) {
	// 			res.sendStatus(401)
	// 		} else {
	// 			const layer_id = req.body.layer_id
	// 			console.log("layer_id: ", layer_id)
	// 			try {
	// 				const nodes = await Node.find({node_layer_id: layer_id}).exec()
	// 				console.log("nodes: ", nodes)
	// 				if (nodes) {
	// 					return res.json({ authData: authData, nodes: nodes })
	// 				}
	// 			} catch (error) {
	// 				return res.status(400).json({ message: 'layer_id does not exist!' })
	// 			}
	// 		}

	// 	})
	// },

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