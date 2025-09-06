import { createContext } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) =>{
    
    const value ={

    }
    return (
        <DoctorContext.Provider value={value}>
            {props}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;