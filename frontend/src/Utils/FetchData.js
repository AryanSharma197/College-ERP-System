// export const [adminLength, setAdminLength] = useState(0);
// export const [facultyLength, setFacultyLength] = useState(0);
// export const [studentLength, setStudentLength] = useState(0);
// export const [departmentLength, setDepartmentLength] = useState(0);
export let adminLength = 0;

export const fetchAdmins = async () => {
  try {
    const res = await fetch("http://localhost:8000/admin/getalladmin");
    const data = await res.json();
    return {
      adminLength: data.length,
      adminData: data,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchFaculty = async () => {
  try {
    const res = await fetch("http://localhost:8000/admin/getallfaculty");
    const data = await res.json();
    return {
      facultyLength: data.length,
      facultyData: data,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchStudents = async () => {
  try {
    const res = await fetch("http://localhost:8000/admin/getallstudent");
    const data = await res.json();
    return {
      studentLength: data.length,
      studentData: data,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDepartments = async () => {
  try {
    const res = await fetch("http://localhost:8000/admin/getalldepartment");
    const data = await res.json();
    return {
      departmentLength: data.length,
      departmentData: data,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchNotices = async () => {
  try {
    const res = await fetch("http://localhost:8000/admin/getallnotice");
    const data = await res.json();
    return {
      noticeLength: data.length,
      noticeData: data,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchSubjects = async () => {
  try {
    const res = await fetch("http://localhost:8000/admin/getallsubject");
    const data = await res.json();
    return {
      subjectLength: data.length,
      subjectData: data,
    };
  } catch (error) {
    console.log(error);
  }
};
