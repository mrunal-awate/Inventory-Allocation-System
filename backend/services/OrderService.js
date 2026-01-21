const sequelize = require('../config/database');
const productRepository = require('../repositories/ProductRepository');
const orderRepository = require('../repositories/OrderRepository');

class OrderService {
    async createOrder(productId, quantity) {
        const t = await sequelize.transaction();

        try {
            // 1. Fetch Product with Lock
            const product = await productRepository.findById(productId, t);

            if (!product) {
                throw new Error('Product not found');
            }

            // 2. Validate Stock
            if (product.stock < quantity) {
                throw new Error('Insufficient stock');
            }

            // 3. Deduct Stock
            await productRepository.updateStock(product, quantity, t);

            // 4. Create Order
            const order = await orderRepository.create({
                productId,
                quantity,
                status: 'confirmed'
            }, t);

            await t.commit();
            return order;

        } catch (error) {
            await t.rollback();
            throw error;
        }
    }
}

module.exports = new OrderService();
