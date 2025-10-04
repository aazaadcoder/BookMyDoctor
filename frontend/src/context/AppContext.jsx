import { createContext, useEffect, useState } from "react";
import { specialityData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      // console.log(data);
      if (data.success) {
        setDoctors(data.doctors);
        // console.log(data.doctors);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/profile-data", {
        headers: { token },
      });
      console.log(data.userData.address?.line1);

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      getProfileData();
    }
  }, [token]);

  const value = {
    doctors,
    specialityData,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    getProfileData,
    userData,
    setUserData,
    getDoctorsData,
    appointments,
    setAppointments,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
