import React from 'react'
import './Services.css'
import { assets } from '../../assets/assets'

function Services() {
    return (
        <div className="services">
            <div className="service">
                <img src={assets.quality_icon} alt="" />
                <h3>QUALITY PRODUCTS</h3>
                <p> Especially For You </p>
            </div>
            <div className="service">
                <img src={assets.exchange_icon} alt="" />
                <h3>40 DAYS RETURN</h3>
                <p> Free Return & Exchange </p>
            </div>
            <div className="service">
                <img src={assets.support_img} alt="" />
                <h3>24/7 SUPPORT</h3>
                <p> Ready For You </p>
            </div>

        </div>
    )
}

export default Services
