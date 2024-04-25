import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Spinner from "../../../Utils/Spinner";
import * as classes from "../../../Utils/Styles";

const Body = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    department: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.department) {
      alert("Please fill all the fields");
    } else {
      setLoading(true);
      const departments = {
        department: value.department,
      };
      try {
        await fetch("http://localhost:8000/admin/adddepartment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(departments),
        });
      } catch (err) {
        console.log(err);
      }
      alert("Department added successfully");
      setValue({
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
          <h1>Add Department</h1>
        </div>
        <div className=" mr-10 bg-white flex flex-col rounded-xl ">
          <form className={classes.adminForm0} onSubmit={handleSubmit}>
            <div className={classes.adminForm1}>
              <div className={classes.adminForm2l}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Department :</h1>
                  <input
                    placeholder="Department Name"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={value.department}
                    onChange={(e) =>
                      setValue({ ...value, department: e.target.value })
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
                    department: "",
                  });
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
