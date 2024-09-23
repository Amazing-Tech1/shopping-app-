import React, { useContext } from 'react'
import './PlaceOrder.css'
import { ShopContext } from '../../ShopContext'
import { useNavigate } from 'react-router-dom'


function PlaceOrder() {
    const { getCartAmount, handleFormChange, formData } = useContext(ShopContext)
    const navigate = useNavigate()
    return (
        <form className='place-order' onSubmit={(e) => {
            e.preventDefault()
            navigate('/orders')
            console.log(formData)
        }}>
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
                        name='zip'
                        placeholder='Zip code' required value={formData.zip} onChange={handleFormChange} />
                    <input type="text"
                        name='country'
                        placeholder='Country' required value={formData.country} onChange={handleFormChange} />
                </div>
                <input type="number"
                    name='phoneNumber'
                    placeholder='Phone ' required value={formData.phoneNumber} onChange={handleFormChange} />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h3>CART TOTALS</h3>
                    <div>
                        <div className='cart-total-details'>
                            <span>SubTotal</span>
                            <p>${getCartAmount()}.00</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <span>Shipping Fee</span>
                            <p>${getCartAmount() === 0 ? 0 : 10}.00</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <span>Total</span>
                            <b>${getCartAmount() === 0 ? 0 : getCartAmount() + 10}.00</b>
                        </div>
                        <button type="submit" >PROCEED TO PAYMENT</button>
                    </div>
                </div>
            </div>

        </form>
    )
}

export default PlaceOrder
