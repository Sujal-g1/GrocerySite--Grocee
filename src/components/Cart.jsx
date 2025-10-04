// src/components/Cart.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { GoHeartFill } from "react-icons/go";
import { HiShoppingBag } from "react-icons/hi2";
import { TbMenu2, TbMenu3 } from "react-icons/tb";
import coupons from "./dataFiles/coupons";

const Cart = () => {
  const { cart, updateQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const toggleMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const total = subtotal - (subtotal * discount) / 100;

  const applyCoupon = () => {
    const c = coupons.find((c) => c.code === couponCode.toUpperCase());
    if (c) {
      setDiscount(c.discount);
      alert(`Coupon applied! ${c.discount}% off`);
    } else {
      alert("Invalid coupon");
      setDiscount(0);
    }
  };

  // const handlePayment = () => {
  //   if (
  //     !address.name ||
  //     !address.street ||
  //     !address.city ||
  //     !address.state ||
  //     !address.pincode ||
  //     !address.phone
  //   ) {
  //     return alert("Please fill all address fields");
  //   }
  //   alert(`Payment successful! Total: ₹${total}`);
  // };


  // payment stripe

  const handleCheckout = async () => {
  try {
    const response = await fetch('http://localhost:3000/create-session-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ cart }), // send cart
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url; // redirect to Stripe
    }
  } catch (error) {
    console.error("Error creating checkout session:", error);
  }
};


  return (
    <div className="p-6 pt-[14vh] md:pt-[16vh]">
      {/* Navbar */}
      <header
        className={`fixed top-0 right-0 left-0 z-50 bg-white ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <nav className="relative flex items-center md:h-[14vh] h-[12vh] max-w-[1400px] mx-auto px-10">
          <div className="flex-1"></div>
          <a
            href="#"
            className="absolute left-1/2 transform -translate-x-1/2 text-5xl font-bold hover:text-2xl transition-all duration-500"
          >
            Gr
            <span className="text-orange-500 uppercase hover:text-9xl  hover:text-green-800 transition-all duration-500">
              O
            </span>
            cee
          </a>
        
        </nav>
      </header>

      {/* navbar ends */}

      {cart.length === 0 ? (
        <p className="mt-10 text-center text-lg">No items in cart</p>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            {/* Left: Cart Items */}
            <div className="md:w-2/3 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border p-3 rounded"
                >
                  <span>{item.name}</span>

                  <input
                    type="number"
                    value={item.qty}
                    min="1"
                    onChange={(e) => updateQty(item.id, e.target.value)}
                    className="w-16 border rounded text-center"
                  />

                  <span>₹{item.price * item.qty}</span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Right: Total & Discount */}
            <div className="md:w-1/3 p-6 bg-gray-100 rounded-xl shadow space-y-4">
              <h2 className="text-2xl font-bold mb-2 text-center">Order Summary</h2>
              <div className="flex justify-between text-lg font-medium">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600 text-lg font-semibold">
                  <span>Discount:</span>
                  <span>- ₹{(subtotal * discount) / 100}</span>
                </div>
              )}

              <div className="flex justify-between text-2xl font-bold mt-2 border-t pt-2">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="border rounded px-2 py-1 flex-1"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-green-500 text-white px-4 rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Address Form (Full Width) */}
          <div className="mt-6 border-t pt-4 space-y-2">
            <h3 className="font-semibold text-lg">Delivery Address</h3>
            <div className="grid md:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Full Name"
                value={address.name}
                onChange={(e) => setAddress({ ...address, name: e.target.value })}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="text"
                placeholder="Street Address"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="text"
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>

          {/* Pay Button */}
          <button
           onClick={handleCheckout}
            className="w-full mt-4 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 text-lg font-semibold"
          >
            Pay Now
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
