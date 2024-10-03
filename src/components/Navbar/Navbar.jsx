import { useContext, useState } from 'react'
import { ShopContext } from '../../ShopContext'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link } from 'react-router-dom'


function Navbar() {
    const [menu, setMenu] = useState("home")
    const [showMenu, setShowMenu] = useState(false)
    const { setShowSearch, getCartCount } = useContext(ShopContext)
    return (
        <div className='navbar'>
            <div className="navbar-content">
                <div className="nav-logo">
                    <img src={assets.logo} alt="logo" className='logo' />
                    <h2><i>MALL</i> </h2>
                </div>
                <ul className="nav-middle">
                    <Link to="/" onClick={() => setMenu(home)}><li className={menu === "home" ? "active" : ""}>Home</li></Link>
                    <Link to="/collections" onClick={() => setMenu("collections")}><li className={menu === "collections" ? "active" : ""}>Collections</li></Link>
                    <Link to="/about" onClick={() => setMenu("about")}><li className={menu === "about" ? "active" : ""}>About us</li></Link>
                    <Link to="/contact" onClick={() => setMenu("contact")}> <li className={menu === "contact" ? "active" : ""}>Contacts</li></Link>

                </ul>

                <div className="nav-right">
                    <img src={assets.search_icon} alt="" onClick={() => setShowSearch(true)} />
                    <Link to="/login"><button>Login</button></Link>
                    <div className="cart-logo">
                        <Link to="/cart">
                            <img src={assets.cart_icon} alt="" className="cart" /></Link>
                        <div>{getCartCount()}</div>
                    </div>
                </div>
            </div>
            <div className='slide-bar' onClick={() => setShowMenu(!showMenu)}>
                {showMenu ? <img src={assets.cross_icon} alt="" className="menu-icon" /> : <img src={assets.menu_icon} alt="" className="menu-icon" />}
            </div>
            {showMenu === true ?
                <div className="menu" style={{ animation: showMenu ? "slideIn 1s" : "slideOut 1s forwards" }} >
                    <ul>
                        <Link to="/" onClick={() => setShowMenu(false)}><li>Home</li></Link>
                        <Link to="/login" onClick={() => setShowMenu(false)}><li>Login</li></Link>
                        <Link to="/collections" onClick={() => setShowMenu(false)}><li>Collections</li></Link>
                        <Link to="/about" onClick={() => setShowMenu(false)}><li>About us</li></Link>
                        <Link to="/contact" onClick={() => setShowMenu(false)}> <li>Contacts</li></Link>
                    </ul>
                </div> : null}


        </div>
    )
}

export default Navbar
