require('dotenv').config();
const express = require('express');
const cors = require('cors');

const checkoutRoutes = require('./routes/checkout');
const webhookRoutes = require('./routes/webhook');
const ordersRoutes = require('./routes/orders');
const downloadRoutes = require('./routes/download');
const resendRoutes = require('./routes/resend');
const leadRoutes = require('./routes/lead');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));

// IMPORTANT: the Stripe webhook needs the raw request body to verify the
// signature. The raw parser is scoped to exactly this path so it never
// swallows the body of any other /api route before express.json() below
// gets a turn at it.
app.use('/api/webhook', express.raw({ type: 'application/json' }));
app.use('/api', webhookRoutes);

app.use(express.json());

app.use('/api', checkoutRoutes);
app.use('/api', ordersRoutes);
app.use('/api', downloadRoutes);
app.use('/api', resendRoutes);
app.use('/api', leadRoutes);
app.use('/api', adminRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`asbestosadvice backend listening on http://localhost:${port}`);
});
