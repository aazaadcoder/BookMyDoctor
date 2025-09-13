import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const {token, userData, setUserData} = useContext(AppContext);
  

  return (
    <div className="max-w-lg flex flex-col text-sm">
      <img className="w-36 rounded" src={userData.image} alt="" />

      {isEdit ? ( //ntl
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4  "
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />

      <div>
        <p className="text-neutral-500 mt-3 underline">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5  mt-3 text-neutral-700">
          <p className="font-medium">Email Id: </p>
          <p className="text-blue-500">{userData.email}</p>
          <p>Phone: </p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}

          <p className="font-medium">Address: </p>
          {isEdit ? (
            <div>
              <div>
                <input
                  className="bg-gray-50"
                  type="text"
                  value={userData.address.line1}
                  onChange={
                    (e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      })) //ntl
                  }
                />
              </div>

              <div>
                <input
                  className="bg-gray-50"
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-500">
                {userData.address.line1} <br />
                {userData.address.line2}
              </p>
            </div>
          )}  
        </div>
      </div>

      <div> 
        <p className="text-neutral-500 mt-3 underline">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">              {/* ntl */}
          <p className="font-medium">Gender: </p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">
              {userData.gender.charAt(0).toUpperCase() +
                userData.gender.slice(1)}
            </p> //ntl
          )}
          <p className="font-medium">BirthDay:</p>
          {isEdit ? (
            <input
              className="max-2-28 bg-gray-100"
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            ></input>
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="mt-10">
        {isEdit ? (
          <button
            className="border border-primary rounded-full py-2 px-8 hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(false)}
          >
            Save Information
          </button>
        ) : (
          <button
            className="border border-primary rounded-full py-2 px-8 hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
