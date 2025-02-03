import { useContext, useEffect, useState, useRef } from "react";
import React from 'react'
import './Login.css'
import { AuthContext } from '../../AuthContext'
import axios from "../../../axios.js";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from 'react-router-dom'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,24}$/;

function Login() {
    const { setIsAuth } = useContext(AuthContext)
    const [currState, setCurrState] = useState("Login")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState(null)
    const userRef = useRef()
    const errRef = useRef()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathName || '/'

    useEffect(() => {
        userRef.current.focus()
    }, [currState])

    async function UsersAuth(e) {
        e.preventDefault()
        if (currState === "Sign Up") {
            if (!passwordRegex.test(password)) {
                setErrMsg('Password must be between 8-24 characters, include at least one lowercase letter, one uppercase letter, and one special character.');
                return;
            }
            try {
                // console.log('register is executed')
                // console.log(currState)
                const response = await axios.post('/register', { username, email, password }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                if (response.data.success) {
                    setCurrState("Login")
                    setName("")
                    setEmail("")
                    setPassword("")
                }
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                    setErrMsg('Missing UserName or Password');
                } else if (err.response?.status === 401) {
                    setErrMsg('Invalid Password or Username');
                }
                else {
                    setErrMsg('Login Failed')
                }
                errRef.current.focus()
            }

        }
        if (currState === "Login") {
            try {
                // console.log('login is executed')
                const response = await axios.post('/login', { email, password }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                if (response.data.success) {
                    toast.success('Hello Welcome')
                    setIsAuth(true)
                    localStorage.setItem('isAuth', JSON.stringify(true))
                    setEmail("")
                    setPassword("")
                    navigate(from, { replace: true })
                } else {
                    toast.error('Something went wrong, Pls try again')
                }

            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                    setErrMsg("Email or Password not correct");
                } else if (err.response?.status === 401) {
                    setErrMsg('Invalid email or password');
                } else {
                    setErrMsg('Login Failed');
                }
                errRef.current.focus()
            }

        }

    }
    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuth');
        if (storedAuth) {
            setIsAuth(JSON.parse(storedAuth))
        }
    }, [])

    return (
        <div className='login'>
            <form className="login-container" onSubmit={UsersAuth}>
                <div className="login-title">
                    <h2>{currState}</h2>
                </div>
                <div className="login-inputs">
                    {currState === "Login" ? <></> : <input type="text" placeholder='Your Name' ref={currState === "Sign Up" ? userRef : null} required value={username} onChange={(e) => setUsername(e.target.value)} />}
                    <input type="email" placeholder='Your Email' ref={currState === "Login" ? userRef : null} required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit'>{currState === "Login" ? "Login" : "Create account"}</button>
                {currState === "Login" ? <></> :
                    <div className="login-condition">
                        <input type="checkbox" required />
                        <p>By continuing, i agree to the terms of use & privacy policy. </p>
                    </div>
                }

                {currState === "Login" ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")} >Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span> </p>}
                <p ref={errRef} aria-live='assertive' style={errMsg ? {
                    color: 'red',
                    marginTop: '10px',
                    fontWeight: 'bold',
                    backgroundColor: '#f8d7da',
                    padding: '10px',
                    textAlign: 'center',
                    borderRadius: '5px'
                } : { display: 'none' }}>
                    {errMsg}
                </p>
            </form>
        </div>
    )
}

export default Login
