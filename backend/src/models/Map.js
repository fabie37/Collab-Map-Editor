const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
    node_title: { type: String, default: 'New Node' },
    node_layer_id: String,
    node_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    layer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Layer',
    },
    node_category: String,
    connected_nodes: Array,
    node_coordinates: Array,
    node_start_date: Date,
    node_end_date: Date,
    node_description: { type: String, default: 'Node Description' },
});

const LayerSchema = new mongoose.Schema({
    map_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Map' },
    layer_nodes: [NodeSchema],
    layer_description: {
        type: String,
        required: [true, 'Please enter a layer description'],
    },
    start_date: Date,
    end_date: Date,
});

const MapSchema = new mongoose.Schema({
    map_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    map_title: {
        type: String,
        required: [true, 'Please enter a map title'],
    },
    map_layers: {
        type: [LayerSchema],
        default: [
            {
                layer_description: 'My First Layer',
            },
        ],
    },
    map_type: {
        type: String,
        default: 'None',
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        default: null,
    },
    is_public: Boolean,
});

module.exports = mongoose.model('Map', MapSchema);
