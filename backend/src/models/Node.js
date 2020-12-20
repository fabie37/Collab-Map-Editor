const mongoose = require('mongoose')

const NodeSchema = new mongoose.Schema({
    layer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Layer'
	},
    node_user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
    node_category: String,
    connected_nodes: Array,
    node_coordinates: Array,
    node_start_date: Date,
    node_end_date: Date,
    node_description: String,
    //embedded_media: Array???
})

module.exports = mongoose.model('Node', NodeSchema)