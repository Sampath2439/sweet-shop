
import React from 'react';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, checkout } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    checkout();
    navigate('/orders');
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-neutral-700 mb-6">Looks like you haven't added any sweets yet.</p>
        <Link to="/"><Button>Start Shopping</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-neutral-900 mb-6">Your Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-6 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
              <div className="flex items-center gap-4">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-neutral-600">₹{item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-neutral-200 rounded-lg">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.purchaseQuantity - 1)}
                    className="px-3 py-1 text-lg font-semibold text-neutral-700 hover:bg-neutral-100 rounded-l-lg transition"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 font-medium text-neutral-900 select-none">{item.purchaseQuantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.purchaseQuantity + 1)}
                    disabled={item.purchaseQuantity >= item.quantity}
                    className="px-3 py-1 text-lg font-semibold text-neutral-700 hover:bg-neutral-100 rounded-r-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-medium text-sm">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-2xl font-bold border-b pb-4 mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t pt-4">
            <span>Total</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <Button onClick={handleCheckout} className="w-full mt-6">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
