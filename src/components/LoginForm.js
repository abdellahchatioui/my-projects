import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkUser, getUser, insertUser } from '../toolkit/slices/UserSlice';
import './style.css'

export default function LoginForm() {
    const {islogin} = useSelector(state => state.user)
    const [formvalider,setValidation] = useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (islogin ) {
            navigate('/book-list')
        }
      },[islogin,navigate])

    useEffect(() => {
        dispatch(getUser());
      },[dispatch])

    const validation = () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if(password.trim() === ''){
            setValidation( prevState => {
              return [...prevState,'Require a Name']
            })
          }
      
          if(email.trim() === ''){
            setValidation( prevState => {
              return [...prevState,'Require a Email']
            })
       // regex exeption
          }else if(!(/\S+@\S+\.\S+/.test(email))){
            setValidation( prevState => {
              return [...prevState,'Invalid Email Form']
            })
          }
      
    }
    const hundelRegister = (e) =>{
        e.preventDefault()
        setValidation([])
        validation()

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (formvalider.length === 0 && email && password) {
    
            const newuser = {email,password}
            console.log('newbook',newuser);  
            dispatch(insertUser(newuser))

            document.getElementById("email").value = '';
            document.getElementById("password").value = '';
            
          }
    }

    const hundelSign = (e) =>{
        e.preventDefault()

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const checkuser = {email,password};
        dispatch(checkUser(checkuser));
                
    }
    
  return (
         <div className="login-form">
            { formvalider.length === 0 ? ''
                    :
                (
                <ul className="alert alert-danger m-4 p-4" role="alert">
                {formvalider.map((value,key) => <li  key={key}>{value}</li>)}
                </ul>
                )
            }

            <h1>Login</h1>
            <div className="content">
            <div className="input-field">
                <input type="text" id='email' placeholder="Email" autoComplete="nope" />
            </div>
            <div className="input-field">
                <input type="password" id='password' placeholder="Password" autoComplete="new-password" />
            </div>
            <a href="/" className="link">Forgot Your Password?</a>
            </div>
            <div className="action">
            <button onClick={hundelRegister}>Register</button>
            <button  onClick={hundelSign}>Sign in</button>
            </div>
        </div>  
  )
}
