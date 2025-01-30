import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../../ShopContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from '../../../axios'
import { AuthContext } from '../../AuthContext'
import { toast } from 'react-toastify'

function VerifyPayment() {
    const { setCartItems } = useContext(ShopContext)
    const { isAuth } = useContext(AuthContext)

    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const reference = searchParams.get('reference')

    const navigate = useNavigate()

    async function verifyPayment() {
        try {
            const response = await axios.post('/order/verifyPaystack', { success, orderId, reference }, {
                headers: {
                    'Content-Type': 'application/json',
                }, withCredentials: true
            })
            if (response.data.success) {
                console.log('successful Payment')
                setCartItems({})
                navigate('/orders')
            } else {
                console.log('Unsuccessful Payment')
                navigate('/cart')
                toast.error(response.data.message)
            }
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        }

    }
    useEffect(() => {
        if (isAuth) {
            verifyPayment()
        }
    }, [isAuth])
    return (
        <div>

        </div>
    )
}

export default VerifyPayment
