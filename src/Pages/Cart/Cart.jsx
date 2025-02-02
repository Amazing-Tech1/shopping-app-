import React, { useContext, useState, useEffect } from 'react'
import './Cart.css'
import { ShopContext } from '../../ShopContext'
import { assets } from '../../assets/assets';
import CartTotal from '../../components/CartTotal/CartTotal';

function Cart() {
    const { products, cartItems, deleteFromCart, updateQuantity } = useContext(ShopContext);

    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const tempData = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        tempData.push({
                            _id: items,
                            size: item,
                            quantity: cartItems[items][item]
                        })
                    }
                }
            }
            setCartData(tempData);
        }

    }, [cartItems, products])
    return (
        <div className="cart-product">
            <h1>YOUR CART</h1>
            <div className="cart-container">
                {cartData.map((p, index) => {
                    const productData = products.find((product) => product._id === p._id);
                    return (
                        <div className='cart-detail.container'>
                            <div className='cart-details' key={index}>
                                <img src={productData.image[0]} alt="" className='cart-detail-img' />
                                <div className='cart-detail'>
                                    <div className="detail">
                                        <p className='detail-name'>{productData.name}</p>
                                        <div className='detail-price'>
                                            <p>NGN {productData.price}</p>
                                            <p>
                                                {p.size}
                                            </p>
                                        </div>
                                    </div>
                                <div className='detail-right'>
                                        <input type="number" min={1} defaultValue={p.quantity} onChange={(e) => e.target.value === "" || e.target.value === "0" ? null : updateQuantity(p._id, p.size, Number(e.target.value))} />
                                            
                                        <img src={assets.bin_icon} alt="" className='del-btn' onClick={() => updateQuantity(p._id, p.size, 0)} />
                                    </div>
                                </div>                           
                            </div>
                        </div>
                    )
                })
                }
            </div>
            <div>
                <div>
                    <CartTotal />
                </div>
            </div>
        </div>
    )
}

export default Cart
