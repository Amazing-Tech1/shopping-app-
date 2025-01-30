import React, { useContext, useEffect, useState } from 'react';
import './Orders.css';
import { ShopContext } from '../../ShopContext';
import axios from '../../../axios';
import { AuthContext } from '../../AuthContext';

function Orders() {
    const { products } = useContext(ShopContext);
    const { isAuth } = useContext(AuthContext)
    const [orderData, setOrderData] = useState([])

    async function getUsersOrders() {
        try {
            const response = await axios.get('/order/userorders', {
                headers: {
                    'Content-Type': 'application/json',
                }, withCredentials: true
            })
            if (response.data.success) {
                let allOrdersItem = []
                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItem.push(item)
                    })
                })
                console.log(allOrdersItem)
                setOrderData(allOrdersItem.reverse())
            }
            else {
                console.log("Expected 'orders' to be an array, but it was not.");
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        if (isAuth) {
            getUsersOrders();
        }
    }, [isAuth])



    return (
        <div className='orders'>
            <h1>MY ORDERS</h1>
            <div className='order-list'>
                {orderData.map((p, index) => (
                    <div key={index} className='order-container'>
                        <div className='order-image-cont'>
                            <img src={p.image[0]} alt={p.name} className='order-image' />
                        </div>

                        <div className='order-details'>
                            <p className='order-name'>{p.name}</p>
                            <div className='order-info'>
                                <p className='order-price'>${p.price}</p>
                                <p className='order-quantity'>Quantity: {p.quantity}</p>
                                <p className='order-size'>Size: {p.size}</p>
                            </div>
                            <p className='order-date'>
                                Date: <span>{new Date(p.date).toDateString()}</span>
                            </p>
                            <p className='order-date'>
                                Payment: <span>{p.paymentMethod}</span>
                            </p>
                        </div>
                        <div className='order-status'>
                            <div className='status-container'>
                                <span className='status-dot'></span>
                                <p className='status-text'>{p.status }</p>
                            </div>
                            <button className='track-order-btn' onClick={getUsersOrders}>Track Order</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;
