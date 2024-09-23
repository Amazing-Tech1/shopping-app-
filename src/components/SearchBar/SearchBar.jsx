import React, { useContext, useEffect, useState } from 'react'
import './SearchBar.css'
import { ShopContext } from '../../ShopContext'
import { assets } from '../../assets/assets'
import { useLocation } from 'react-router-dom'

function SearchBar() {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false)
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("collection")) {
            setVisible(true)
        } else {
            setVisible(false)
        }

    }, [location])
    return showSearch && visible? (
        <div className='search-bar'>
            <div className="search">
                <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Search' value={search} />
                <img src={assets.search_icon} alt="" />
            </div>
            <img src={assets.cross_icon} alt="" onClick={() => setShowSearch(false)} />
        </div>
    ) : null
}

export default SearchBar
