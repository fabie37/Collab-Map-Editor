const mongoose = require('mongoose')

const NodeSchema = new mongoose.Schema({
    node_title: String,
    node_layer_id: String,
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