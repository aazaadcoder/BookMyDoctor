import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';
import DoctorCard from './DoctorCard';

const RelatedDoctors = ({docId, speciality}) => {
    const{doctors} = useContext(AppContext);
    const[relDocs, setRelDOcs] = useState([]);
    const navigate = useNavigate();
    console.log(speciality)
    console.log(docId)
    useEffect(()=>{
        if(doctors.length && speciality ){
            const docData = doctors.filter((doc) => doc.speciality === speciality && doc._id != docId);
            console.log(docData)
            setRelDOcs(docData);
        }
    },[doctors,speciality,docId])

  return (
     <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm ">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDocs && relDocs.slice(0, 5).map((item, index) => (
         <DoctorCard item={item} key={index}/>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        more
      </button>
    </div>
  )
}

export default RelatedDoctors
