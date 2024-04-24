const Admin = require("../Models/admin.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res) => {
    try{
        const { name, email, password, dob, gender, phone, joiningYear } = req.body;
        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin){
            return res.status(400).json({message: "Admin already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newAdmin = new Admin({name, email, password: hashedPassword, dob, gender, phone, joiningYear});
        await newAdmin.save();
        const token = jwt.sign(
            {
                email: newAdmin.email,
                id: newAdmin._id
            },
            `${process.env.JWT_SECRET}`,
            {expiresIn: "1h"}
        )
        res.status(201).json({result: newAdmin, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    const errors = {usernameError: String, passwordError: String};
    try{
        const existingAdmin = await Admin.findOne({email});
        if(!existingAdmin){
            errors.usernameError = "Admin doesn't exist";
            return res.status(404).json({errors});
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password);
        if(!isPasswordCorrect){
            errors.passwordError = "Invalid Credentials";
            return res.status(404).json({errors});
        }
        const token = jwt.sign(
            {
                email: existingAdmin.email,
                id: existingAdmin._id
            },
            `${process.env.JWT_SECRET}`,
            {expiresIn: "1h"}
        )
        res.status(200).json({result: existingAdmin,token: token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

const updatedPassword = async (req, res) => {
    try{
        const {newPassword, confirmPassword, email} = req.body;
        const errors = {mismatchError: String};
        if(newPassword !== confirmPassword){
            errors.mismatchError = "Passwords don't match";
            return res.status(400).json({errors});
        }
        const admin = await Admin.findOne({email});
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        admin.password = hashedPassword;
        await admin.save();
        if(admin.passwordUpdated === false){
            admin.passwordUpdated = true;
            await admin.save();
        }
        res.status(200).json({
            success: true,
            message: "Password updated successfully",
            result: admin
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateAdmin = async (req, res) => {
    try{
        const {name, dob, email, phone, joiningYear} = req.body;
        const updatedAdmin = await Admin.findOne({email});
        if( name ) {
            updatedAdmin.name = name;
            await updatedAdmin.save();
        }
        if( dob ) {
            updatedAdmin.dob = dob;
            await updatedAdmin.save();
        }
        if( phone ) {
            updatedAdmin.phone = phone;
            await updatedAdmin.save();
        }
        if( joiningYear ) {
            updatedAdmin.joiningYear = joiningYear;
            await updatedAdmin.save();
        }
        res.status(200).json({result: updatedAdmin});
    } catch (error) {
        res.status(500).json(error);
    }
}

const addAdmin = async (req, res) => {
    try{
        const { name, email, password, dob, gender, phone, joiningYear } = req.body;
        const errors = {Error: String};
        const existingAdmin = (await Admin.findOne({email})) || (await Admin.findOne({phone}));
        if(existingAdmin){
            errors.Error = "Already exists";
            return res.status(400).json({errors});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newAdmin = new Admin({name, email, password: hashedPassword, dob, gender, phone, joiningYear});
        await newAdmin.save();
        res.status(201).json({result: newAdmin});
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllAdmin = async (req, res) => {
    try{
        const admins = await Admin.find();
        res.status(200).json({result: admins});
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteAdmin = async (req, res) => {
    try{
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
        res.status(200).json({result: deletedAdmin});
    } catch (error) {
        res.status(500).json(error);
    }
}



module.exports = {createAdmin, adminLogin, updatedPassword, updateAdmin, addAdmin, getAllAdmin, deleteAdmin}