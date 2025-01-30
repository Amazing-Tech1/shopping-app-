import { useContext, useState } from 'react'
import { ShopContext } from '../../ShopContext'
import { AuthContext } from '../../AuthContext'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'


function Navbar() {
    const [menu, setMenu] = useState("home")
    const [showMenu, setShowMenu] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const { setShowSearch, getCartCount } = useContext(ShopContext)
    const { isAuth, handleUserLogout } = useContext(AuthContext)
    const navigate = useNavigate()
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
                    <img src={assets.search_icon} alt="" className='search_icon' onClick={() => setShowSearch(true)} />
                    {!isAuth ?
                        <Link to="/login">
                            <img src={assets.login} alt="" />
                        </Link>
                        :
                        <div className='user'>
                            <img src={assets.profile} alt="" onClick={() => setIsVisible(!isVisible)} />
                            <div className='user-prof'>
                                {isVisible ?
                                    <div>
                                        <p>My Profile</p>
                                        <p onClick={() => {
                                            navigate('/orders');
                                            setIsVisible(false);
                                        }}>Orders</p>
                                        <p onClick={() => {
                                            handleUserLogout();
                                            setIsVisible(false);
                                        }}>Logout</p>
                                    </div> :
                                    null
                                }


                            </div>


                        </div>
                    }
                    <div className="cart-logo">
                        <Link to="/cart">
                            <img src={assets.cart_icon} alt="" className="cart" /></Link>
                        <div style={getCartCount() > 0 ? { backgroundColor: 'steelblue' } : { display: 'none' }}>{getCartCount()}</div>
                    </div>
                </div>
            </div>
            <div className='slide-bar' onClick={() => setShowMenu(!showMenu)}>
                {showMenu ? <img src={assets.cross_icon} alt="" className="menu-icon" /> : <img src={assets.menu_icon} alt="" className="menu-icon" />}
            </div>
            {showMenu === true ?
                <div className="menu" style={{ animation: showMenu ? "slideIn 1s" : "slideOut 1s forwards" }}>
                    <ul>
                        <Link to="/" onClick={() => setShowMenu(false)}><li>Home</li></Link>
                        {!isAuth &&
                            <Link to="/login" onClick={() => setShowMenu(false)}><li>Login</li></Link>
                        }
                        <Link to="/collections" onClick={() => setShowMenu(false)}><li>Collections</li></Link>
                        {isAuth &&
                            <>
                                <Link to="/profile" onClick={() => setShowMenu(false)}><li>My Profile</li></Link>
                                <Link to="/cart" onClick={() => setShowMenu(false)}><li>My Cart</li></Link>
                                <Link to="/orders" onClick={() => setShowMenu(false)}><li>My Orders</li></Link>
                            </>
                        }
                        <Link to="/about" onClick={() => setShowMenu(false)}><li>About us</li></Link>
                        <Link to="/contact" onClick={() => setShowMenu(false)}><li>Contacts</li></Link>
                        {isAuth &&
                            <li onClick={() => { handleUserLogout(); setShowMenu(false); }}>Logout</li>
                        }
                    </ul>
                </div> : null
            }
        </div >
    )
}

export default Navbar
