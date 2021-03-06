const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
dotenv.config();

const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');
const stripeRouter = require('./routes/stripe');
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json({ extended: true }));
app.use(cors());
app.options('*', cors());

// Database connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => console.log('Database connected...'))
  .catch((error) => console.log(error));

// Routes
app.get('/', (req, res) => res.send('Hello from WEB-SHOP API'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/checkout', stripeRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
