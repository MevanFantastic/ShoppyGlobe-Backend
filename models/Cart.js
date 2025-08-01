const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity:{ type: Number, required: true, default: 1 }
});

module.exports = mongoose.model('Cart', cartSchema);
