import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Calendar from "react-calendar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import "react-calendar/dist/Calendar.css";
import ReplyIcon from "@mui/icons-material/Reply";
const Body = () => {
  const [adminLength, setAdminLength] = useState(0);
  const [facultyLength, setFacultyLength] = useState(0);
  const [studentLength, setStudentLength] = useState(0);
  const [departmentLength, setDepartmentLength] = useState(0);
  const fetchAdmins = async () => {
    try{
      const res = await fetch("http://localhost:8000/admin/getalladmin");
      const data = await res.json();
      setAdminLength(data.length);
      console.log(adminLength);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchFaculty = async () => {
    try{
      const res = await fetch("http://localhost:8000/admin/getallfaculty");
      const data = await res.json();
      setFacultyLength(data.length);
      console.log(facultyLength);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchStudents = async () => {
    try{
      const res = await fetch("http://localhost:8000/admin/getallstudent");
      const data = await res.json();
      setStudentLength(data.length);
      console.log(studentLength);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchDepartments = async () => {
    try{
      const res = await fetch("http://localhost:8000/admin/getalldepartment");
      const data = await res.json();
      setDepartmentLength(data.length);
      console.log(departmentLength);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAdmins();
    fetchFaculty();
    fetchStudents();
    fetchDepartments();
  }, [])
  const [open, setOpen] = useState(false);
  // const [openNotice, setOpenNotice] = useState({});
//   const notices = useSelector((state) => state.admin.notices.result);
  const [value, onChange] = useState(new Date());

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <HomeIcon />
          <h1>Dashboard</h1>
        </div>
        <div className="flex flex-col mr-5 space-y-4 overflow-y-hidden">
          <div className="bg-white h-[8rem] rounded-xl shadow-lg grid grid-cols-4 justify-between px-8 items-center space-x-4">
            <div className="flex items-center space-x-4 border-r-2">
              <EngineeringIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Faculty</h1>
                <h2 className="text-2xl font-bold">{facultyLength}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <BoyIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Student</h1>
                <h2 className="text-2xl font-bold">{studentLength}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Admin</h1>
                <h2 className="text-2xl font-bold">{adminLength}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 ">
              <MenuBookIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Department</h1>
                <h2 className="text-2xl font-bold">{departmentLength}</h2>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex flex-col space-y-4 w-2/6">
              <div className="bg-white h-[17rem] rounded-xl shadow-lg">
                <Calendar onChange={onChange} value={value} />
              </div>
            </div>
            <div className="bg-white h-[17rem] w-full rounded-xl shadow-lg flex flex-col  pt-3">
              <div className="flex px-3">
                {open && (
                  <ReplyIcon
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  />
                )}
                <h1 className="font-bold text-xl w-full text-center">
                  Notices
                </h1>
              </div>
              <div className="mx-5 mt-5 space-y-3 overflow-y-auto h-[12rem]">
                {/* {!open ? (
                  notices?.map((notice, idx) => (
                    <div
                      onClick={() => {
                        setOpen(true);
                        setOpenNotice(notice);
                      }}
                      className="">
                      <Notice idx={idx} notice={notice} notFor="" />
                    </div>
                  ))
                ) : (
                  <ShowNotice notice={openNotice} />
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
