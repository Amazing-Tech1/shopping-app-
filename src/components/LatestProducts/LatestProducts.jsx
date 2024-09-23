import React, { useContext, useEffect, useState } from 'react'
import './LatestProducts.css'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../ShopContext'


function LatestProducts() {
    const { products } = useContext(ShopContext)
    const [LatestProduct, setLatestProduct] = useState([])

    useEffect(() => {
        setLatestProduct(products.slice(0, 10))
    }, [])
    return (
        <div className='latest-products'>
            <div className="latest-header">
                <h2>New Collection</h2>
                <div></div>
            </div>

            <p>Discover the latest trends in women's, men's and kid fashion, featuring a wide range of clothing styles , from elegeant dresses to comfortable streetwears</p>
            <div className="product-cards">
                {LatestProduct.map((product, index) => (
                    <ul key={index} className='product-card'>
                        <div className='product-card-img'>
                            <Link to={`product/${product._id}`}> <img src={product.image[0]} alt="" /></Link>
                        </div>
                        <h3>{product.name}</h3>
                        <h4>${product.price}</h4>

                    </ul>
                ))}
            </div>



        </div>
    )
}

export default LatestProducts
