import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const OrdersPage: React.FC = () => {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4 text-neutral-900">No Orders Yet</h1>
        <p className="text-neutral-700 mb-6">You haven't placed any orders with us. Let's change that!</p>
        <Link to="/"><Button>Browse Sweets</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-neutral-900 mb-6">Your Orders</h1>
      <div className="space-y-6">
        {orders.slice().reverse().map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <div>
                <h2 className="text-lg font-semibold">Order #{order.id.split('-')[1]}</h2>
                <p className="text-sm text-neutral-600">
                  Placed on: {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">Total: ₹{order.total.toFixed(2)}</p>
              </div>
            </div>
            <div className="space-y-2">
              {order.items.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-md object-cover"/>
                      <div>
                        <span>{item.name}</span>
                        <span className="text-sm text-neutral-500 ml-2"> (x{item.purchaseQuantity})</span>
                      </div>
                   </div>
                  <span>₹{(item.price * item.purchaseQuantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;