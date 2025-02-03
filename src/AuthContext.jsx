import { createContext, useEffect, useState, useRef } from "react";
import React from 'react'
import axios from "../axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from 'react-router-dom'

// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,24}$/;


export const AuthContext = createContext()

function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false)
    //     const [currState, setCurrState] = useState("Login")
    //     const [username, setUsername] = useState("")
    //     const [email, setEmail] = useState("")
    //     const [password, setPassword] = useState("")
    //     const [errMsg, setErrMsg] = useState(null)
    //     const userRef = useRef()
    //     const errRef = useRef()
    //     const location = useLocation()
    //     const navigate = useNavigate()
    //     const from = location.state?.from?.pathName || '/'

    //     // const handlePasswordChange = (e) => {
    //     //     setPassword(e.target.value);
    //     //   };    


    //     async function UsersAuth(e) {
    //         e.preventDefault()
    //             if (currState === "Sign Up") {
    //                 if (!passwordRegex.test(password)) {
    //                     setErrMsg('Password must be between 8-24 characters, include at least one lowercase letter, one uppercase letter, and one special character.');
    //                     return;
    //                   }
    //                 try {
    //                     console.log('register is executed')
    //                     console.log(currState)
    //                     const response = await axios.post('/register', {username, email, password }, {
    //                         headers: {
    //                             'Content-Type': 'application/json'
    //                         },
    //                         withCredentials: true
    //                     })
    //                     if (response.data.success) {
    //                         toast.success(`Welcome ${username}`)
    //                         setIsAuth(true)
    //                         setName("")
    //                         setEmail("")
    //                         setPassword("")
    //                         navigate(from, { replace: true })
    //                     }
    //                 } catch (err) {
    //                     if (!err?.response) {
    //                         setErrMsg('No Server Response');
    //                     } else if (err.response?.status === 400) {
    //                         setErrMsg('Missing UserName or Password');
    //                     } else if (err.response?.status === 401) {
    //                         setErrMsg('Invalid Password or Username');
    //                     }
    //                     else {
    //                         setErrMsg('Login Failed')
    //                     }
    //                     errRef.current.focus()
    //                 }

    //             } 
    //             if(currState === "Login") {
    //                 try {
    //                     console.log('login is executed')
    //                     const response = await axios.post('/login', { email, password }, {
    //                         headers: {
    //                             'Content-Type': 'application/json'
    //                         },
    //                         withCredentials: true
    //                     })
    //                     if (response.data.success) {
    //                         toast.success(`Welcome ${email}`)
    //                         setIsAuth(true)
    //                         setEmail("")
    //                         setPassword("")
    //                         navigate(from, { replace: true })
    //                     } else {
    //                         toast.error('Something went wrong, Pls try again')
    //                     }

    //                 } catch (err) {
    //                     if (!err?.response) {
    //                         setErrMsg('No Server Response');
    //                     } else if (err.response?.status === 400) {
    //                         setErrMsg("Email or Password not correct"); 
    //                     } else if (err.response?.status === 401) {
    //                         setErrMsg('Invalid email or password'); 
    //                     } else {
    //                         setErrMsg('Login Failed');
    //                     }
    //                     errRef.current.focus()
    //                 }

    //             }
    //     }
    // function ErrMessage(){
    //     return (
    //         errMsg && (
    //         <p
    //         ref={errRef}
    //         aria-live='assertive'
    //         style={{
    //             color: 'red',
    //             marginTop: '10px',
    //             fontWeight: 'bold',
    //             backgroundColor: '#f8d7da',
    //             padding: '10px',
    //             textAlign: 'center',
    //             borderRadius: '5px',
    //               }}>
    //             {errMsg}
    //         </p>
    //           )
    //         )
    //     }
    async function handleUserLogout() {
        try {
            const response = await axios.get('/logout', {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (response.data.logout) {
                // console.log(response.data)
                toast.success('Logged Out Successfully')
                setIsAuth(false)
                localStorage.removeItem('isAuth')
                navigate('/')
            }
        } catch (err) {
            console.log(err.response.data)
        }
    }

    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuth');
        if (storedAuth) {
            setIsAuth(JSON.parse(storedAuth))
        }
    }, [])



    const contextValue = {
        isAuth, setIsAuth, handleUserLogout
    }
    return (
        <AuthContext.Provider value={contextValue} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider