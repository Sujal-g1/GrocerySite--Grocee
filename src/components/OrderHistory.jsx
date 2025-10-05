const OrderHistory = () => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) return <p>No past orders</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <ul className="space-y-2">
        {orders.map(order => (
          <li key={order.id} className="border p-2 rounded">
            <p><strong>Total:</strong> ₹{order.total}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Address:</strong> {order.address.street}, {order.address.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
