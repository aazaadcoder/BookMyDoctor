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

const App = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <>
      <ToastContainer />
      {/* the notification will render in this component */}

      {aToken ? (
        <div className="bg-[#F8F9FD]">
          <NavBar />
          <div className="flex items-start">
            <SideBar />
            <Routes>
              <Route path="/" element={<></>} />
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllAppointments />} />
              <Route path="/doctor-list" element={<DoctorsList />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
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
