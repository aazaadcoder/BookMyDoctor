import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const NavBar = () => {
  const {aToken, setAToken} = useContext(AdminContext);
  const {dToken, setDToken} = useContext(DoctorContext); 
  const naviagate = useNavigate();

  const logout = () =>{
    naviagate('/');      //redirect to home page when logging out 
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');
    dToken && setDToken('');
    dToken && localStorage.removeItem('dToken');

  }
    return (
    <div className='sticky top-0 left-0 z-100 flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className=' flex items-center gap-2 text-xs'>
            <img onClick={() => {naviagate('/'); scrollTo(0,0)}} className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 '>{aToken ? "Admin" : "Doctor"}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
      
    </div>
  )
}

export default NavBar
