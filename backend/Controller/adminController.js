const Admin = require("../Models/admin.js");
const Department = require("../Models/department.js");
const Faculty = require("../Models/faculty.js");
const Student = require("../Models/student.js");
const Notice = require("../Models/notice.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res) => {
  try {
    const { name, email, password, dob, gender, phone, joiningYear } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      dob,
      gender,
      phone,
      joiningYear,
    });
    await newAdmin.save();
    const token = jwt.sign(
      {
        email: newAdmin.email,
        id: newAdmin._id,
      },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "1h" }
    );
    res.status(201).json({ result: newAdmin, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const errors = { usernameError: String, passwordError: String };
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      errors.usernameError = "Admin doesn't exist";
      return res.status(404).json({ errors });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!isPasswordCorrect) {
      errors.passwordError = "Invalid Credentials";
      return res.status(404).json({ errors });
    }
    const token = jwt.sign(
      {
        email: existingAdmin.email,
        id: existingAdmin._id,
      },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingAdmin, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updatedPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, email } = req.body;
    const errors = { mismatchError: String };
    if (newPassword !== confirmPassword) {
      errors.mismatchError = "Passwords don't match";
      return res.status(400).json({ errors });
    }
    const admin = await Admin.findOne({ email });
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    admin.password = hashedPassword;
    await admin.save();
    if (admin.passwordUpdated === false) {
      admin.passwordUpdated = true;
      await admin.save();
    }
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      result: admin,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { name, dob, email, phone, joiningYear } = req.body;
    const updatedAdmin = await Admin.findOne({ email });
    if (name) {
      updatedAdmin.name = name;
      await updatedAdmin.save();
    }
    if (dob) {
      updatedAdmin.dob = dob;
      await updatedAdmin.save();
    }
    if (phone) {
      updatedAdmin.phone = phone;
      await updatedAdmin.save();
    }
    if (joiningYear) {
      updatedAdmin.joiningYear = joiningYear;
      await updatedAdmin.save();
    }
    res.status(200).json({ result: updatedAdmin });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addAdmin = async (req, res) => {
  try {
    const { name, email, password, dob, gender, phone, joiningYear } = req.body;
    const errors = { Error: String };
    const existingAdmin = await Admin.findOne({ email }) 
    if (existingAdmin) {
      errors.Error = "Already exists";
      return res.status(400).json({ errors });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      dob,
      gender,
      phone,
      joiningYear,
    });
    await newAdmin.save();
    res.status(201).json({ result: newAdmin });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json( admins );
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({ result: deletedAdmin });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addDepartment = async (req, res) => {
  try {
    const { department } = req.body;
    const errors = { departmentError: String };
    const existingDepartment = await Department.findOne({ department });
    if (existingDepartment) {
      errors.departmentError = "Department already exists";
      return res.status(400).json({ errors });
    }
    const departments = await Department.find({});
    let add = departments.length + 1;
    let departmentCode;
    if (add < 10) {
      departmentCode = departmen +"0" + add.toString();
    } else {
      departmentCode = department + add.toString();
    }
    const newDepartment = new Department({ department, departmentCode });
    await newDepartment.save();
    res.status(200).json({
      success: true,
      message: "Department added successfully",
      result: newDepartment,
    });
  } catch (error) {
    res.status(500).json({message:"Error"});
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json( departments );
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteDepartment = async (req, res) => {
    try{
        const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
        res.status(200).json({ result: deletedDepartment });
    } catch(error){
        res.status(500).json(error);
    }
}

const addFaculty = async (req, res) => {
  try{
    const { name, email, password, gender, phone, joiningYear, department, dob } = req.body;
    const errors = { Error: String };
    const existingFaculty =
      (await Faculty.findOne({ email })) || (await Faculty.findOne({ phone }));
    if (existingFaculty) {
      errors.Error = "Already exists";
      return res.status(400).json({ errors });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newFaculty = new Faculty({
      name,
      email,
      password: hashedPassword,
      gender,
      phone,
      joiningYear,
      department,
      dob
    });
    await newFaculty.save();
    res.status(200).json({ result: newFaculty });
  }
  catch(error){
    res.status(500).json(error);
  }
}

// const getALlFaculty = async (req, res) => {
//   try{
//     const faculties = await Faculty.find();
//     res.status(200).json( faculties );
//   } catch(error){
//     res.status(500).json(error);
//   }
// }

const getAllFaculty = async (req, res) => {
  try {
    const faculties = await Faculty.aggregate([
      {
        $lookup: {
          from: "departments", // Name of the department collection
          localField: "department",
          foreignField: "_id",
          as: "department"
        }
      },
      {
        $unwind: "$department"
      },
      {
        $project: {
          name: 1,
          email: 1,
          password: 1,
          gender: 1,
          phone: 1,
          dob: 1,
          joiningYear: 1,
          passwordUpdated: 1,
          department: "$department.department" // Project the department name
        }
      }
    ]);

    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json(error);
  }
}



const deleteFaculty = async (req, res) => {
  try{
    const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);
    res.status(200).json({ result: deletedFaculty });
  } catch(error){
    res.status(500).json(error);
  }
}

const addSubject = async (req, res) => {
  try{
    const {subjectName, subjectCode, department, semester, teacher, totalLectures, type, credits} = req.body;
    const errors = { Error: String };
    const existingSubject = await Subject.findOne({subjectCode});
    if (existingSubject) {
      errors.Error = "Already exists";
      return res.status(400).json({ errors });
    }
    const newSubject = new Subject({
      subjectName,
      subjectCode,
      department,
      semester,
      teacher,
      totalLectures,
      type,
      credits
    })
    await newSubject.save();
    res.status(200).json({ result: newSubject });
  } catch(error){
    res.status(500).json(error);
  }
}

const getAllSubject = async (req, res) => {
  try{
    const subjects = await Subject.find();
    res.status(200).json({ result: subjects });
  } catch(error){
    res.status(500).json(error);
  }
}

const deleteSubject = async (req, res) => {
  try{
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
    res.status(200).json({ result: deletedSubject });
  } catch(error){
    res.status(500).json(error);
  }
}

const addStudent = async (req, res) => {
  try{
    const {name, email, password, dob, gender, phone, department, semester, rollNo} = req.body;
    const errors = { Error: String };
    const existingStudent = (await Student.findOne({email})) || (await Student.findOne({phone}));
    if (existingStudent) {
      errors.Error = "Already exists";
      return res.status(400).json({ errors });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      dob,
      gender,
      phone,
      department,
      semester,
      rollNo
    })
    await newStudent.save();
    res.status(200).json({ result: newStudent });
  } catch(error){
    res.status(500).json(error);
  }
}

const getAllStudent = async (req, res) => {
  try{
    const students = await Student.find();
    res.status(200).json( students );
  } catch(error){
    res.status(500).json(error);
  }
}

const deleteStudent = async (req, res) => {
  try{
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ result: deletedStudent });
  } catch(error){
    res.status(500).json(error);
  }
}

const createNotice = async (req, res) => {
  try{
    const {topic, description, noticeFor} = req.body;
    const newNotice = new Notice({
      title,
      description,
      date
    })
    await newNotice.save();
    res.status(200).json({ result: newNotice });
  } catch(error){
    res.status(500).json(error);
  }
}

const getAllNotice = async (req, res) => {
  try{
    const notices = await Notice.find();
    res.status(200).json({ result: notices });
  } catch(error){
    res.status(500).json(error);
  }
}

const deleteNotice = async (req, res) => {
  try{
    const deletedNotice = await Notice.findByIdAndDelete(req.params.id);
    res.status(200).json({ result: deletedNotice });
  } catch(error){
    res.status(500).json(error);
  }
}

module.exports = {
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
  deleteNotice
};
