const express = require("express");
const { createAdmin, adminLogin, updatedPassword, updateAdmin, addAdmin, getAllAdmin, deleteAdmin } = require("../Controller/adminController");
const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", adminLogin);
router.post("/updatepassword", updatedPassword);
router.post("/updateprofile", updateAdmin);
router.post("/addadmin", addAdmin);
router.get("/getalladmin", getAllAdmin);
router.delete("/deleteadmin/:id", deleteAdmin);

module.exports = router