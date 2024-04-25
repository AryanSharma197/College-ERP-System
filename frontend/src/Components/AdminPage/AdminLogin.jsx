import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../Utils/Spinner";

const AdminLogin = () => {
  const [translate, setTranslate] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setTranslate(true);
    }, 1000);
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      if (res.ok) {
        localStorage.setItem('admin', JSON.stringify({ email: email, password: password }));
        navigate('/admin/home')  
      } else {
        alert("Invalid Credentials")
        setLoading(false);
        setPassword("");
        setEmail("");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const login = async(e) => {
    e.preventDefault();
    setLoading(true);
    fetchData();
  };

  return (
    <div className="bg-[#04bd7d] h-screen w-screen flex items-center justify-center">
      <div className="grid grid-cols-2">
        <div
          className={`h-96 w-96 bg-white flex items-center justify-center ${
            translate ? "translate-x-[12rem]" : ""
          }  duration-1000 transition-all rounded-3xl shadow-2xl`}>
          <h1 className="text-[3rem]  font-bold text-center">
            Admin 
            <br />
            Login
          </h1>
        </div>
        <form
          onSubmit={login}
          className={`${
            loading ? "h-[27rem]" : "h-96"
          } w-96 bg-[#2c2f35] flex flex-col items-center justify-center ${
            translate ? "-translate-x-[12rem]" : ""
          }  duration-1000 transition-all space-y-6 rounded-3xl shadow-2xl`}>
          <h1 className="text-white text-3xl font-semibold">Admin</h1>
          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Email Id</p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                required
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                placeholder="Email Id"
              />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Password</p>
            <div className="bg-[#515966] rounded-lg px-2 flex  items-center">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                type={showPassword ? "text" : "password"}
                className=" bg-[#515966] text-white rounded-lg outline-none py-2  placeholder:text-sm"
                placeholder="Password"
              />
              {showPassword ? (
                <VisibilityIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                />
              ) : (
                <VisibilityOffIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]">
            Login
          </button>
          {loading && (
            <Spinner
              message="Logging In"
              height={30}
              width={150}
              color="#ffffff"
              messageColor="#fff"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
