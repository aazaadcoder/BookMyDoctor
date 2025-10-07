import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || ""); // state for login token
  const [doctors, setDoctors] = useState([]);
  const [appointmentData , setAppointmentData] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/all-doctors", {
        headers: { aToken },
      });

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    const {data} = await axios.get(backendUrl + '/api/admin/appointment-list', {headers : {aToken}})

    if(data.success){
      console.log(data.appointmentData);
      setAppointmentData(data.appointmentData);
    }else{
      toast.error(data.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    doctors,
    getAllDoctors,
    changeAvailability,
    getAllAppointments,
    appointmentData,
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
      {}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
