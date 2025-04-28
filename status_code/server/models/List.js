const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  responseCodes: [String],
  images: [String]
});

module.exports = mongoose.model('List', ListSchema);
