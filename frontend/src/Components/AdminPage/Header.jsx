// import React from "react";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { useNavigate } from "react-router-dom";
// const Header = () => {
//   // const isTokenExpired = () => {
//   //   const token = localStorage.getItem('token');
//   //   if (!token) return true; // Token not found, assume expired
//   //   const decodedToken = jwt_decode(token);
//   //   const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
//   //   return decodedToken.exp < currentTime; // Check if token expiration time is in the past
//   // };
//   const user = JSON.parse(localStorage.getItem("admin"));
//   const temp = user.email.split('@')[0];
//   const show = temp[0].toUpperCase() + temp.slice(1);
//   const navigate = useNavigate();
//   const isTokenExpired = () => {
//     const token = user?.token;
//     if(!token){
//       alert("Login session expired")
//       navigate("/login/adminLogin");
//     } else {
//       const decodedToken = jwt_decode(token);
//       const currentTime = Date.now() / 1000;
//       return decodedToken.exp < currentTime;
//     }
//   }
//   const logout = () => {
//     localStorage.removeItem("admin");
//     navigate("/login/adminLogin");
//   };
//   return (
//     <div className="flex-[0.05] flex justify-between items-center mx-5 my-2">
//       <div className="flex items-center ">
//         <img
//           src="https://icon-library.com/images/cms-icon/cms-icon-11.jpg"
//           alt=""
//           className="h-7"
//         />
//         <h1 className="font-bold text-blue-600 text-sm">CMS</h1>
//       </div>
//       <h1 className="font-semibold text-black">Welcome</h1>
//       <div className="flex items-center space-x-3">
//         <h1>{show}</h1>
//         <LogoutIcon
//           onClick={logout}
//           className="cursor-pointer hover:scale-125 transition-all "
//         />
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("admin"));
  const temp = user?.email.split("@")[0];
  const show = temp[0].toUpperCase() + temp.slice(1);
  const navigate = useNavigate();

  // Check token expiration on component mount
  useEffect(() => {
    const isTokenExpired = () => {
      const token = user?.token;
      if (!token) {
        alert("Login session expired");
        localStorage.removeItem("admin");
        navigate("/login/adminLogin");
      } else {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          alert("Login session expired");
          localStorage.removeItem("admin");
          navigate("/login/adminLogin");
        }
      }
    };

    isTokenExpired();
    const timer = setInterval(isTokenExpired, 60000);
    return () => clearInterval(timer);
  }, [user, navigate]);

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/login/adminLogin");
  };

  return (
    <div className="flex-[0.05] flex justify-between items-center mx-5 my-2">
      <div className="flex items-center ">
        <img
          src="https://icon-library.com/images/cms-icon/cms-icon-11.jpg"
          alt=""
          className="h-7"
        />
        <h1 className="font-bold text-blue-600 text-sm">CMS</h1>
      </div>
      <h1 className="font-semibold text-black">Welcome</h1>
      <div className="flex items-center space-x-3">
        <h1>{show}</h1>
        <LogoutIcon
          onClick={logout}
          className="cursor-pointer hover:scale-125 transition-all "
        />
      </div>
    </div>
  );
};

export default Header;
