import React, { useContext, useEffect, useState } from 'react'
import './Collections.css'
import { ShopContext } from '../../ShopContext'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

function Collections() {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState("relevant")

  function toggleCategory(e) {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(product => product !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }
  function toggleSubCategory(e) {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(product => product !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  function applyFilter() {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(product => category.includes(product.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(product => subCategory.includes(product.subCategory))
    }
    setFilterProducts(productsCopy)
  }

  function sortProducts() {
    let filterProductsCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(filterProductsCopy.sort((a, b) => (a.price - b.price)))
        break;
      case "high-low":
        setFilterProducts(filterProductsCopy.sort((a, b) => (b.price - a.price)))
        break;
      default:
        applyFilter();
        break
    }
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch])

  useEffect(() => {
    sortProducts()
  }, [sortType])



  return (
    <div className='collections'>
      <img src={assets.collection_image} alt="" className='collection-img' />

      <div className="filters">
        <div>
          <p onClick={() => setShowFilter(!showFilter)}
            className='filt-header'>FILTERS
            <img src={assets.dropdown_icon} alt="" style={{ transform: showFilter ? "rotate(90deg)" : "" }} />
          </p>
        </div>


        {showFilter === true ?
          <>
            <div className='filter-content'>
              <div className="category-filters">
                <p className='cat-header'>CATEGORIES</p>
                <div className="cat-contents">
                  <p className="cat-content">
                    <input type="checkbox" value={"Men"} onChange={toggleCategory} /> Men
                  </p>
                  <p className="cat-content">
                    <input type="checkbox" value={"Women"} onChange={toggleCategory} /> Women
                  </p>
                  <p className="cat-content">
                    <input type="checkbox" value={"Kids"} onChange={toggleCategory} /> Kids
                  </p>
                </div>
              </div>
              <div className="category-filters">
                <p className='cat-header'>TYPE</p>
                <div className="cat-contents">
                  <p className="cat-content">
                    <input type="checkbox" value={"Topwear"} onChange={toggleSubCategory} /> Topwear
                  </p>
                  <p className="cat-content">
                    <input type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory} /> bottomwear
                  </p>
                  <p className="cat-content">
                    <input type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} /> Winterwear
                  </p>
                </div>
              </div>
            </div>

          </>
          : null}
      </div>
      <div className='sort'>
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="relevant">Sort by: Relevant</option>
          <option value="low-high">Sort by: low to high</option>
          <option value="high-low">Sort by: high to low</option>
        </select>
      </div>

      <div className="my-collections">
        <h2>ALL COLLECTIONS</h2>
        <div className="collection-cards">
          {filterProducts.map((product, index) => (
            <ul key={index} className='collection-card'>
              <div className='collection-card-img'>
                <Link to={`../product/${product._id}`}><img src={product.image[0]} alt="" /></Link>
              </div>
              <h3>{product.name}</h3>
              <h4>${product.price}</h4>
            </ul>
          ))}
        </div>
      </div>
      <div className='exclusive'>
        <div className='exclusive-content'>
          <h2>Exclusive <br /> Deals</h2>
          <p>Sign up for our newletter and get notified about promotions</p>
        </div>
        <div className="exclusive-image">
          <img src={assets.hero2} alt="hero" />
        </div>
      </div>

    </div>
  )
}

export default Collections
