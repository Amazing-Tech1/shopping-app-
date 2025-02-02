import React, { useContext } from 'react'
import './PlaceOrder.css'
import { ShopContext } from '../../ShopContext'
import { useNavigate } from 'react-router-dom'


function PlaceOrder() {
    const { getCartAmount, handleFormChange, formData, setPaymentMethod, onSubmitForm } = useContext(ShopContext)
    const navigate = useNavigate()


    return (
        <form onSubmit={onSubmitForm}>
            <div className='place-order'>
                <div className="place-order-left">
                    <p className="title">Delivery Information</p>
                    <div className="multi-fields">
                        <input type="text"
                            name='firstName'
                            placeholder='First Name' required value={formData.firstName} onChange={handleFormChange} />
                        <input type="text"
                            name='lastName' placeholder='Last Name' required value={formData.lastName} onChange={handleFormChange} />
                    </div>
                    <input type="email"
                        name='email'
                        placeholder='Email' required value={formData.email} onChange={handleFormChange} />
                    <input type="text"
                        name='address' placeholder='Street' required value={formData.address} onChange={handleFormChange} />
                    <div className="multi-fields">
                        <input type="text"
                            name='city'
                            placeholder='City' required value={formData.city} onChange={handleFormChange} />
                        <input type="text"
                            name='state'
                            placeholder='State' required value={formData.state} onChange={handleFormChange} />
                    </div>
                    <div className="multi-fields">
                        <input type="text"
                            name='zipcode'
                            placeholder='Zip code' required value={formData.zipcode} onChange={handleFormChange} />
                        <input type="text"
                            name='country'
                            placeholder='Country' required value={formData.country} onChange={handleFormChange} />
                    </div>
                    <input type="number"
                        name='phoneNumber'
                        placeholder='Phone ' required value={formData.phoneNumber} onChange={handleFormChange} />

                </div >
                <div className="place-order-right">
                    <div className="cart-total">
                        <h3>CART TOTALS</h3>
                        <div>
                            <div className='cart-total-details'>
                                <span>SubTotal</span>
                                <p>NGN {getCartAmount()}.00</p>
                            </div>
                            <hr />
                            <div className='cart-total-details'>
                                <span>Shipping Fee</span>
                                <p>NGN {getCartAmount() === 0 ? 0 : 150}.00</p>
                            </div>
                            <hr />
                            <div className='cart-total-details'>
                                <span>Total</span>
                                <b>NGN {getCartAmount() === 0 ? 0 : getCartAmount() + 153}.00</b>
                            </div>
                        </div>
                    </div>
                    <div className='payment'>
                        <h1>PAYMENT OPTIONS</h1>
                        <div className="payment-options">
                            <div >
                                <button
                                    type="submit"
                                    onClick={() => setPaymentMethod("paystack")}
                                    className="payment-option"
                                >
                                    Pay Now
                                </button>
                            </div>
                            <div >
                                <button
                                    type="submit"
                                    onClick={() => setPaymentMethod("cod")}
                                    className="payment-option"
                                >
                                    Cash on Delivery
                                </button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </form >
    )
}

export default PlaceOrder
