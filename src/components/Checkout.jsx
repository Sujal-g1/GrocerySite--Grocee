import React, { useState } from 'react';

const Checkout = () => {
  // Sample cart items (in real apps, fetch from context or props)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Apple', price: 2.5, quantity: 2 },
    { id: 2, name: 'Milk', price: 1.2, quantity: 1 },
    { id: 3, name: 'Broccoli', price: 3.0, quantity: 1 },
  ]);

  const [address, setAddress] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    if (!address) {
      alert('Please enter your address before proceeding.');
      return;
    }

    // Here you could add payment logic (e.g. Stripe, Razorpay etc.)
    setOrderConfirmed(true);
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-3xl mx-auto p-10">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Order Confirmed!</h1>
        <p className="text-lg">Thank you for your purchase. Your order will be delivered to:</p>
        <p className="font-semibold mt-2">{address}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Cart Items */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Items</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Item</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">${item.price.toFixed(2)}</td>
                <td className="p-3">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right text-xl font-semibold mt-4">
          Total: ${totalPrice.toFixed(2)}
        </div>
      </div>

      {/* Address Form */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
        <textarea
          className="w-full p-3 border rounded-md"
          rows={4}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your shipping address"
        ></textarea>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        className="bg-orange-500 text-white px-6 py-3 rounded-md font-bold hover:bg-orange-600 transition"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
