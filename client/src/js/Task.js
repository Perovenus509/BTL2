import Axios from 'axios'
import React,{useState,useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Modal,Button } from 'react-bootstrap';
import Employee from './Employee';
import Manage from './Manage';
import Cashier from './Cashier';
import Security from './Security';
import Find from './Find';
import Building from './Building'
import moment from 'moment';
import { Container, Row ,Col} from 'react-bootstrap';
export default function Task() {
    const [id,setid] = useState("")
    const [name,setname] = useState("")
    const [dob,setdob] = useState("")
    const [ssn,setssn] = useState(0)
    const [gender,setgender] = useState("")
    const [uname,setuname] = useState("")
    const [job,setjob] = useState("")
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const openmodal = ()=>{setShow(true)}
    const closemodal = ()=>{setShow(false)}
    const openmodal1 = ()=>{setShow1(true)}
    const closemodal1 = ()=>{setShow1(false)}
    const handlerAdd = ()=>{
        console.log(id, name, dob, ssn, gender, uname, job) 
        Axios.post("http://localhost:3000/insertemployee",
        {
            Staff_ID:id, 
            Full_name: name,
            DoB:dob,
            SSN:ssn,
            Gender: gender,
            EmpUname:uname,
            Job:job
        }
        ).then((res)=>{
            alert(res.data)
            reloadall()
        })
        closemodal1() 
    };
    const remove =(id)=>{
        Axios.post("http://localhost:3000/deleteemployee",
        {
            Staff_ID:id, 
        }).then((res)=>{
            alert(res.data);
            reloadall();
        })
    }
    const handlerUpdate = (id,name,dob,ssn,gender,uname)=>{
        Axios.post("http://localhost:3000/updateemployee",
        {   
            Staff_ID: id,
            Full_name: name,
            DoB:moment(dob).format("YYYY-MM-DD"),
            SSN:ssn,
            Gender: gender,
            EmpUname:uname,
        }).then(()=>{reloadall()})
    }
    const [emplist, SetEmpList] = useState([])
    const [securitylist, SetSecurityList] = useState([])
    const [cashierlist, SetCashierList] = useState([])
    const [managelist, SetManageList] = useState([])
    useEffect(() => {
        var data = Axios.get("http://localhost:3000/employee")
        data.then((res)=>{
            SetEmpList(res.data)
        })
        //manage
        data = Axios.get("http://localhost:3000/manage")
        data.then((res)=>{
            SetManageList(res.data)
        })
        //securityguard
        data = Axios.get("http://localhost:3000/securityguard")
        data.then((res)=>{
            SetSecurityList(res.data)
         })
        //cashier
        data = Axios.get("http://localhost:3000/cashier")
        data.then((res)=>{
            SetCashierList(res.data)
        })
    }, [])
    const reloadall = ()=>{
        var data = Axios.get("http://localhost:3000/employee")
        data.then((res)=>{
            SetEmpList(res.data)
        })
        //manage
        data = Axios.get("http://localhost:3000/manage")
        data.then((res)=>{
            SetManageList(res.data)
        })
        //securityguard
        data = Axios.get("http://localhost:3000/securityguard")
        data.then((res)=>{
            SetSecurityList(res.data)
         })
        //cashier
        data = Axios.get("http://localhost:3000/cashier")
        data.then((res)=>{
            SetCashierList(res.data)
        })
        //findlist

    }
    return (
        <div className="main">
             {/* <div className="Header-app">
            <div className="nav-app"> 
            <Container>
              <Row>
                
                <Col><Link to="/Han">QUẢN LÝ NHÂN VIÊN</Link></Col>
                <Col><Link to= "/Nghia">QUẢN LÝ SINH VIÊN</Link></Col>
                <Col><Link to="/Hung">Hưng</Link></Col>
                <Col><Link>Chủ</Link></Col>
              </Row>
            </Container>
            </div>
            <div className="content-header-app">
                <img src={logo} alt="hệ thống quản lý ktx"></img>
                TRANG THÔNG TIN NHÂN VIÊN QUẢN LÝ KÝ TÚC XÁ
            </div>
          </div> */}
           <div className="Body">
           <Router>
                <div className="left"> 
                    <div className="allemployee" ><Link to="/Han">TOÀN BỘ NHÂN VIÊN</Link></div>
                    <div className="manage"><Link to="/Han/manage" >TRƯỞNG NHÀ</Link></div>
                    <div className="cashier"><Link to="/Han/cashier">THU NGÂN</Link></div>
                    <div className="security"><Link to="/Han/security">BẢO VỆ</Link></div>
                    <div className="Function">THAO TÁC</div>
                    <div className="Searchemployee" ><Link to="/Han/find">Tìm kiếm</Link></div>
                    <div className="Addemployee" onClick={openmodal1} ><Link to="/Han">Thêm</Link></div>
                    <Modal show={show1} onHide ={closemodal1} centered id ="add">
                          <Modal.Header closeButton style={{backgroundColor:"#438eb9"}}>Thêm nhân viên</Modal.Header>
                          <Modal.Body>
                            <div className="bodymodal">
                                <label>ID</label>
                                <div>
                                <input placeholder="Nhập id" onChange={(e)=>{setid(e.target.value)}}></input>
                                </div>

                                <label>Tên</label>
                                <div>
                                <input placeholder="Nhập tên" onChange={(e)=>{setname(e.target.value)}}></input>
                                </div>

                                <label>Ngày sinh</label>
                                <div>
                                <input placeholder="YYYY-MM-DD"onChange={(e)=>{setdob(e.target.value)}}></input>
                                </div>
                                <label>CMND/CCD</label>
                                <div>
                                <input placeholder="gồm 9 hoặc 12 số"onChange={(e)=>{setssn(e.target.value)}}></input>
                                </div>
                                <label>Giới tính</label>
                                <div>
                                <input placeholder="MALE/FEMALE"onChange={(e)=>{setgender(e.target.value)}}></input>
                                </div>
                                <label>Tên đăng nhập</label>
                                <div>
                                <input placeholder="Tối đa 20 ký tự" onChange={(e)=>{setuname(e.target.value)}}></input>
                                </div>

                                <label>Chức vụ</label>
                                <div>
                                <input placeholder="Nhập chức vụ" onChange={(e)=>{setjob(e.target.value)}}></input>
                                </div>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>  <Button onClick={handlerAdd}>Thêm</Button></Modal.Footer>
                    </Modal>
                </div>

                <Switch>
                    <Route  exact path="/Han">
                    <Employee remove={remove} update={handlerUpdate} emplist={emplist}/>
                    </Route>
                    <Route  path="/Han/manage">
                    <Manage  remove={remove} update={handlerUpdate} managelist={managelist}/>
                    </Route>
                    <Route   path="/Han/cashier">
                    <Cashier   remove={remove} update={handlerUpdate} cashierlist={cashierlist}/>
                    </Route>
                    <Route  path="/Han/security">
                    <Security   remove={remove} update={handlerUpdate} securitylist={securitylist}/>
                    </Route>
                    <Route  path="/Han/find">
                    <Find   remove={remove} update={handlerUpdate} />
                    </Route >
                    <Route   path="/Han/building">
                    <Building remove={remove} update={handlerUpdate}  />
                    </Route >
                </Switch>
           </Router>
           </div>
           <div className="Footer"> BTL 2 DATABASE</div>
        </div>
    )
}
