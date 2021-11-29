import React, { useState } from "react";
import Axios from "axios";
import "../css/Student.css";
import moment from "moment";

function Student() {
  const [studentList, setStudentList] = useState([]);

  const [ID, setID] = useState("");
  const [name, setName] = useState("");
  const [ssn, setSSN] = useState("");
  const [gender, setGender] = useState("Male");
  const [dob, setDOB] = useState("");
  const [school, setSchool] = useState("BK");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState(0);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("101");

  const [uID, setuID] = useState("");
  const [uname, setuName] = useState("");
  const [ussn, setuSSN] = useState("");
  const [ugender, setuGender] = useState("Male");
  const [udob, setuDOB] = useState("");
  const [uschool, setuSchool] = useState("BK");
  const [uyear, setuYear] = useState("");
  const [ubuilding, setuBuilding] = useState("");
  const [uroom, seturoom] = useState("");
  const [umonth, setuMonth] = useState(0);

  const [buildingList, setBuildingList] = useState([]);
  const [roomList, setRoomList] = useState([]);

  const [searchedStudent, setSearchedStudent] = useState([]);
  const [inputID, setInputID] = useState("");

  const updateStudent = () => {
    Axios.put("http://localhost:3000/updatestudent", {
      id: uID,
      fullname: uname,
      ssn: ussn,
      gender: ugender,
      dob: udob,
      school: uschool,
      schoolyear: uyear,
      BName: ubuilding,
      RoomID: uroom,
      month: umonth,
    }).then((response) => {
      updateRent();
    });
  };

  const updateRent = () => {
    Axios.post("http://localhost:3000/updaterentinfo", {
      studentID: uID,
      BName: ubuilding,
      RoomID: uroom,
      month: umonth,
    }).then((response) => {
      getStudent();
    });
  };

  const deleteStudent = (id) => {
    Axios.delete(`http://localhost:3000/deletestudent/${id}`).then(() => {
      getStudent();
    });
  };

  const getRoom = () => {
    Axios.post("http://localhost:3000/room", {
      building: selectedBuilding,
    }).then((response) => {
      setRoomList(response.data);
    });
  };

  const getSearchedStudent = () => {
    Axios.post("http://localhost:3000/searchstudent", {
      id: inputID,
    }).then((response) => {
      setSearchedStudent(response.data);
    });
  };

  const getBuilding = () => {
    Axios.get("http://localhost:3000/building").then((response) => {
      setBuildingList(response.data);
    });
  };

  const getStudent = () => {
    Axios.get("http://localhost:3000/students").then((response) => {
      setStudentList(response.data);
    });
  };

  const getAllStudent = () => {
    Axios.get("http://localhost:3000/allstudents").then((response) => {
      setStudentList(response.data);
    });
  };

  const addStudent = () => {
    Axios.post("http://localhost:3000/addroom", {
      id: ID,
      fullname: name,
      ssn: ssn,
      gender: gender,
      dob: dob,
      school: school,
      schoolyear: year,
      building: selectedBuilding,
      room: selectedRoom,
      month: month,
    }).then(() => {
      getStudent();
    });
  };

  return (
    <div className="App">
      <h1>Quản Lý Thông Tin Sinh Viên</h1>
      <div className="form__container">
        {/* form thêm thông tin sinh viên */}
        <div className="form" style={{ backgroundColor: "lightblue" }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              margin: "10px",
            }}
          >
            <caption>
              <h2>Thêm thông tin sinh viên</h2>
            </caption>
            <label htmlFor="mssv">MSSV:</label>
            <input
              type="text"
              id="mssv"
              onChange={(event) => {
                setID(event.target.value);
              }}
            ></input>

            <label htmlFor="name">Họ và Tên:</label>
            <input
              type="text"
              id="name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></input>

            <label htmlFor="SSN">CMND/CCCD:</label>
            <input
              type="text"
              id="SSN"
              onChange={(event) => {
                setSSN(event.target.value);
              }}
            ></input>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="gender">Giới tính:</label>
                <select
                  defaultValue="Male"
                  id="gender"
                  onChange={(event) => {
                    setGender(event.target.value);
                  }}
                >
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="dob">Ngày sinh:</label>
                <input
                  type="date"
                  onChange={(event) => {
                    setDOB(event.target.value);
                  }}
                ></input>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="school">Trường:</label>
                <select
                  id="school"
                  value={school}
                  onChange={(event) => {
                    setSchool(event.target.value);
                  }}
                >
                  <option value="BK">ĐH Bách Khoa</option>
                  <option value="KHTN">ĐH Khoa học tự nhiên</option>
                  <option value="CNTT">ĐH Công nghệ thông tin</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="schoolyear">Năm:</label>
                <input
                  type="number"
                  onChange={(event) => {
                    setYear(event.target.value);
                  }}
                ></input>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="building">Nhà:</label>
                <select
                  id="building"
                  onClick={getBuilding}
                  onChange={(event) => {
                    setSelectedBuilding(event.target.value);
                  }}
                  style={{ width: "100px" }}
                  value={selectedBuilding}
                >
                  {buildingList.map((val) => (
                    <option value={val.name} key={val.name}>
                      {val.Name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="room">Phòng:</label>
                <select
                  id="room"
                  onClick={getRoom}
                  onChange={(event) => {
                    setSelectedRoom(event.target.value);
                  }}
                  value={selectedRoom}
                >
                  {roomList.map((val) => (
                    <option>{val.Room_ID}</option>
                  ))}
                </select>
              </div>
            </div>
            <label htmlFor="month">Số tháng:</label>
            <input
              type="number"
              id="month"
              onChange={(event) => {
                setMonth(event.target.value);
              }}
            ></input>
          </form>
          <button onClick={addStudent}>Thêm sinh viên</button>
        </div>

        {/* form cập nhật thông tin sinh viên */}
        <div className="form" style={{ backgroundColor: "lightgrey" }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              margin: "10px",
            }}
          >
            <caption>
              <h2>Cập nhật thông tin sinh viên</h2>
            </caption>
            <label htmlFor="mssv">MSSV:</label>
            <input type="text" id="mssv" value={uID} disabled={true}></input>

            <label htmlFor="name">Họ và Tên:</label>
            <input
              type="text"
              id="name"
              value={uname}
              onChange={(event) => {
                setuName(event.target.value);
              }}
            ></input>

            <label htmlFor="SSN">CMND/CCCD:</label>
            <input
              type="text"
              id="SSN"
              value={ussn}
              onChange={(event) => {
                setuSSN(event.target.value);
              }}
            ></input>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="gender">Giới tính:</label>
                <select
                  id="gender"
                  value={ugender}
                  onChange={(event) => {
                    setuGender(event.target.value);
                  }}
                >
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="dob">Ngày sinh:</label>
                <input
                  type="date"
                  value={udob}
                  onChange={(event) => {
                    setuDOB(event.target.value);
                  }}
                ></input>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="school">Trường:</label>
                <select
                  id="school"
                  value={uschool}
                  onChange={(event) => {
                    setuSchool(event.target.value);
                  }}
                >
                  <option value="BK">ĐH Bách Khoa</option>
                  <option value="KHTN">ĐH Khoa học tự nhiên</option>
                  <option value="CNTT">ĐH Công nghệ thông tin</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="schoolyear">Năm:</label>
                <input
                  type="number"
                  value={uyear}
                  onChange={(event) => {
                    setuYear(event.target.value);
                  }}
                ></input>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="building">Nhà:</label>
                <select
                  id="building"
                  onClick={getBuilding}
                  onChange={(event) => {
                    setuBuilding(event.target.value);
                  }}
                  style={{ width: "100px" }}
                  value={ubuilding}
                >
                  {buildingList.map((val) => (
                    <option value={val.name} key={val.name}>
                      {val.Name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="room">Phòng:</label>
                <select
                  id="room"
                  onClick={getRoom}
                  onChange={(event) => {
                    seturoom(event.target.value);
                  }}
                  value={uroom}
                >
                  {roomList.map((val) => (
                    <option>{val.Room_ID}</option>
                  ))}
                </select>
              </div>
            </div>
            <label htmlFor="month">Số tháng:</label>
            <input
              type="number"
              id="month"
              onChange={(event) => {
                setuMonth(event.target.value);
              }}
            ></input>
          </form>
          <button onClick={updateStudent}>Cập nhật</button>
        </div>
      </div>

      <div>
        <input
          type="search"
          placeholder="MSSV"
          style={{ height: "40px" }}
          onChange={(event) => {
            setInputID(event.target.value);
          }}
        ></input>
        <button onClick={getSearchedStudent}>Tìm kiếm</button>
        <h3>Thông tin sinh viên</h3>
        {searchedStudent.map((val, key) => {
          return (
            <table
              key={key}
              style={{ width: "80%", textAlign: "left", margin: "0px auto" }}
            >
              <thead style={{ height: "30px", fontWeight: "bold" }}>
                <td>STT</td>
                <td>MSSV</td>
                <td>Họ và tên</td>
                <td>CMND/CCCD</td>
                <td>Giới tính</td>
                <td>Ngày sinh</td>
                <td>Trường</td>
                <td>Năm</td>
                <td>Nhà</td>
                <td>Phòng</td>
                <td>Bắt đầu</td>
                <td>Kết thúc</td>
              </thead>
              <tbody>
                <tr>
                  <td>{key + 1}</td>
                  <td>{val.StudentID}</td>
                  <td>{val.Full_name}</td>
                  <td>{val.SSN}</td>
                  <td>{val.Gender === "Male"?"Nam":"Nữ"}</td>
                  <td>{moment(val.DoB).format("DD/MM/YYYY")}</td>
                  <td>{val.School}</td>
                  <td>{val.SchoolYear}</td>
                  <td>{val.R_BName}</td>
                  <td>{val.R_Room_ID}</td>
                  <td>{moment(val.Start_date).format("DD/MM/YYYY")}</td>
                  <td>{moment(val.End_date).format("DD/MM/YYYY")}</td>
                  <td>
                    <div
                      style={{
                        padding: "5px 0",
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <button
                        style={{ color: "red" }}
                        onClick={() => {
                          deleteStudent(val.StudentID);
                        }}
                      >
                        xóa
                      </button>
                      <button
                        style={{ color: "green" }}
                        onClick={() => {
                          setuID(val.StudentID);
                          setuName(val.Full_name);
                          setuSSN(val.SSN);
                          setuGender(val.Gender);
                          setuDOB(val.DoB);
                          setuSchool(val.School);
                          setuYear(val.SchoolYear);
                          setuBuilding(val.R_BName);
                          seturoom(val.R_Room_ID);
                        }}
                      >
                        sửa
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>

      <button onClick={getStudent} style={{ margin: "10px auto" }}>
        Danh sách sinh viên đang ở
      </button>
      <button onClick={getAllStudent} style={{ margin: "10px auto" }}>
        Toàn bộ sinh viên
      </button>

      {/* bảng hiển thị thông tin sinh viên */}
      <div>
        <table style={{ width: "80%", textAlign: "left", margin: "0px auto" }}>
          <thead style={{ height: "30px", fontWeight: "bold" }}>
            <td>STT</td>
            <td>MSSV</td>
            <td>Họ và tên</td>
            <td>CMND/CCCD</td>
            <td>Giới tính</td>
            <td>Ngày sinh</td>
            <td>Trường</td>
            <td>Năm</td>
          </thead>
          <tbody>
            {studentList.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{val.StudentID}</td>
                  <td>{val.Full_name}</td>
                  <td>{val.SSN}</td>
                  <td>{val.Gender === "Male"?"Nam":"Nữ"}</td>
                  <td>{moment(val.DoB).format("DD/MM/YYYY")}</td>
                  <td>{val.School}</td>
                  <td>{val.SchoolYear}</td>
                  <td>
                    <div
                      style={{
                        padding: "5px 0",
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <button
                        style={{ color: "red" }}
                        onClick={() => {
                          deleteStudent(val.StudentID);
                        }}
                      >
                        xóa
                      </button>
                      <button
                        style={{ color: "green" }}
                        onClick={() => {
                          setuID(val.StudentID);
                          setuName(val.Full_name);
                          setuSSN(val.SSN);
                          setuGender(val.Gender);
                          setuDOB(val.DoB);
                          setuSchool(val.School);
                          setuYear(val.SchoolYear);
                          setuBuilding(val.R_BName);
                          seturoom(val.R_Room_ID);
                        }}
                      >
                        sửa
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
