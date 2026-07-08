import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserProfile } from '../Redux/authSlice';

const useGetUserProfile = (_id) => {
   const dispatch = useDispatch();

   useEffect(()=>{
    const fetchUserProfile = async () =>{
        try {
            const res = await axios.get(`http://localhost:8000/api/v2/user/${_id}/profile`,{withCredentials:true});
            if(res.data?.success){
                dispatch(setUserProfile(res.data?.user || []));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchUserProfile();
   },[_id]);
}

export default useGetUserProfile;
