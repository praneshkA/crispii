import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, XCircle, MapPin, Phone, User } from 'lucide-react';
import axios from 'axios';
import { BASE_API_URL } from '../config';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState(null);

  // Track userId from sessionStorage so we refetch when user logs in/out
  const [authUserId, setAuthUserId] = React.useState(() => sessionStorage.getItem('userId'));

  useEffect(() => {
    fetchOrders();

    // Listen for storage changes (other tabs) to refresh orders when userId changes
    const onStorage = (e) => {
      if (e.key === 'userId') {
        setAuthUserId(e.newValue);
      }
    };
  window.addEventListener('storage', onStorage);
  return () => window.removeEventListener('storage', onStorage);
  }, [authUserId]);

  const fetchOrders = async () => {
    try {
      // Get userId from sessionStorage (from login)
      const userId = sessionStorage.getItem('userId');

      if (!userId) {
        setError('Please login to view your orders');
        setOrders([]);
        setLoading(false);
        return;
      }

      const url = `${BASE_API_URL}/api/orders/user/${userId}`;
      setDebugInfo({ url, status: 'pending' });
      const response = await axios.get(url);

      setDebugInfo({ url, status: response.status, data: response.data });

      if (response.data && response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        setOrders([]);
        setError((response.data && response.data.message) || 'Failed to load orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
      setDebugInfo({ error: err && err.response ? err.response.data : err.message || String(err) });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
      processing: 'bg-purple-100 text-purple-800 border-purple-300',
      shipped: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      delivered: 'bg-green-100 text-green-800 border-green-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-5 h-5" />,
      confirmed: <CheckCircle className="w-5 h-5" />,
      processing: <Package className="w-5 h-5" />,
      shipped: <Truck className="w-5 h-5" />,
      delivered: <CheckCircle className="w-5 h-5" />,
      cancelled: <XCircle className="w-5 h-5" />
    };
    return icons[status] || <Package className="w-5 h-5" />;
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pending Payment',
      confirmed: 'Payment Confirmed',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    };
    return labels[status] || status;
  };

  const getOrderProgress = (status) => {
    const progress = {
      pending: 20,
      confirmed: 40,
      processing: 60,
      shipped: 80,
      delivered: 100,
      cancelled: 0
    };
    return progress[status] || 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          {error.includes('login') && (
            <button
              onClick={() => window.location.href = '/login'}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Go to Login
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
          {debugInfo && (
            <pre className="text-xs text-left bg-gray-100 p-2 mt-3 rounded text-gray-700 max-w-3xl mx-auto overflow-auto">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <Package className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Orders List */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order History</h2>
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  onClick={() => setSelectedOrder(order)}
                  className={`bg-white rounded-xl shadow-md p-4 cursor-pointer transition hover:shadow-xl ${
                    selectedOrder?.orderId === order.orderId ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-800">#{order.orderId}</h3>
                    {getStatusIcon(order.orderStatus)}
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.orderStatus)}`}>
                    {getStatusLabel(order.orderStatus)}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <p className="font-semibold text-gray-800">₹{order.totalAmount}</p>
                    <p className="text-xs mt-1">{new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Details */}
            {selectedOrder ? (
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  {/* Order Header */}
                  <div className="border-b pb-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-800">Order #{selectedOrder.orderId}</h2>
                      <div className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(selectedOrder.orderStatus)}`}>
                        {getStatusLabel(selectedOrder.orderStatus)}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    {selectedOrder.orderStatus !== 'cancelled' && (
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-500"
                            style={{ width: `${getOrderProgress(selectedOrder.orderStatus)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-600">
                          <span>Pending</span>
                          <span>Processing</span>
                          <span>Shipped</span>
                          <span>Delivered</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Customer Details */}
                  <div className="mb-6">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Shipping Details
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                      <p className="font-semibold text-gray-800">
                        {selectedOrder.customerDetails.firstName} {selectedOrder.customerDetails.lastName}
                      </p>
                      <p className="flex items-start">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
                        <span>
                          {selectedOrder.customerDetails.address}
                          {selectedOrder.customerDetails.apartment && `, ${selectedOrder.customerDetails.apartment}`}
                          <br />
                          {selectedOrder.customerDetails.city}, {selectedOrder.customerDetails.state} - {selectedOrder.customerDetails.pincode}
                        </span>
                      </p>
                      <p className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        {selectedOrder.customerDetails.phone}
                      </p>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="mb-6">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      Order Items
                    </h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center gap-4">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            )}
                            <div>
                              <p className="font-semibold text-gray-800">{item.name}</p>
                              <p className="text-sm text-gray-600">
                                {item.selectedQuantity} × {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="font-bold text-gray-800">₹{item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="border-t pt-6">
                    <h3 className="font-bold text-gray-800 mb-4">Payment Information</h3>
                    <div className="bg-blue-50 rounded-xl p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Payment Status:</span>
                        <span className="font-semibold text-gray-800">{selectedOrder.paymentStatus}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-blue-200">
                        <span>Total Amount:</span>
                        <span className="text-blue-600">₹{selectedOrder.totalAmount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Timestamps */}
                  <div className="mt-6 pt-6 border-t text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Order Placed:</span>
                      <span className="font-semibold">{new Date(selectedOrder.createdAt).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span>Last Updated:</span>
                      <span className="font-semibold">{new Date(selectedOrder.updatedAt || selectedOrder.createdAt).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-2 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Package className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Select an order to view details</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;