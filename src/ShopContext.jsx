import { createContext, useEffect, useState } from "react";
import React from 'react'
import { products } from "./assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext(null)

function ShopContextProvider({ children }) {

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [formData, setFormData] = useState({
        cardHolderName: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        amount: getCartAmount(),
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        phoneNumber: ""
    })

    function handleFormChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
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
        toast.success("Product added to cart")
    }

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
        return totalCount;
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

    const contextValue = {
        products, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount, deleteFromCart, getCartAmount, formData, handleFormChange
    }
    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider
