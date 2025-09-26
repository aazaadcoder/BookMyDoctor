import React, { useContext } from 'react'
import { AppContext } from "../context/AppContext";
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const MyAppointments = () => {
  const {backendUrl, token} = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


  const fetchAppointments = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/user/appointments-list',{headers : {token}} );
      if(!data.success){
        toast.error(data.message);
      }else{
        setAppointments(data.appointmentData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const formatDate = (slotDate) => {
    const date = slotDate.split('_');
    return date[0] + ", " + months[date[1]] + ", "  + date[2];
  }

  useEffect(() =>{
    fetchAppointments();
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div 
            className=' grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b'
            key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1  text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address: </p>
              <p className='text-xs'> {item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time: </span> {formatDate(item.slotDate )}|  {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col justify-end gap-2'>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default MyAppointments
