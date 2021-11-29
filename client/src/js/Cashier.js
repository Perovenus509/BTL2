import React ,{useState}from 'react'
import Axios from 'axios'
import Moment from 'moment';
import '../css/Employee.css'
import {Row, Col, Container,Button} from 'react-bootstrap'
import { Modal } from 'react-bootstrap';
import moment from 'moment';
export default function Cashier({remove,update,cashierlist}) {
    
    const [id, setid] = useState("")
    const [name,setname] = useState("")
    const [dob,setdob] = useState("")
    const [ssn,setssn] = useState(0)
    const [gender,setgender] = useState("")
    const [uname,setuname] = useState("")
    const [show, setShow] = useState(false);
    const openmodal = (id,name,dob,ssn,gender,uname)=>{
        setid(id)
        setname(name)
        setdob(dob)
        setssn(ssn)
        setgender(gender)
        setuname(uname)
        setShow(true)
    }
    const closemodal = ()=>{setShow(false)}
    return (
        <Container className="right">
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
            <Modal show={show} onHide ={closemodal} centered id="aaa">
                                    <Modal.Header style={{backgroundColor:"#438eb9"}} closeButton >Cập nhật thông tin</Modal.Header>
                                    <Modal.Body>
                                        <div className="bodymodal">
                                        <label>Tên</label>
                                        <div>
                                        <input placeholder="Nhập tên" value={name} onChange={(e)=>{setname(e.target.value)}}></input>
                                        </div>

                                        <label>Ngày sinh</label>
                                        <div>
                                        <input placeholder="dd/mm/yyyy" value={dob} onChange={(e)=>{setdob(e.target.value)}}></input>
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
                                    <Modal.Footer> <Button onClick={()=>{update(id,name,dob,ssn,gender,uname);closemodal()}}>Cập nhật</Button>
                                    </Modal.Footer>
                        </Modal>
            </Row>
            {cashierlist.map((item,index)=>(
                <Row>
                <Col md={1}>{index +   1}</Col>
                <Col md={1}>{item.Staff_ID}</Col>
                <Col md={2}>{item.Full_name}</Col>
                <Col md={1}>{Moment(item.DoB).format("DD/MM/YYYY")}</Col>
                <Col md={1}>{item.SSN}</Col>
                <Col md={1}>{item.Gender==='MALE'?"Nam":"Nữ"}</Col>
                <Col md={2}>{item.EmpUname}</Col>
                <Col md={1}>{item.Job}</Col>
                <Col md={1} style={{cursor:"pointer"}} id="update1" onClick={()=>{openmodal(item.Staff_ID,item.Full_name,item.DoB,item.SSN,item.Gender,item.EmpUname)}}>Cập nhật</Col>
                <Col md={1} style={{cursor:"pointer"}} id="remove1" onClick={()=>{remove(item.Staff_ID)}}>Xóa</Col>
                </Row>
            ))}
        </Container>
    )
}
