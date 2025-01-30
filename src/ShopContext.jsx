import { createContext, useEffect, useState, useContext } from "react";
import React from 'react'
import axios from "../axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";


export const ShopContext = createContext(null)

function ShopContextProvider({ children }) {
    const { isAuth } = useContext(AuthContext)
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [paymentMethod, setPaymentMethod] = useState("paystack")
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        phoneNumber: ""
    })

    function handleFormChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function onSubmitForm(e) {
        e.preventDefault()
        try {
            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }
            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount(),
            }
            switch (paymentMethod) {
                case 'cod':
                    const response = await axios.post('/order/placeorder', orderData, {
                        headers: {
                            'Content-Type': 'application/json',
                        }, withCredentials: true
                    })
                    console.log(response.data)
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    }
                    else {
                        toast.error(response.data)
                    }
                    break;
                case 'paystack':
                    const responsePaystack = await axios.post('/order/payment/paystack', orderData, {
                        headers: {
                            'Content-Type': 'application/json',
                        }, withCredentials: true
                    })
                    if (responsePaystack.data.success) {
                        const { session_url } = responsePaystack.data
                        window.location.replace(session_url)
                    }
                    else {
                        toast.error(responsePaystack.data.message)
                    }
                    break;
                default:
                    break;
            }
        } catch (err) {

        }
    }
    async function addToCart(itemId, size) {
        if (!size) {
            toast.error("Pls Select Product Size")
            return;
        }

        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)

        if (isAuth) {
            try {
                const response = await axios.post('/cart', { itemId, size }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                if (response.data.success) {
                    toast.success("Product added to cart")
                }
            } catch (err) {
                toast.error(err.message)
            }
        }

    }

    async function updateQuantity(itemId, size, quantity) {
        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity
        setCartItems(cartData)

        if (isAuth) {
            try {
                const response = await axios.patch('/cart', { itemId, size, quantity }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                if (response.data.success) {
                    toast.success("Cart Updated")
                }
            } catch (err) {
                toast.error(err.message)
            }
        }
    }

    async function getUserCart() {
        try {
            const response = await axios.get('/cart', {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (response.data.success) {
                setCartItems(response.data.cartData)
                console.log(response.data.cartData)
            }

        } catch (err) {
            console.log(err)
            toast.error(err.message)
        }

    }
    useEffect(() => {
        if (isAuth) {
            getUserCart();
        } else {

        }
    }, [isAuth])

    function getCartCount() {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        if (isAuth) return totalCount;
    }

    async function deleteFromCart(itemId, size, quantity) {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    function getCartAmount() {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }
    async function getallProducts() {
        try {
            const response = await axios.get("/products", {
                headers: {
                    'Content-Type': 'application/json',
                }, withCredentials: true

            })
            setProducts(response.data)
            console.log(response.data)
        } catch (err) {
            console.log(err.response.data)
        }
    }

    useEffect(() => {
        getallProducts()
    }, [])

    const contextValue = {
        products, search, setSearch, showSearch, setShowSearch, cartItems, setCartItems, addToCart, getCartCount, deleteFromCart, getCartAmount, formData, handleFormChange, updateQuantity, paymentMethod, setPaymentMethod, onSubmitForm
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider
