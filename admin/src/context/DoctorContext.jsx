import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAppoinments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        { headers: { dToken } }
      );

      if (data.success) {
        setAppointments(data.appointmentData.reverse());
        console.log(data.appointmentData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) =>{
    try {
        const {data} = await axios.post(backendUrl + '/api/doctor/appointment-cancel', {appointmentId}, {headers : {dToken}});
        if(data.success){
            getAppoinments();
            toast.success(data.message);
        }else{
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
  }

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppoinments,
    cancelAppointment
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
