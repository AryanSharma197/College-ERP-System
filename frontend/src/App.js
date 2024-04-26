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
import DeleteDepartment from "./Components/AdminPage/DeleteDepartment/DeleteDepartment";
import AddFaculty from "./Components/AdminPage/AddFaculty/AddFaculty";
import DeleteFaculty from "./Components/AdminPage/DeleteFaculty/DeleteFaculty";
import AddStudent from "./Components/AdminPage/AddStudent/AddStudent";
import DeleteStudent from "./Components/AdminPage/DeleteStudent/DeleteStudent";
import AddSubject from "./Components/AdminPage/AddSubject/AddSubject";
import DeleteSubject from "./Components/AdminPage/DeleteSubject/DeleteSubject";
import CreateNotice from "./Components/AdminPage/CreateNotice/CreateNotice";

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
              <Route path="/admin/deletedepartment" element={<DeleteDepartment/>}/>
              <Route path="/admin/addfaculty" element={<AddFaculty/>}/>
              <Route path="/admin/deletefaculty" element={<DeleteFaculty/>}/>
              <Route path="/admin/addstudent" element={<AddStudent/>}/>
              <Route path="/admin/deletestudent" element={<DeleteStudent/>}/>
              <Route path="/admin/addsubject" element={<AddSubject/>}/>
              <Route path="/admin/deletesubject" element={<DeleteSubject/>}/>
              <Route path="/admin/createnotice" element={<CreateNotice/>}/>
          {/* <Route path="/login/facultylogin" element={<FacultyLogin/>}/> */}
          {/* <Route path="/login/studentlogin" element={<StudentLogin/>}/> */}
          {/* <Route path="/login/librarianlogin" element={<LibraryLogin/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
