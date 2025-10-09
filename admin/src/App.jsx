import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import DoctorsList from "./pages/Admin/DoctorsList";
import AddDoctor from "./pages/Admin/AddDoctor";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return (
    <>
      <ToastContainer />
      {/* the notification will render in this component */}

      {aToken || dToken ? (
        <div className="bg-[#F8F9FD]">
          <NavBar />
          <div className="flex items-start">
            <SideBar />
            <Routes>
              {/* admin routes */}
              {aToken && <Route path="/" element={<Dashboard />} />}
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllAppointments />} />
              <Route path="/doctor-list" element={<DoctorsList />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              {/* doctor routes */}
              {dToken && <Route path="/" element={<DoctorDashboard />} />}
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route
                path="/doctor-appointments"
                element={<DoctorAppointments />}
              />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
};

export default App;
