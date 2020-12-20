const mongoose = require('mongoose')

const MapSchema = new mongoose.Schema({
    map_user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
    map_layers: Array,
    map_type: String,
    is_public: Boolean
})

module.exports = mongoose.model('Map', MapSchema)