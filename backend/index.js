const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Product = require('./models/Product');
const Order = require('./models/Order');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const orderRoutes = require('./routes/orderRoutes');
app.use('/order', orderRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // Sync models - using force: true ONLY for development/initial setup to clear logic errors, 
        // but typically use alter: true or migrations in prod. 
        // For this specific task to ensure clean state:
        await sequelize.sync({ alter: true });
        console.log('Database connected and synced');

        // Seed a product if none exists
        const count = await Product.count();
        if (count === 0) {
            await Product.create({ name: 'Gadget', stock: 100 });
            console.log('Seeded initial product: Gadget (100 stock)');
        }

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
}

startServer();
