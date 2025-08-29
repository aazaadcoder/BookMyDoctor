import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({item}) => {
    const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/appointment/${item._id}`)}
      className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 "
    >
      <img className="bg-blue-50" src={item.image} alt="" />
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-center text-green-500">
          <p className="size-2 bg-green-500 rounded-full"></p>
          <p>Available</p>
        </div>
        <p className="text-gray-900 text-lg font-medium">{item.name}</p>
        <p className="text-gray-600 text-sm">{item.speciality}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
