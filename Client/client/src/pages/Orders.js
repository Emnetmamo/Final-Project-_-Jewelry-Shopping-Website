import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaMoneyBillAlt, FaBoxOpen } from 'react-icons/fa';
import { MdPendingActions } from 'react-icons/md';
import { BsFillClockFill } from 'react-icons/bs';
import Modal from 'react-modal';
import API from '../api';
import '../assets/css/Orders.css';

const products = [
  { id: 1, name: 'Elegant Golden Ring', price: 499.99 },
  { id: 2, name: 'Sapphire and Diamond Ring', price: 699.99 },
  { id: 3, name: 'Elegant Flower Necklace', price: 499.99 },
  { id: 4, name: 'Diamond Earrings', price: 699.99 },
  { id: 5, name: 'Golden Vintage Watch', price: 499.99 },
  { id: 6, name: 'Sea Shell Earrings', price: 699.99 },
  { id: 7, name: 'Elegant Diamond Necklace', price: 499.99 },
  { id: 8, name: 'Golden Cafflin', price: 699.99 }
];

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newItem, setNewItem] = useState({ id: '', quantity: 1 });
  const [itemToEditIndex, setItemToEditIndex] = useState(null);
  const [itemToDeleteIndex, setItemToDeleteIndex] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get('/orders');
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sorted);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await API.delete(`/orders/${id}`);
      fetchOrders();
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  const handleDeleteItem = async () => {
    if (!selectedOrder || itemToDeleteIndex === null) return;
    const updatedItems = selectedOrder.items.filter((_, index) => index !== itemToDeleteIndex);

    try {
      await API.put(`/orders/${selectedOrder._id}`, { items: updatedItems });
      fetchOrders();
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const handlePay = async (id) => {
    try {
      await API.put(`/orders/pay/${id}`);
      fetchOrders();
    } catch (err) {
      console.error('Error paying order:', err);
    }
  };

  const openEditModal = (order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
    setNewItem({ id: '', quantity: 1 });
    setItemToEditIndex(null);
  };

  const openDeleteModal = (order) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
    setItemToDeleteIndex(null);
  };

  const handleExistingItemSelect = (e) => {
    const index = parseInt(e.target.value);
    setItemToDeleteIndex(index); 
  };

  const handleProductChange = (e) => {
    const id = parseInt(e.target.value);
    setNewItem({ ...newItem, id });
  };

  const handleQuantityChange = (e) => {
    setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 });
  };

  const handleSubmit = async () => {
    if (!selectedOrder || !newItem.id || newItem.quantity < 1) return;

    const selectedProduct = products.find(p => p.id === newItem.id);
    const updatedItem = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity: newItem.quantity
    };

    const updatedItems = [...selectedOrder.items];
    if (itemToEditIndex !== null) {
      updatedItems[itemToEditIndex] = updatedItem;
    } else {
      updatedItems.push(updatedItem);
    }

    try {
      await API.put(`/orders/${selectedOrder._id}`, { items: updatedItems });
      fetchOrders();
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-5" style={{ color: '#bfa046' }}>
        <FaBoxOpen className="me-2" /> Order Management
      </h2>

      <div className="table-responsive">
        <table className="table border-0">
          <thead style={{ backgroundColor: '#bfa046', color: '#fff' }}>
            <tr className="rounded">
              <th className="px-5 py-4 rounded-start"><BsFillClockFill className="me-2" /> Order No_</th>
              <th>Items</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="shadow-sm bg-white">
                <td className="px-5 py-4 fw-semibold align-middle">{order.orderNumber}</td>
                <td className="px-5 py-4 align-middle">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.name} – <span className="text-muted">{item.quantity} x ${item.price}</span>
                    </div>
                  ))}
                </td>
                <td className="px-5 py-4 align-middle">
                  {order.status === 'Pending' ? (
                    <span className="badge bg-warning text-dark p-2 fs-6">
                      <MdPendingActions className="me-2" /> Pending
                    </span>
                  ) : (
                    <span className="badge bg-success p-2 fs-6">
                      <FaMoneyBillAlt className="me-2" /> {order.status}
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 align-middle">{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  {order.status === 'Pending' ? (
                    <div className="d-flex flex-column gap-1">
                      <button className="btn btn-sm btn-success" onClick={() => handlePay(order._id)}>
                        Pay
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => openDeleteModal(order)}>
                        Delete
                      </button>
                      <button className="btn btn-sm btn-warning" onClick={() => openEditModal(order)}>
                        Edit
                      </button>
                    </div>
                  ) : (
                    <span className="text-muted">All Done!</span>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted py-5 fs-5">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit or Add Item"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h4>Edit Order</h4>

        {selectedOrder && selectedOrder.items.length > 0 && (
          <div className="form-group mt-3">
            <label>Select existing item to replace (optional):</label>
            <select className="form-control" onChange={handleExistingItemSelect}>
              <option value="">Add as new item</option>
              {selectedOrder.items.map((item, idx) => (
                <option key={idx} value={idx}>
                  {item.name} – {item.quantity} x ${item.price}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group mt-3">
          <label>Select Product:</label>
          <select className="form-control" value={newItem.id} onChange={handleProductChange}>
            <option value="">-- Choose a product --</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} - ${p.price}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mt-3">
          <label>Quantity:</label>
          <input
            type="number"
            className="form-control"
            value={newItem.quantity}
            onChange={handleQuantityChange}
            min="1"
          />
        </div>

        <div className="mt-4">
          <button className="btn btn-primary" onClick={handleSubmit}>
            {itemToEditIndex !== null ? 'Replace Item' : 'Add Item'}
          </button>
          <button className="btn btn-secondary ms-2" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        contentLabel="Delete Item or Order"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h4>Delete Item or Order</h4>
        <p>Select an item to delete or delete the whole order:</p>

        {selectedOrder && selectedOrder.items.length > 0 && (
          <div className="form-group">
            <label>Select Item to Delete:</label>
            <select className="form-control" onChange={handleExistingItemSelect}>
              <option value="">-- Select item to delete --</option>
              {selectedOrder.items.map((item, idx) => (
                <option key={idx} value={idx}>
                  {item.name} – {item.quantity} x ${item.price}
                </option>
              ))}
            </select>
            </div>
    )}

    <div className="mt-4">
      <button className="btn btn-danger" onClick={handleDeleteItem}>
        Delete Item
      </button>
      <button className="btn btn-danger ms-2" onClick={() => handleDeleteOrder(selectedOrder._id)}>
        Delete Order
      </button>
      <button className="btn btn-secondary ms-2" onClick={() => setIsDeleteModalOpen(false)}>
        Cancel
      </button>
    </div>
  </Modal>
</div>
);
};

export default OrderTable;