const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Please enter a group name'] },
});

module.exports = mongoose.model('Group', GroupSchema);
