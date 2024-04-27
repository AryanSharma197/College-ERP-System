const express = require("express");
const {
  createAdmin,
  adminLogin,
  updatedPassword,
  updateAdmin,
  addAdmin,
  getAllAdmin,
  deleteAdmin,
  addDepartment,
  getAllDepartments,
  deleteDepartment,
  addFaculty,
  getAllFaculty,
  deleteFaculty,
  addSubject,
  getAllSubject,
  deleteSubject,
  addStudent,
  getAllStudent,
  deleteStudent,
  createNotice,
  getAllNotice,
  deleteNotice,
  addLibrarian,
  getAllLibrarian,
  deleteLibrarian
} = require("../Controller/adminController");
const router = express.Router();

//ADMIN ROUTES
router.post("/register", createAdmin);
router.post("/login", adminLogin);
router.post("/updatepassword", updatedPassword);
router.post("/updateprofile", updateAdmin);
router.post("/addadmin", addAdmin);
router.get("/getalladmin", getAllAdmin);
router.delete("/deleteadmin/:id", deleteAdmin);

//DEPARTMENT ROUTES
router.post("/adddepartment", addDepartment);
router.get("/getalldepartment", getAllDepartments);
router.delete("/deletedepartment/:id", deleteDepartment);

//FACULTY ROUTES
router.post("/addfaculty", addFaculty);
router.get("/getallfaculty", getAllFaculty);
router.delete("/deletefaculty/:id", deleteFaculty);

//SUBJECT ROUTES
router.post("/addsubject", addSubject);
router.get("/getallsubject", getAllSubject);
router.delete("/deletesubject/:id", deleteSubject);

//STUDENT ROUTES
router.post("/addstudent", addStudent);
router.get("/getallstudent", getAllStudent);
router.delete("/deletestudent/:id", deleteStudent);

//NOTICE ROUTES
router.post("/createnotice", createNotice);
router.get("/getallnotice", getAllNotice);
router.delete("/deletenotice/:id", deleteNotice);

//LIBRARIAN ROUTES
router.post("/addlibrarian", addLibrarian);
router.get("/getalllibrarian", getAllLibrarian);
router.delete("/deletelibrarian/:id", deleteLibrarian);

module.exports = router;
