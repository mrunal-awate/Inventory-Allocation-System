const orderService = require('../services/OrderService');

class OrderController {
    async createOrder(req, res) {
        const { productId, quantity } = req.body;

        if (!productId || !quantity || quantity <= 0) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        try {
            const order = await orderService.createOrder(productId, quantity);
            res.status(201).json({ message: 'Order created successfully', order });
        } catch (error) {
            if (error.message === 'Product not found') {
                res.status(404).json({ message: error.message });
            } else if (error.message === 'Insufficient stock') {
                res.status(400).json({ message: error.message });
            } else {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
}

module.exports = new OrderController();
