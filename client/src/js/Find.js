import React ,{useState}from 'react'
import Axios from 'axios'
import Moment from 'moment';
import '../css/Find.css'
import {Row, Col, Container,Button} from 'react-bootstrap'
import { Modal } from 'react-bootstrap';
import moment from 'moment';
export default function Find({remove,update}) {
    const [id, setid] = useState("")
    const [name,setname] = useState("")
    const [dob,setdob] = useState("")
    const [ssn,setssn] = useState(0)
    const [gender,setgender] = useState("")
    const [uname,setuname] = useState("")
    const [bname,setbname] =useState("")
    const [ngay,setngay] =useState("")
    const [shift,setshift] =useState("")
    const [show, setShow] = useState(false);
    const openmodal2 = (id,name,dob,ssn,gender,uname)=>{
        setid(id)
        setname(name)
        setdob(dob)
        setssn(ssn)
        setgender(gender)
        setuname(uname)
        setShow(true)
    }
    const closemodal2 = ()=>{setShow(false)}
    const  [findlist,Setfind] = useState([])
    const handlerFind =()=>{
        Axios.post("http://localhost:3002/findemployee",
        {
            Staff_ID:id, 
            Full_name: name,
            EmpUname:uname,
        }
        ).then((res)=>{Setfind(res.data)})
    
    };
    const handlerSecurity =()=>{
        Axios.post("http://localhost:3002/findsecurity",
        {
            Bname: bname,
            day: ngay,
            shift : shift
        }
        ).then((res)=>{
            Setfind(res.data)
        })
    }
    return (
       <div className="find">
        <Container className="header-find">
                <Row>
                    <Col md ={2} style={{lineHeight:"4"}}>
                       Nhân viên
                    </Col>
                    <Col md ={3}>
                        <label>ID </label>
                        <h5><input  onChange={(e)=>{setid(e.target.value)}}></input></h5>
                    </Col>
                    <Col md ={3}>
                        <label>Tên </label>
                        <h5><input  onChange={(e)=>{setname(e.target.value)}}></input></h5>
                    </Col>
                    <Col md ={3}>
                        <label>Tên đăng nhập </label>
                        <h5><input  onChange={(e)=>{setuname(e.target.value)}}></input></h5>
                    </Col>
                    <Col md ={1} style={{lineHeight:"4"}} onClick={handlerFind}>
                            <label>Tìm kiếm </label>
                    </Col>
                    <Col md ={2} style={{lineHeight:"4"}}>
                        Bảo vệ
                    </Col>
                    <Col md ={3}>
                        <label>Tòa nhà </label>
                        <h5><input onChange={(e)=>{setbname(e.target.value)}}></input></h5>
                    </Col>
                    <Col md ={3}>
                        <label>Ngày</label>
                        <h5><input type ="date"  onChange={(e)=>{setngay(moment(e.target.value).format("YYYY-MM-DD"))}}></input></h5>
                    </Col>
                    <Col md ={3}>
                        <label>Ca </label>
                        <h5><input placeholder="Sáng/Tối"  onChange={(e)=>{setshift(e.target.value)}}></input></h5> 
                        
                    </Col>
                    <Col md ={1} style={{lineHeight:"4"}} onClick={handlerSecurity}>
                        <label>Tìm kiếm </label>
                    </Col>
                </Row>
        </Container>
        <Container className="body-find">
                        {findlist.length ===0?<h1>trống</h1>:
                        <Row>
                        <Col md={1} style={{backgroundColor:"#F1F1F1"}}>STT</Col>
                        <Col md={1} style={{backgroundColor:"#F1F1F1"}}>ID</Col>
                        <Col md={2} style={{backgroundColor:"#F1F1F1"}}>TÊN</Col>
                        <Col md={1} style={{backgroundColor:"#F1F1F1"}}>NGÀY SINH</Col>
                        <Col md={1} style={{backgroundColor:"#F1F1F1"}}>CMND/CCCD</Col>
                        <Col md={1} style={{backgroundColor:"#F1F1F1"}}>GIỚI TÍNH</Col>
                        <Col md={2} style={{backgroundColor:"#F1F1F1"}}>TÊN ĐĂNG NHẬP</Col>
                        <Col md={1} style={{backgroundColor:"#F1F1F1"}}>CHỨC VỤ</Col>
                        <Col md={1} style={{backgroundColor:"#F1F1F1"}}></Col>
                        <Col md={1} style={{backgroundColor:"#F1F1F1"}}></Col>
                        <Modal show={show} onHide ={closemodal2} centered id="aaa">
                            <Modal.Header style={{backgroundColor:"#438eb9"}} closeButton >Cập nhật thông tin</Modal.Header>
                            <Modal.Body>
                                <div className="bodymodal">
                                <label>Tên</label>
                                <div>
                                <input placeholder="Nhập tên" value={name} onChange={(e)=>{setname(e.target.value)}}></input>
                                </div>

                                <label>Ngày sinh</label>
                                <div>
                                <input placeholder="YYYY-MM-DD" value={dob} onChange={(e)=>{setdob(e.target.value)}}></input>
                                </div>
                                <label>CMND/CCD</label>
                                <div>
                                <input placeholder="gồm 9 hoặc 12 số" value={ssn} onChange={(e)=>{setssn(e.target.value)}}></input>
                                </div>
                                <label>Giới tính</label>
                                <div>
                                <input placeholder="MALE/FEMALE" value={gender} onChange={(e)=>{setgender(e.target.value)}}></input>
                                </div>
                                <label>Tên đăng nhập</label>
                                <div>
                                <input placeholder="Tối đa 20 ký tự" value={uname} onChange={(e)=>{setuname(e.target.value)}}></input>
                                </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer> <Button onClick={()=>{update(id,name,dob,ssn,gender,uname);closemodal2()}}>Cập nhật</Button>
                            </Modal.Footer>
                        </Modal>
                        </Row>}
                        {findlist.map((item,index)=>(
                             <Row>
                             <Col md={1}>{index +   1}</Col>
                             <Col md={1}>{item.Staff_ID}</Col>
                             <Col md={2}>{item.Full_name}</Col>
                             <Col md={1}>{Moment(item.DoB).format("DD/MM/YYYY")}</Col>
                             <Col md={1}>{item.SSN}</Col>
                             <Col md={1}>{item.Gender==='MALE'?"Nam":"Nữ"}</Col>
                             <Col md={2}>{item.EmpUname}</Col>
                             <Col md={1}>{item.Job}</Col>
                             <Col md={1} style={{cursor:"pointer"}} id="update1" onClick={()=>{openmodal2(item.Staff_ID,item.Full_name,Moment(item.DoB).format("YYYY-MM-DD"),item.SSN,item.Gender,item.EmpUname)}}>Cập nhật</Col>
                             <Col md={1} style={{cursor:"pointer"}} id="remove1" onClick={()=>{remove(item.Staff_ID)}}>Xóa</Col>
                             </Row>
                        ))}
        </Container>
       </div>
    )
}
