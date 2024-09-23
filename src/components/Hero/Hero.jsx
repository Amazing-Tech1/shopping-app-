import React from 'react'
import './Hero.css'
import Slider from 'react-slick'
import { assets } from '../../assets/assets'

function Hero() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    }
    return (
        <div className="hero-slider">
            <Slider {...settings}>
                <div className='slides'>
                    <div className='slide-content'>
                        <h2>New <br />Arrivals!</h2>
                        <p>Explore the latest fashion trends on our website</p>
                        <button>Visit us</button>
                    </div>
                    <div className="slide-image">
                        <img src={assets.hero1} alt="hero" />
                    </div>
                </div>
                <div className='slides'>
                    <div className='slide-content'>
                        <h2>Exclusive <br /> Deals</h2>
                        <p>Sign up for our newletter and get notified about promotions</p>
                        <button>Subscribe</button>
                    </div>
                    <div className="slide-image">
                        <img src={assets.hero2} alt="hero" />
                    </div>
                </div>
                <div className='slides'>
                    <div className='slide-content'>
                        <h2>Summer <br /> Collections!</h2>
                        <p>Discover our stylish amd comfortable clothing</p>
                        <button>Learn more</button>
                    </div>
                    <div className="slide-image">
                        <img src={assets.hero3} alt="hero" />
                    </div>
                </div>
            </Slider>
        </div>

    )
}

export default Hero
