// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const stripe = require('stripe')('sk_test_51SEdIoFhowdWkgtRFg6mnH5rfVOetcRHEvafW69GPgkmaFEzPsf8kXC32Kg5KvH3YvWE29MQjGzJq1FjCXZJG1db000ZUlSvIq'); // <-- use your Stripe secret key

app.use(express.json()); // <-- important to parse JSON body
app.use(cors());

const YOUR_DOMAIN = 'http://localhost:5173';

app.post('/create-session-checkout', async (req, res) => {
  try {
    const { cart } = req.body; // cart comes from frontend

    const line_items = cart.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe uses smallest currency unit (paise)
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

    res.json({ url: session.url }); // send URL back
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

app.listen(3000, () => console.log('Running on port 3000'));
