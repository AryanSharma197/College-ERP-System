import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../Utils/Spinner";
import * as classes from "../../../Utils/Styles";

const Body = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [data, setData] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const sem = [1, 2, 3, 4, 5, 6, 7, 8];
  const [value, setValue] = useState({
    subjectName: "",
    subjectCode: "",
    department: "",
    semester: "",
    teacher: "",
    type: "",
    credits: "",
    totalLectures: "",
  });
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch("http://localhost:8000/admin/getallfaculty");
        const data = await res.json();
        setTeacher(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("http://localhost:8000/admin/getalldepartment");
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDepartments();
    console.log(data);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    if (
        !value.subjectName ||
        !value.subjectCode ||
        !value.department ||
        !value.semester ||
        !value.teacher ||
        !value.type ||
        !value.credits ||
        !value.totalLectures
    ) {
      alert("Please fill all the fields");
    } else {
      setLoading(true);
      const subject = {
        subjectName: value.subjectName,
        subjectCode: value.subjectCode,
        department: value.department,
        semester: value.semester,
        teacher: value.teacher,
        type: value.type,
        credits: value.credits,
        totalLectures: value.totalLectures,
      };
      console.log(subject);
      try {
        await fetch("http://localhost:8000/admin/addsubject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subject),
        });
      } catch (err) {
        console.log(err);
      }
      alert("Subject added successfully");
      setValue({
        subjectName: "",
        subjectCode: "",
        department: "",
        semester: "",
        teacher: "",
        type: "",
        credits: "",
        totalLectures: "",
      });
      setLoading(false);
    }
  };
  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <EngineeringIcon />
          <h1>Add Subject</h1>
        </div>
        <div className=" mr-10 bg-white flex flex-col rounded-xl ">
          <form className={classes.adminForm0} onSubmit={handleSubmit}>
            <div className={classes.adminForm1}>
              <div className={classes.adminForm2l}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Subject Name :</h1>
                  <input
                    placeholder="Subject Name"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={value.subjectName}
                    onChange={(e) =>
                      setValue({ ...value, subjectName: e.target.value })
                    }
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Subject Code :</h1>

                  <input
                    placeholder="Subject Code"
                    className={classes.adminInput}
                    required
                    type="text"
                    value={value.subjectCode}
                    onChange={(e) =>
                      setValue({ ...value, subjectCode: e.target.value })
                    }
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Department :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.department}
                    onChange={(e) =>
                      setValue({ ...value, department: e.target.value })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    {data.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.department}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Semester :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.semester}
                    onChange={(e) =>
                      setValue({ ...value, semester: e.target.value })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    {sem.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className={classes.adminForm2r}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Teacher :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.teacher}
                    onChange={(e) =>
                      setValue({ ...value, teacher: e.target.value })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    {teacher.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Type :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.type}
                    onChange={(e) =>
                      setValue({ ...value, type: e.target.value })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="theory">Theory</MenuItem>
                    <MenuItem value="practical">Practical</MenuItem>
                  </Select>
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Credits :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.credits}
                    onChange={(e) =>{
                        console.log("Selected value:", e.target.value);
                        setValue({ ...value, credits: e.target.value })
                    }
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Total Lectures :</h1>
                  <input
                    placeholder="No. of Lectures"
                    className={classes.adminInput}
                    required
                    type="number"
                    value={value.totalLectures}
                    onChange={(e) =>
                      setValue({ ...value, totalLectures: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>
              <button
                onClick={() => {
                  setValue({
                    subjectName: "",
                    subjectCode: "",
                    department: "",
                    semester: "",
                    teacher: "",
                    type: "",
                    credits: "",
                    totalLectures: "",
                  });
                  setError({});
                }}
                className={classes.adminFormClearButton}
                type="button"
              >
                Clear
              </button>
            </div>
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Adding Admin"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.emailError || error.backendError) && (
                <p className="text-red-500">
                  {error.emailError || error.backendError}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
