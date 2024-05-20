const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');

const app = express();
const PORT = process.env.PORT || 3000;

const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY_ID',
  key_secret: 'YOUR_RAZORPAY_KEY_SECRET'
});

app.use(bodyParser.json());

// Endpoint to handle payment verification
app.post('/verify-payment', (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  const params = {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature
  };

  razorpay.payments.capture(razorpay_payment_id, params)
    .then((response) => {
      console.log('Payment captured:', response);
      // Handle successful payment
      res.status(200).json({ success: true, message: 'Payment successful' });
    })
    .catch((error) => {
      console.error('Payment capture error:', error);
      res.status(500).json({ success: false, message: 'Payment capture error' });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
