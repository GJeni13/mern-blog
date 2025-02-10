
import React from 'react'
import {AiFillGoogleCircle} from "react-icons/ai";
import {AiOutlineGoogle} from "react-icons/ai";
import {GoogleAuthProvider,signInWithPopup,getAuth} from "firebase/auth";
import { app } from '../firesbase';
import {useDispatch} from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';

export default function OAuth() {
  const auth=getAuth(app);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleGoogleClick=async()=>{
    const provider=new GoogleAuthProvider()
    provider.setCustomParameters({prompt:"select_account"})
      try{
        const resultsFromGoogle=await signInWithPopup(auth,provider)
        const res=await fetch('/api/auth/google',
          {
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              name:resultsFromGoogle.user.displayName,
              email:resultsFromGoogle.user.email,
              googlephotoUrl:resultsFromGoogle.user.photoURL,
            }),
          }
        ) 
        const data=await res.json();
        if(res.ok){
          dispatch(signInSuccess(data));
          navigate('/')
        }
        
              }catch(error){
        console.log(error);
      }
  }


  return (
    
    <button className="flex items-center justify-center w-full max-w-xs gap-2 px-4 py-2 bg-gradient-to-r rounded-lg from-purple-500 via-pink-500 to-red-500 text-black font-semibold text-lg transition-transform duration-300 transform hover:scale-105 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 shadow-lg" onClick={handleGoogleClick}
        >
    <AiOutlineGoogle className="w-7 h-7 mr-2 text-xl text-blue-400 " />
    Continue with Google
  </button>
      
  )
  
  
}
