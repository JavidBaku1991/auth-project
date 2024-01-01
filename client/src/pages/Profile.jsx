import { useSelector } from 'react-redux'
import React,{useState,useEffect} from 'react'
import { useRef } from 'react'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../../firebase'
import { useDispatch } from 'react-redux';
import {signOut, deleteUserStart, deleteUserSucces,deleteUserFailure, updateUserFailure,updateUserStart,updateUserSucces } from '../redux/user/userSlice.js';
import Header from '../components/Header'


export default function Profile() {
const fileRef =useRef(null);
const {currentUser, loading,error} =useSelector(state=>state.user)
const [image,setImage]= useState(undefined);
const [imagePercent,setImagePercent] =useState(0);
const [imageErr,setImageErr] =useState(null)
const [formData,setFormData] =useState({})
const [updateSuccess,setUpdateSuccess]=useState(false);




const dispatch=useDispatch();
useEffect(()=>{
if(image){
  handleFileUpload(image);
}
},[image])

const handleFileUpload= async(image)=>{
  const storage =getStorage(app);
  const fileName = new Date().getTime() + image.name;
  const storageRef= ref(storage,fileName); 
  const uploadTask=uploadBytesResumable(storageRef,image);
  uploadTask.on(
    'state_changed',
    (snapshot)=>{
      const progress =(snapshot.bytesTransferred / snapshot.totalBytes)*100;
      setImagePercent(Math.round(progress));
    },

    (error)=>{
      setImageErr(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
        setFormData({...formData, profilePicture:downloadUrl});
      })
    }
  )}


const handleChange =(e)=>{
  setFormData({...formData, [e.target.id]:e.target.value })
}


const handleDeleteAccount =async()=>{
  try{
    dispatch(deleteUserStart());
    const res=await fetch(`/backend/user/delete/${currentUser._id}`,{
      method:'DELETE',
    });

    const data =await res.json();
    if(data.process===false){
      dispatch(deleteUserFailure(data))
      return;
    }
    dispatch(deleteUserSucces(data))
  }catch(error)
  {
    dispatch(deleteUserFailure(error))
  }
}


const handleSignOut=async()=>{
  try{
    await fetch('backend/auth/signout');
    dispatch(signOut());
  } catch(error){
      console.log(error);
  }
}


return (
  <div className='dashboard-container'>
       <Header />
     <div className='p-3 max-w-lg mx-auto'>
   
      <h1 className='text=3xl font=semibold text-center my-7 profile-lable'>Profile</h1>
      <form  className='flex flex-col gap-4'> 
      <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e)=>setImage(e.target.files[0])} />

{/*  
firebase storage rules
allow read;
      allow write :if
      request.resource.size < 2*1024 *1024 &&
      request.resource.contentType.matches(image/.*) */}

        <img src={formData.profilePicture || currentUser.profilePicture} 
        alt='Click to add profile picture'
        className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
        onClick={()=>fileRef.current.click()}
        />
        
        <p className='text-sm self-center'>

          {imageErr ?(
            <span className='text-red-700'>Error uploading image (File size must be at less than 2 MB)</span>
          ): imagePercent > 0 && imagePercent<100?(
            <span className='text-slate-700' >{`Uploading: ${imagePercent}%`}</span>) :imagePercent===100 ? (<span className='text=green-700'>Image uploaded successfully</span>):'' }
        </p>


            <div>
              <p className='profile-info'> <span className='profile-lable'> Username: </span>  <span>{currentUser.username}</span> </p>
              <p className='profile-info'><span className='profile-lable'> Email: </span> <span>{currentUser.email} </span> </p>

            </div>

       
       
      </form>
      <div className='flex justify-between space-x-3 mt-1'>
        <span  onClick={handleDeleteAccount} className='text-red-700 cursor-pointer '>Delete Account</span>
        <span  onClick={handleSignOut} className='text-red-900 cursor-pointer '>Sign Out</span>
      </div>
      <p className='text-green-700 mt-5'>  {updateSuccess && 'User is updated!!!'}</p>
    </div>
  </div>
   
  )
};
