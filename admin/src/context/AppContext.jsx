import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL; //ntl
  const currencySymbol = "₹";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formatDate = (slotDate) => {
    const date = slotDate.split("_");
    return date[0] + ", " + months[date[1]] + ", " + date[2];
  };
  const calculateAge = (dob) => {
    const date = new Date();
    const birthDate = new Date(dob);

    let age = date.getFullYear() - birthDate.getFullYear();

    return age;
  };
  const value = {
    backendUrl,
    calculateAge,
    formatDate,
    currencySymbol
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
