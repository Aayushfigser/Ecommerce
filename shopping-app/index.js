const express = require('express');
const app = express();
const connectDB = require('./config/db'); // Import the db connection module
const { connectConsumer } = require('./kafka/Consumer');
const { connectProducer } = require('./kafka/Producer');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Connect Kafka producer and consumer
//connectProducer().catch(console.error);
//connectConsumer().catch(console.error);

// Use Routes
app.use('/api/v1.0/shopping', require('./routes/userRoutes'));
app.use('/api/v1.0/shopping', require('./routes/productRoutes'));
app.use('/api/v1.0/shopping', require('./routes/orderRoutes'));
app.use(express.static('build'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
