const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
  status: {
    type: String,
    default: 'Pending',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
