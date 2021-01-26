const Node = require('../models/Node')
const Layer = require('../models/Layer')
const Map = require('../models/Map')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = {
	createLayer(req, res) {
        //check that user is logged in
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.statusCode(401)
			} else {
				const { map_id, layer_nodes, layer_description, start_date, end_date } = req.body
                
                //const map_id = await Map.findById(req.body.map_id)

				console.log("backend debug 1")
				console.log(req.body)
				// if (!map_id) {
				// 	return res.status(400).json({ message: 'Map does not exist!' })
				// }
				try {
					const layer = await Layer.create({
						map_id,
                        layer_nodes, 
                        layer_description, 
                        start_date, 
                        end_date
					})
					console.log("backend debug 2")
					return res.json(layer)
				} catch (error) {
					return res.status(400).json({ message: error })
				}
			}
		})

    },
    
    getLayerByMapId(req, res) {
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.sendStatus(401)
			} else {
				const { map_id } = req.params
				console.log("map_id: ", map_id)
				try {
					const layers = await Layer.find({map_id: map_id}).exec()
					console.log("layers: ", layers)
					if (layers) {
						return res.json({ authData: authData, layers: layers })
					}
				} catch (error) {
					return res.status(400).json({ message: 'layer_id does not exist!' })
				}
			}

		})
	},

	delete(req, res) {
		jwt.verify(req.token, 'secret', async (err) => {
			if (err) {
				res.statusCode(401)
			} else {
				const { layer_id } = req.params
				try {
					await Layer.findByIdAndDelete(layer_id)
					return res.status(204).send()

				} catch (error) {
					return res.status(400).json({ message: 'No layer found with that id' })
				}
			}
		})
	}
}