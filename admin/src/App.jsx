import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext";

const App = () => {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div>
      
      <ToastContainer />
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
      {/* the notification will render in this component */}
    </>
  );
};

export default App;
