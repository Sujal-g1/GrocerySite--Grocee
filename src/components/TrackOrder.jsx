import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";


// Fix default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Custom bike icon
const bikeIcon = new L.Icon({
  iconUrl: "/bike.png",
  iconSize: [40, 40],
});

export default function TrackOrder() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const activeOrder = orders.find((o) => o.status === "in-progress");

  const driverStart = [28.672515787392967, 77.41391625415608];
  const [route, setRoute] = useState([]);
  const [bikePath, setBikePath] = useState([]);
  const [bikePos, setBikePos] = useState(driverStart);

  // Fetch route from backend
  useEffect(() => {
    if (!activeOrder) return;

    const fetchRoute = async () => {
      const res = await fetch(
        `http://localhost:3000/route?startLat=${driverStart[0]}&startLng=${driverStart[1]}&endLat=${activeOrder.address.lat}&endLng=${activeOrder.address.lng}`
      );
      const coords = await res.json();
      const latlngRoute = coords.map((c) => [c.lat, c.lng]);

      setRoute(latlngRoute);
      setBikePath([latlngRoute[0]]);
      setBikePos(latlngRoute[0]);

      animateBike(latlngRoute, activeOrder.deliveryTime || 300000);
    };

    fetchRoute();
  }, [activeOrder]);

  // Animate bike along route
  const animateBike = (coords, duration) => {
    if (!coords.length) return;
    let index = 1;
    const total = coords.length;
    const intervalTime = duration / total;

    const interval = setInterval(() => {
      if (index < coords.length) {
        setBikePos(coords[index]);
        setBikePath((prev) => [...prev, coords[index]]);
        index++;
      } else {
        clearInterval(interval);
        // Mark order delivered
        const updatedOrders = orders.map((o) =>
          o.id === activeOrder.id ? { ...o, status: "delivered" } : o
        );
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
      }
    }, intervalTime);
  };

  // Complete all active orders on page unload
  useEffect(() => {
    const handleUnload = () => {
      const updatedOrders = orders.map((o) =>
        o.status === "in-progress" ? { ...o, status: "delivered" } : o
      );
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  if (!activeOrder) return <p className="p-4">No active orders to track</p>;

  const center = route.length ? route[0] : driverStart;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Track Your Order</h2>

      {/* Map */}
      <div className="w-full h-[400px] mb-6 rounded overflow-hidden shadow">
        <MapContainer center={center} zoom={15} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {/* Full route */}
          {route.length > 0 && <Polyline positions={route} color="lightgray" weight={3} />}

          {/* Bike traveled path */}
          {bikePath.length > 1 && <Polyline positions={bikePath} color="red" weight={4} />}

          {/* Bike marker */}
          <Marker position={bikePos} icon={bikeIcon}>
            <Popup>Driver is on the way!</Popup>
          </Marker>

          {/* User address */}
          <Marker position={[activeOrder.address.lat, activeOrder.address.lng]}>
            <Popup>Your Address</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Order History */}
      <h3 className="text-xl font-semibold mb-2">Order History</h3>
      {orders.length === 0 ? (
        <p>No past orders</p>
      ) : (
        <ul className="space-y-2">
          {orders.slice().reverse().map((order) => (
            <li key={order.id} className="border p-2 rounded shadow-sm bg-white">
              <p>Order ID: <span className="font-medium">{order.id}</span></p>
              <p>Status: {order.status}</p>
              <p>Total: ₹{order.total} | Items: {order.cart.length}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
