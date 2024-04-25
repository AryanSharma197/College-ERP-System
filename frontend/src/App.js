import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import AdminLogin from "./Components/AdminPage/AdminLogin";
// import FacultyLogin from "./Components/FacultyPage/FacultyLogin";
// import StudentLogin from "./Components/StudentPage/StudentLogin";
// import LibraryLogin from "./Components/LibraryPage/LibraryLogin";
import AdminHome from "./Components/AdminPage/AdminHome";
import AddAdmin from "./Components/AdminPage/AddAdmin/AddAdmin";
import DeleteAdmin from "./Components/AdminPage/DeleteAdmin/DeleteAdmin";
import AddDepartment from "./Components/AdminPage/AddDepartment/AddDepartment";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/adminlogin" element={<AdminLogin/>}/>
            <Route path="/admin/home" element={<AdminHome/>}/>
              <Route path="/admin/addadmin" element={<AddAdmin/>}/>
              <Route path="/admin/deleteadmin" element={<DeleteAdmin/>}/>
              <Route path="/admin/adddepartment" element={<AddDepartment/>}/>
          {/* <Route path="/login/facultylogin" element={<FacultyLogin/>}/> */}
          {/* <Route path="/login/studentlogin" element={<StudentLogin/>}/> */}
          {/* <Route path="/login/librarianlogin" element={<LibraryLogin/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
