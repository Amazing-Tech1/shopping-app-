import React from 'react'
import './Subscribe.css'

function Subscribe() {
    return (
        <div className='subscribe'>
            <div className="subscribe-content">
                <h2>Subscribe to our newsletter to get updates of our latest collectives</h2>
                <p>Get 20% off on your first order just by subscribing to our newsletter </p>
                <div>
                    <input type="text" placeholder='Enter your Email' />
                    <button>Subscribe</button>
                </div>
            </div>
        </div>
    )
}

export default Subscribe
