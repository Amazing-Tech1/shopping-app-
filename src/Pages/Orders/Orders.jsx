import React, { useContext, useState } from 'react'
import './Orders.css'
import { ShopContext } from '../../ShopContext'
import { assets } from '../../assets/assets'

function Orders() {
    const { formData, handleFormChange } = useContext(ShopContext)
    const [paymentMethod, setPaymentMethod] = useState("credit/debit card")
    function handleMethodChange(e) {
        setPaymentMethod(e.target.value)
    }

    return (
        <div className='payment-page'>
            <h1>PAYMENT METHODS</h1>
            <div className="payment-options">
                <div className='payment-option'>
                    <input type="radio" id='credit-debit-card' name='payment-method' value="credit/debit card" onChange={handleMethodChange} checked={paymentMethod === "credit/debit card"} />
                    <label htmlFor="credit-debit-card">Debit Card</label>
                </div>
                <div className='payment-option'>
                    <input type="radio" id='paypal' name='payment-method' value="paypal" onChange={handleMethodChange} checked={paymentMethod === "paypal"} />
                    <label htmlFor="paypal">PayPal</label>
                </div>
                <div className='payment-option'>
                    <input type="radio" id='cash-on-delivery' name='payment-method' value="cod" onChange={handleMethodChange} checked={paymentMethod === "cod"} />
                    <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                </div>
            </div>

            {paymentMethod === 'credit/debit card' && (
                <form className='card-details'>
                    <div className='card-detail'>
                        <label>Card Holder's Name </label>
                        <input
                            type="text"
                            name="cardHolderName"
                            value={formData.cardHolderName}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div className='card-detail'>
                        <label>Card Number</label>
                        <input
                            type="number"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleFormChange}
                            required
                        />
                        <img src={assets.cards} alt="" />
                    </div>
                    <div className='box'>
                        <div className='card-detail'>               <label>Expiration</label>
                            <input
                                type="month"
                                name="expirationDate"
                                value={formData.expirationDate}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div className='card-detail'>
                            <label>CVV</label>
                            <input
                                type="number"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit">Pay Now</button>
                </form>
            )}
            {
                paymentMethod === 'paypal' && (
                    <form className="card-details">
                        <img src={assets.paypal} alt="" className='paypal-img' />
                        <div className='paypal-form'>
                            <label htmlFor="paypal">PayPal Email</label>
                            <input type="email" name="paypal" required />
                        </div>
                        <button type="submit">Pay Now</button>
                    </form>
                )
            }
            {
                paymentMethod === 'cod' && (
                    <form className="card-details cod ">
                        <img src={assets.cod} alt="" className='paypal-img' />
                        <p>Please verify your delivery information:</p>
                        <div className='verify-info'>
                            <label htmlFor="">First Name</label>
                            <input type="text" name="firstName" id="first Name" value={formData.firstName} readOnly />
                        </div>
                        <div className='verify-info'>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="LastName" id="last Name" value={formData.lastName} readOnly />
                        </div>
                        <div className='verify-info'>
                            <label htmlFor="address">Address</label>
                            <input type="text" name="address" id="address" value={formData.address} readOnly />
                        </div>
                        <div className='verify-info'>
                            <label htmlFor="phone">Phone No</label>
                            <input type="number" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} readOnly />
                        </div>

                        <div className='cod-intructions'>
                            <p>Payment Instructions:</p>
                            <ul>
                                <li>Please pay the delivery personnel upon receipt of your order</li>
                                <li>Accepted payment method is Cash only!</li>
                            </ul>
                        </div>

                        <button type="submit">Confirm COD Order</button>
                    </form>
                )
            }



        </div>
    )
}

export default Orders
