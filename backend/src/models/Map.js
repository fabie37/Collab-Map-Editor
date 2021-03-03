const mongoose = require('mongoose');

// New layout for map api
// map -> [layers] -> [nodes]

const NodeSchema = new mongoose.Schema({
    node_title: String,
    node_layer_id: String,
    node_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    node_category: String,
    connected_nodes: Array,
    node_coordinates: Array,
    node_start_date: Date,
    node_end_date: Date,
    node_description: String,
    //embedded_media: Array???
});

const LayerSchema = new mongoose.Schema({
    map_id: String,
    layer_nodes: [NodeSchema],
    layer_description: String,
    start_date: Date,
    end_date: Date,
});

const MapSchema = new mongoose.Schema({
    map_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    map_title: String,
    map_layers: { type: [LayerSchema], default: () => ({}) },
    map_type: String,
    is_public: Boolean,
});

module.exports = mongoose.model('Map', MapSchema);
