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
  getALlFaculty,
  deleteFaculty,
  addSubject,
  getAllSubject,
  deleteSubject
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
router.get("/getallfaculty", getALlFaculty);
router.delete("/deletefaculty/:id", deleteFaculty);

//SUBJECT ROUTES
router.post("/addsubject", addSubject);
router.get("/getallsubject", getAllSubject);
router.delete("/deletesubject/:id", deleteSubject);

module.exports = router;
