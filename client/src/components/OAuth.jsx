import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import {signInSuccess} from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom';


export default function OAuth() {
const navigate=useNavigate();  
const dispatch=useDispatch();
const handle=async()=>{
    try{
      const provider=new GoogleAuthProvider();
      const auth = getAuth(app);
      const result =await signInWithPopup(auth,provider);
      const res =await fetch('/backend/auth/google',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          name:result.user.displayName,
          email:result.user.email,
          photo:result.user.photoURL,
        })
      })
      const data=await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate('/home');
     } catch(error){
        console.log('Could not login with google!!!')
    }
}

  return (
   <button type='button' onClick={handle} className='bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-80'>Continue with Google</button>
  )
}
