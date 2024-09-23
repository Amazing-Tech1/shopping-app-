import React, { useContext } from 'react'
import './CartTotal.css'
import { ShopContext } from '../../ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function CartTotal() {
    const { getCartAmount } = useContext(ShopContext)
    const navigate = useNavigate()
    return (
        <div className='cart-totals'>
            <div className="cart-total-container">
                <h3>CART TOTAL</h3>
                <div>
                    <div className='totals'>
                        <span>SubTotal</span>
                        <p>${getCartAmount()}.00</p>
                    </div>
                    <hr />
                    <div className='totals'>
                        <span>Shipping Fee</span>
                        <p>${getCartAmount() === 0 ? 0 : 10}.00</p>
                    </div>
                    <hr />
                    <div className='totals'>
                        <span>Total</span>
                        <b>${getCartAmount() === 0 ? 0 : getCartAmount() + 10}.00</b>
                    </div>
                    <button onClick={() => {
                        if (getCartAmount() === 0) {
                            toast.error("Cart empty! Pls add items before checking out.")
                        }
                        else {
                            navigate("../placeorder")
                        }
                    }} >PROCEED TO CHECKOUT</button>
                </div>
            </div>
            <div className="cart-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cart-promocode-input">
                    <input type="text" placeholder='promo code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default CartTotal
