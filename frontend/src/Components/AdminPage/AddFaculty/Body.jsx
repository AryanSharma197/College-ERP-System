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
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    phone: "",
    joiningYear: "",
    department: "",
  });
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
      !value.name ||
      !value.email ||
      !value.password ||
      !value.dob ||
      !value.gender ||
      !value.phone ||
      !value.joiningYear ||
      !value.department
    ) {
      alert("Please fill all the fields");
    } else {
      setLoading(true);
      const faculty = {
        name: value.name,
        email: value.email,
        password: value.password,
        dob: value.dob,
        gender: value.gender,
        phone: value.phone,
        joiningYear: value.joiningYear,
        department: value.department,
      };
      console.log(faculty);
      try {
        await fetch("http://localhost:8000/admin/addfaculty", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(faculty),
        });
      } catch (err) {
        console.log(err);
      }
      alert("Faculty added successfully");
      setValue({
        name: "",
        email: "",
        password: "",
        dob: "",
        gender: "",
        phone: "",
        joiningYear: "",
        department: "",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <EngineeringIcon />
          <h1>Add Faculty</h1>
        </div>
        <div className=" mr-10 bg-white flex flex-col rounded-xl ">
          <form className={classes.adminForm0} onSubmit={handleSubmit}>
            <div className={classes.adminForm1}>
              <div className={classes.adminForm2l}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Name :</h1>
                  <input
                    placeholder="Full Name"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={value.name}
                    onChange={(e) =>
                      setValue({ ...value, name: e.target.value })
                    }
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Email Id:</h1>

                  <input
                    placeholder="Email"
                    className={classes.adminInput}
                    required
                    type="email"
                    value={value.email}
                    onChange={(e) =>
                      setValue({ ...value, email: e.target.value })
                    }
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Password :</h1>

                  <input
                    placeholder="Password"
                    required
                    className={classes.adminInput}
                    type="password"
                    value={value.password}
                    onChange={(e) =>
                      setValue({ ...value, password: e.target.value })
                    }
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Gender :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.gender}
                    onChange={(e) =>
                      setValue({ ...value, gender: e.target.value })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </div>
              </div>
              <div className={classes.adminForm2r}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Date of Birth :</h1>
                  <input
                    required
                    className={classes.adminInput}
                    type="date"
                    value={value.dob}
                    onChange={(e) =>
                      setValue({ ...value, dob: e.target.value })
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
                  <h1 className={classes.adminLabel}>Phone Number :</h1>

                  <input
                    required
                    placeholder="Phone Number"
                    className={classes.adminInput}
                    type="number"
                    value={value.phone}
                    onChange={(e) =>
                      setValue({ ...value, phone: e.target.value })
                    }
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Joining Year :</h1>
                  <input
                    required
                    placeholder="Joining Year"
                    className={classes.adminInput}
                    type="number"
                    value={value.joiningYear}
                    onChange={(e) =>
                      setValue({ ...value, joiningYear: e.target.value })
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
                    name: "",
                    dob: "",
                    email: "",
                    phone: "",
                    gender: "",
                    joiningYear: "",
                    password: "",
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
