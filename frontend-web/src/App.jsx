import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
    const [productId, setProductId] = useState('')
    const [quantity, setQuantity] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('') 

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        setMessage('Processing...')

        try {
            const response = await axios.post('http://localhost:3000/order', {
                productId: parseInt(productId),
                quantity: parseInt(quantity)
            })
            setStatus('success')
            setMessage(`Success: ${response.data.message} (Order ID: ${response.data.order.id})`)
        } catch (error) {
            setStatus('error')
            if (error.response) {
                setMessage(`Error: ${error.response.data.message}`)
            } else {
                setMessage('Error: Network or Server Error')
            }
        }
    }

    return (
        <div className="container">
            <h1>Inventory Order System</h1>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Product ID:</label>
                        <input
                            type="number"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Quantity:</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                            min="1"
                        />
                    </div>
                    <button type="submit" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Placing Order...' : 'Place Order'}
                    </button>
                </form>
                {message && <div className={`message ${status}`}>{message}</div>}
            </div>
        </div>
    )
}

export default App
