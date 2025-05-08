const Order = require('../models/Order');
const moment = require('moment');
const generateOrderNumber = () => {
  const timestamp = moment().format('YYYYMMDDHHmmss'); 
  return `ORD-${timestamp}`;
};

exports.createOrUpdateOrder = async (req, res) => {
  try {
    const items = req.body.items;
    const userId = req.user._id;  // Extracted from token via auth middleware

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items provided.' });
    }

    // Validate items
    const validatedItems = items.map((item, i) => {
      if (!item.name || typeof item.price !== 'number') {
        throw new Error(`Invalid item at index ${i}`);
      }
      return {
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      };
    });

    const startOfDay = moment().startOf('day').toDate();
    const endOfDay = moment().endOf('day').toDate();

    let existingOrder = await Order.findOne({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
      status: 'Pending',
      user: userId,
    });

    if (existingOrder) {
      existingOrder.items.push(...validatedItems);
      await existingOrder.save();
      return res.status(200).json({
        message: 'Order updated successfully.',
        order: existingOrder
      });
    } else {
      const newOrder = new Order({
        orderNumber: generateOrderNumber(),
        items: validatedItems,
        user: userId,
      });

      await newOrder.save();
      return res.status(201).json({
        message: 'Order created successfully.',
        order: newOrder
      });
    }
  } catch (err) {
    console.error('Order creation error:', err);
    return res.status(500).json({ message: 'Server error.', error: err.message });
  }
};


// GET all orders
exports.getAllOrders = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const orders = await Order.find({ user: userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


// UPDATE order - including item updates or additions
exports.updateOrder = async (req, res) => {
  try {
    const { items, status } = req.body; 

    if (items && !Array.isArray(items)) {
      return res.status(400).json({ error: 'Items must be an array' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: status || undefined, 
        items: items || undefined,
      },
      { new: true } 
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update order' });
  }
};

// DELETE order
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete order' });
  }
};

// PAY order (mark as Completed)
exports.payOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'Completed', updatedAt: Date.now() },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: 'Failed to complete payment' });
  }
};