import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import DoctorCard from "../components/DoctorCard";

const Doctors = () => {
  const { doctors, specialityData } = useContext(AppContext);
  const [filteredDoc, setfilteredDoc] = useState(doctors);
  const { speciality } = useParams();
  const navigate = useNavigate();
  function applyFilter() {
    if (speciality) {
      setfilteredDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setfilteredDoc(doctors);
    }
  }

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);
  // by default useeffect runs the code for every render but to avoid that we can set its depenedencies

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          {specialityData.map((specialityInfo, index) => (
            <p
            key={index}
              onClick={() =>
                speciality === specialityInfo.speciality
                  ? navigate("/doctors")
                  : navigate(`/doctors/${specialityInfo.speciality}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer 
                ${speciality === specialityInfo.speciality ? 'bg-indigo-100 text-black' : ''}`}
            >
              {specialityInfo.speciality}
            </p>
          ))}
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filteredDoc.map((item, index) => (
            <DoctorCard item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
