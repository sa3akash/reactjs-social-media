import React, { useState } from 'react';
import "./Auth.css";
import {login,register} from "../../Http";
import {useDispatch,useSelector} from "react-redux";
import {setAuth,setFetching} from "../../store/AuthReducer";
import { ToastContainer, toast } from 'react-toastify';


const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [inputData, setInputData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        conform_password: "",
    });
    
    const dispatch = useDispatch()
    const {isFetchng} = useSelector(state=>state.Auth)
     
    // all input fields value set in state
    const inputChange = (e) => {
        setInputData({...inputData, [e.target.name]: e.target.value});
    }

    // submit function 
    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup) {

            const {username,password,conform_password,first_name,last_name} = inputData;

            if(!username || !password || !conform_password || !first_name || !last_name) {
                toast.error("All fields are required")
                return;
            }

            if(password !== conform_password){
                toast.error(' * Conform_password not same')
                return;
            }

             // Register here
           dispatch(setFetching(true))
           const fetchRegister= async () => {
               try{
                   const res = await register(inputData)
                   toast.success("Register successfull")
                    setTimeout(()=>{
                        dispatch(setFetching(false))
                        dispatch(setAuth(res.data))
                    },2000)
               }catch(err){
                   dispatch(setFetching(false))
                   toast.error(err.response.data.message)
               }
           }
           fetchRegister()
            
        }else{
           // Login here
           const {username,password} = inputData;
           if(!username || !password){
            toast.error("All fields are required")
            return
           }
           dispatch(setFetching(true))
            const fetchLogin = async () => {
                try{
                    const res = await login({username,password})
                    toast.success("Login successfull")
                    setTimeout(()=>{
                        dispatch(setFetching(false))
                        dispatch(setAuth(res.data))
                    },2000)
                }catch(err){
                    dispatch(setFetching(false))
                    toast.error(err.response.data.message)
                }
            }
            fetchLogin()
        }
    }
    const resetForm = () => {
        setInputData({
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            conform_password: "",
        });
    }


  return (
    <div className='Auth'>
        {/* left side */}
        <div className="A_Left">
            <img src="./img/logo.png" alt="logo"/>
            <div className="Webname">
                <h1>SA2 Media</h1>
                <h6>Explore the ideas throughout the world!</h6>
            </div>
        </div>
        {/* right side */}
        <div className="A_Right">
            <form className="signupForm" onSubmit={handleSubmit}>
                <h3>{isSignup ? "Sign Up" : "Login"}</h3>
                <div className="inputWrapper">
                    {isSignup &&  
                        <>
                            <input type="text" placeholder='First Name' name='first_name' onChange={inputChange} value={inputData.first_name} />
                            <input type="text" placeholder='Last Name' name='last_name' onChange={inputChange} value={inputData.last_name}/>
                        </>
                    }
                    
                        <input type="text" placeholdername='username' placeholder='Username'
                        name='username' onChange={inputChange} value={inputData.username}/>
                    
                        <input type="password" placeholder='Password' name='password' onChange={inputChange} value={inputData.password}/>

                        {isSignup && 
                        <input type="password" placeholder='Conform Password' name='conform_password' onChange={inputChange} value={inputData.conform_password}/>}
                </div>
                
                <div className="A_btnContainer">
                    <span onClick={() => {
                        resetForm();
                        setIsSignup(prev => !prev);
                        }} 
                        style={{cursor: 'pointer'}}>

                        {isSignup ? "Already have an account... Login" : "Don't have an account... Sign up"}
                    </span>
                    <button type='submit' disabled={isFetchng} className="button A_Submit">{isSignup ? "Signup" : "Login"}</button>
                </div>
            </form>
        </div>

        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    </div>
  )
}


export default Auth;