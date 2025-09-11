import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [state, setState] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function onSubmitHandler(event) {
    // todo : add loader when waiting for the server response 
    event.preventDefault(); // prevents page reload

    if (state == "signup") {
      try {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        console.log(data);

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        const {data} = await axios.post(backendUrl + '/api/user/login', {email, password});

        if(data.success){
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success(data.message);
        }else{
          toast.error(data.message); 
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/");
      scrollTo(0, 0);
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-3 items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-sm text-zinc-600 shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "signup" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "signup" ? "sign up" : "login"} to book appointment
        </p>
        {state === "signup" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="w-full border border-zinc-300 p-2 mt-1 "
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input
            className="w-full border border-zinc-300 p-2 mt-1 "
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p>Passoword</p>
          <input
            className="w-full border border-zinc-300 p-2 mt-1 "
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button className="w-full bg-primary text-white p-2 rounded-md text-base">
          {state === "signup" ? "Create Account" : "Login"}
        </button>
        <div>
          {state === "signup" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-primary underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create an account?{" "}
              <span
                onClick={() => setState("signup")}
                className="text-primary underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
