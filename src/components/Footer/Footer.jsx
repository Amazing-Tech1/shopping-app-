import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { MdPhone, MdEmail } from 'react-icons/md'

function Footer() {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-top">
                    <div className="footer-top-left">
                        <div className="footer-logo">
                            <img src={assets.logo} alt="logo" className='logo' />
                            <h2><i>MALL</i> </h2>
                        </div>
                        <p>Experience endless possibilities with Shopping mall - Your ultimate shopping companion</p>
                    </div>
                    <div className="footer-top-right">
                        <h2> QUICK LINKS</h2>
                        <ul>
                            <li>About us </li>
                            <li>News & articles </li>
                            <li>Legal Notice </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-middle">
                    <div className="footer-middle-left">
                        <h2> USEFUL LINKS</h2>
                        <ul>
                            <li>Help Center </li>
                            <li>Contact Us </li>
                            <li>FAQ </li>
                            <li>Parent Community </li>
                        </ul>
                    </div>
                    <div className="footer-middle-right">
                        <h2> NEED HELP</h2>
                        <ul>
                            <p><MdPhone size={25} color="steelblue" /> <span> +234-9065273201</span> </p>
                            <p><MdEmail size={25} color="steelblue" /><span> kelvinmakinde2@gmail.com</span></p>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Copyright &copy; 2024 | Shopping Mall</p>
                <ul>
                    <li>PRIVACY POLICY</li>
                    <li>SUPPORT</li>
                    <li>TERMS & CONDITION</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
