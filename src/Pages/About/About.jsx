import React from 'react'
import './About.css'
import { FaCheckCircle, FaClock, FaThumbsUp, FaLock } from 'react-icons/fa'
import { assets } from '../../assets/assets'

function About() {
    return (
        <div className='about'>
            <div className="about-top">
                <img src={assets.about_img} alt="" />
                <div className="about-info">
                    <h1>ABOUT US</h1>
                    <p>Shopping Mall was founded in 2024 with a vision to make shopping easy for customers. Our team of experts is dedicated to providing clothing materials that meet the highest standards of quality and customer satisfaction.</p>
                    <div className="our-mission">
                        <h2>Our Mission</h2>
                        <p>At Shopping Mall, our mission is to provide quality clothing materials. We strive to:</p>
                        <ul>
                            <li>Provide exceptional customer service</li>
                            <li>Deliver innovative solutions</li>
                            <li>Foster a culture of excellence</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="why-choose-us">
                <h2>Why Choose Us?</h2>
                <div class="reasons">
                    <div class="reason">
                        <FaCheckCircle size={50} color='#007bff' />
                        <h3>Expertise</h3>
                        <p>Our team has years of experience in marketing.</p>
                    </div>
                    <div class="reason">
                        <FaClock size={50} color='#008080' />
                        <h3>Timely Delivery</h3>
                        <p>We deliver high-quality solutions on time, every time.</p>
                    </div>
                    <div class="reason">
                        <FaThumbsUp size={50} color='#2ecc71' />
                        <h3>Customer Satisfaction</h3>
                        <p>We prioritize customer satisfaction and feedback.</p>
                    </div>
                    <div class="reason">
                        <FaLock size={50} color='#ff9900' />
                        <h3>Security and Reliability</h3>
                        <p>We ensure the security and reliability of our products/services.</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default About
