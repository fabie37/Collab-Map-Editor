const mongoose = require('mongoose');

const LayerSchema = new mongoose.Schema({
    map_id: String,
    layer_nodes: Array,
    layer_description: String,
    start_date: Date,
    end_date: Date,
});

module.exports = mongoose.model('Layer', LayerSchema);
