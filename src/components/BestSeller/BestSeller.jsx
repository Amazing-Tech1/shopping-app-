import React, { useContext, useEffect, useState } from 'react'
import './BestSeller.css'
import { ShopContext } from '../../ShopContext'
import { Link } from 'react-router-dom';

function BestSeller() {
    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])
    const bestProduct = products.filter((product) => product.bestseller === true)

    useEffect(() => {
        setBestSeller(bestProduct.slice(0, 5))
    }, [])

    return (
        <div className='latest-products'>
            <div className="latest-header">
                <h2>Best Sellers</h2>
                <div></div>
            </div>
            <p>Check out our top-selling products!</p>
            <div className="product-cards">
                {bestSeller.map((product, index) => (
                    <ul key={index} className='product-card'>
                        <div className='product-card-img'>
                            <Link to={`product/${product._id}`}>
                                <img src={product.image[0]} alt="" />
                            </Link>
                        </div>
                        <h3>{product.name}</h3>
                        <h4>${product.price}</h4>
                    </ul>
                ))}
            </div>

        </div>
    )
}

export default BestSeller
