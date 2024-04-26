import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../Utils/Spinner";
import * as classes from "../../../Utils/Styles";

const Body = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    date: "",
    from: "",
    topic: "",
    description: "",
    to: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    if (
      !value.date ||
      !value.from ||
      !value.topic ||
      !value.description ||
      !value.to
    ) {
      alert("Please fill all the fields");
    } else {
      setLoading(true);
      const notice = {
        date: value.date,
        from: value.from,
        topic: value.topic,
        description: value.description,
        to: value.to,
      };
      console.log(notice);
      try {
        fetch("http://localhost:8000/admin/createnotice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notice),
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
      alert("Notice created successfully");
      setValue({
        date: "",
        for: "",
        topic: "",
        description: "",
        to: "",
      });
      setLoading(false);
    }
  };
  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <EngineeringIcon />
          <h1>Create Notice</h1>
        </div>
        <div className=" mr-10 bg-white flex flex-col rounded-xl ">
          <form className={classes.adminForm0} onSubmit={handleSubmit}>
            <div className={classes.adminForm1}>
              <div className={classes.adminForm2l}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Date :</h1>
                  <input
                    placeholder="Date"
                    required
                    className={classes.adminInput}
                    type="date"
                    value={value.date}
                    onChange={(e) =>
                      setValue({ ...value, date: e.target.value })
                    }
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Topic :</h1>

                  <input
                    required
                    placeholder="Topic"
                    className={classes.adminInput}
                    type="text"
                    value={value.topic}
                    onChange={(e) =>
                      setValue({ ...value, topic: e.target.value })
                    }
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>To :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.to}
                    onChange={(e) => setValue({ ...value, to: e.target.value })}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="faculty">Faculty</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                  </Select>
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>from :</h1>

                  <input
                    required
                    placeholder="from"
                    className={classes.adminInput}
                    type="text"
                    value={value.from}
                    onChange={(e) =>
                      setValue({ ...value, from: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={classes.adminForm2r}>
                <div className={classes.adminForm3}>
                  <h1 className={`self-start  ${classes.adminLabel}`}>
                    Description :
                  </h1>
                  <textarea
                    rows={10}
                    cols={40}
                    required
                    placeholder="Content...."
                    className={classes.adminInput}
                    value={value.description}
                    onChange={(e) =>{
                        setValue({ ...value, description: e.target.value })
                        console.log(value);
                    }
                    }
                  />
                </div>
                <div className={classes.adminForm3}></div>
              </div>
            </div>
            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>
              <button
                onClick={() => {
                  setValue({
                    date: "",
                    from: "",
                    topic: "",
                    description: "",
                    to: "",
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
                  message="Creating Notice"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.noticeError || error.backendError) && (
                <p className="text-red-500">
                  {error.noticeError || error.backendError}
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
