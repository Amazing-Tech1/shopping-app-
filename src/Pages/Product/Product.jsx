import React, { useContext, useEffect, useState } from 'react'
import './Product.css'
import { ShopContext } from '../../ShopContext'
import { Link, useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
function Product() {
    const { products, addToCart } = useContext(ShopContext)
    const { id } = useParams();
    const [image, setImage] = useState("")
    const [size, setSize] = useState("")
    const [related, setRelated] = useState([])
    const product = products.find(product => (product._id).toString() === id)

    useEffect(() => {
        setImage(product.image[0])
    }, [])

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => product.category === item.category)
            productsCopy = productsCopy.filter((item) => product.subCategory === item.subCategory)
            setRelated(productsCopy.slice(1, 6))
        }
    }, [products])
    return product && (
        <div className='product'>
            <h1 className='product-header'>{(product.category).toUpperCase()} {(product.subCategory).toUpperCase()}</h1>
            <div className="product-container">
                <div className='product-img'>
                    <div className='product-img-left'>
                        {(product.image).map((image, index) => (
                            <img src={image} alt="" key={index} onClick={() => setImage(image)} />
                        ))}
                    </div>
                    <div className='product-img-right'>
                        <img src={image} alt="" />
                    </div>
                </div>
                <div className="product-content">
                    <h1>{product.name}</h1>
                    <div className="star">
                        <img src={assets.star_icon} alt="" />
                        <img src={assets.star_icon} alt="" />
                        <img src={assets.star_icon} alt="" />
                        <img src={assets.star_icon} alt="" />
                        <img src={assets.star_dull_icon} alt="" />
                    </div>
                    <span>${product.price}</span>
                    <p>{product.description}</p>
                    <div className="product-size">
                        <p>Select Size</p>
                        <div className="sizes">
                            {product.sizes.map((s, index) => (
                                <button onClick={() => setSize(s)} style={{ borderRadius: s === size ? "25px" : null }} key={index}>{s}</button>
                            ))}
                        </div>
                    </div>
                    <button className='add' onClick={() => addToCart(product._id, size)}>Add to Cart</button>
                    <hr />
                    <ul className="product-policy">
                        <li>100% Original Product</li>
                        <li>Cash on Delivery is available for this product</li>
                        <li>Easy return and exchange policy within 40 days</li>
                    </ul>
                </div>
            </div>

            <div className="review">
                <div className="review-header">
                    <b>Description</b>
                    <b>Reviews (122)</b>
                </div>
                <div className="review-content">
                    <p>Wrap yourself in style with our luxurious fabric {product.subCategory.toLowerCase()}. Designed for comfort and elegance. Soft breathable fabric ensure all day comfort. Features a relaxed fit, versatile design, and durable construction. Perfect for casual outing, work, or layering.</p>
                    <p>
                        I'm absolutely loving this {product.subCategory.toLowerCase()}!. The quality is top-notch, and the fit is flattering. Highly Recommended! I have worn it multiple times and recieved countless compliments.
                    </p>
                </div>
            </div>
            <div className="related-products">
                <h1>RELATED PRODUCTS</h1>
                <div>
                    {related.map((item, index) => (
                        <img src={item.image} key={index} alt="" />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Product
