const { default: mongoose } = require('mongoose');

const Counter = mongoose.model('Counter', { contentId: String });

module.exports = { Counter };
