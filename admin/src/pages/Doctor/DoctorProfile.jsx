import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, getProfileData, profileData, setProfileData } =
    useContext(DoctorContext);
  const { currencySymbol, backendUrl } = useContext(AppContext);
  const [ isEdit, setIsEdit ] = useState(false);
  
  const updateProfile = async () =>{
    try {
    const {data} = await axios.post(backendUrl + '/api/doctor/update-profile', {fees : profileData.fees, address : profileData.address, available : profileData.available, about : profileData.about}, {headers : {dToken}});
      console.log(data);
    if(data.success){
        getProfileData();
        toast.success("Profile Updated Successfully");
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally{
      setIsEdit(false);
    }

  }
  
  
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="flex flex-col gap-4 m-5">
        <div>
          <img className="bg-primary/80 w-full sm:max-w-40 rounded-lg" src={profileData.image} alt="" />
        </div>

        <div className="flex-1 w-full bg-white border border-stone-100 px-8 py-7 ">
          {/* ----- Doc Info : name, degree, experience ----- */}
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{profileData.name}</p>
          <div className="flex items-center gap-1 mt-1 text-gray-600">
            <p>
              {profileData.degree} - {profileData.speciality}
            </p>
            <button className="py-0.5 px-2 text-xs border rounded-full">{profileData.experience}</button>
          </div>

          {/* ----- Doc About ----- */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">About:</p>
            <p className="text-sm text-gray-600 w-[700px] mt-1">
              {isEdit ? (
                <textarea
                  onChange={(e) => setProfileData(prev => ( {...prev, about : e.target.value} ))}
                  className="w-[700px] outline-primary p-2 bg-gray-100"
                  type="text"
                  value={profileData.about}
                  rows={4}
                ></textarea>
              ) : (
                profileData.about
              )}
            </p>
          </div>

          <p className="text-gray-600 font-medium mt-4">
            Appointment Fees: <span className="text-gray-800">{currencySymbol} {isEdit ? <input onChange={(e) => setProfileData(prev => ({...prev, fees : e.target.value}))} className="p-0.5 bg-gray-100" type="number" value={profileData.fees}></input> : profileData.fees}</span>
          </p>

          <div className="flex gap-2 py-2">
            <p className="text-sm">Address:</p>
            <p >
              {isEdit ? <input onChange={(e) => setProfileData(prev => ({...prev, address : {...prev.address, line1 : e.target.value}}))} className="p-0.5 bg-gray-100 mb-1" type="text" value={profileData.address.line1}></input> : profileData.address.line1}
              <br />
              {isEdit ? <input onChange={(e) => setProfileData(prev => ({...prev, address : {...prev.address, line2 : e.target.value}}))}  className="p-0.5 bg-gray-100" type="text" value={profileData.address.line2}></input> : profileData.address.line2}
            </p>
          </div>

          <div className="flex gap-1 pt-2">
            <input onChange={() => isEdit && setProfileData(prev => ({...prev, available : !prev.available})) } type="checkbox"  checked ={profileData.available}/>
            <label htmlFor="">Available</label>
          </div>

          {
            isEdit 
            ? <button onClick = {() => updateProfile()} className="px-4 py-1 mt-5 border border-primary rounded-full hover:bg-primary hover:text-white transition-all" >Save</button>
            : <button onClick={() => setIsEdit(prev => !prev)} className="px-4 py-1 mt-5 border border-primary rounded-full hover:bg-primary hover:text-white transition-all">Edit</button>
          }
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
