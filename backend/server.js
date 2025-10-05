// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const stripe = require('stripe')('sk_test_51SEdIoFhowdWkgtRFg6mnH5rfVOetcRHEvafW69GPgkmaFEzPsf8kXC32Kg5KvH3YvWE29MQjGzJq1FjCXZJG1db000ZUlSvIq'); // <-- your Stripe key

app.use(express.json()); // parse JSON body
app.use(cors());

const YOUR_DOMAIN = 'http://localhost:5173';

/* ============================
   STRIPE CHECKOUT ROUTE
============================ */
app.post('/create-session-checkout', async (req, res) => {
  try {
    const { cart } = req.body;

    const line_items = cart.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100, // smallest currency unit
      },
      quantity: item.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

/* ============================
   ORDER TRACKING ROUTE
   Fetch route between driver and user
============================ */

// Replace with your OpenRouteService API key
const ORS_API_KEY = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjdmMWZhMmJkNTEyYjQ2MGViMzQwY2MyZTgwNTI2ZjMxIiwiaCI6Im11cm11cjY0In0=';

app.get("/route", async (req, res) => {
  try {
    const { startLat, startLng, endLat, endLng } = req.query;

    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${startLng},${startLat}&end=${endLng},${endLat}`;
    const response = await fetch(url);
    const data = await response.json();

    const coords = data.features[0].geometry.coordinates.map(([lng, lat]) => ({ lat, lng }));

    res.json(coords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch route" });
  }
});



/* ============================
   START SERVER
============================ */
app.listen(3000, () => console.log('Running on port 3000'));