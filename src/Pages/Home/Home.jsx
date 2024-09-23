import React from 'react'
import Hero from '../../components/Hero/Hero'
import LatestProducts from '../../components/LatestProducts/LatestProducts'
import BestSeller from '../../components/BestSeller/BestSeller'
import Services from '../../components/Services/Services'
import Subscribe from '../../components/Subscribe/Subscribe'

function Home() {
    return (
        <div className='home'>
            <Hero />
            <LatestProducts />
            <BestSeller />
            <Services />
            <Subscribe />
        </div>
    )
}

export default Home
