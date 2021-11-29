import React ,{useState}from 'react'
import Axios from 'axios'
import '../css/Manage.css'
import '../css/Building.css'
import {Row, Col, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import moment from 'moment';
export default function Building({remove,update}) {
   
    const [managelist, SetManageList] = useState([])
    const [handler, Sethandler] = useState(()=>{
       
        var data = Axios.get("http://localhost:3000/managetime")
        data.then((res)=>{
            SetManageList(res.data)
        })
       
    })
    const [id, setid] = useState("")
    const [name,setname] = useState("")
    const [dob,setdob] = useState("")
    const [ssn,setssn] = useState(0)
    const [gender,setgender] = useState("")
    const [uname,setuname] = useState("")
    const [job,setjob] = useState("")
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
    return (
       <div className="manager">
           <Container className="header-manager">
                <Row>
                     <Col style={{backgroundColor:"#bdc3c7",cursor:"pointer"}} md={1}>
                        <Link to="/Han/manage"> {'<<'}</Link>
                    </Col>
                    <Col style={{backgroundColor:"#bdc3c7",cursor:"pointer"}}>
                        DANH SÁCH QUẢN LÝ CÁC TÒA KTX
                    </Col>
                   
                </Row>
           </Container>
           <Container className="body-manager">
            <Row>
                <Col md={1} style={{backgroundColor:"#F1F1F1"}}>STT</Col>
                <Col md={1} style={{backgroundColor:"#F1F1F1"}}>ID</Col>
                <Col md={2} style={{backgroundColor:"#F1F1F1"}}>TÊN</Col>
                <Col md={1} style={{backgroundColor:"#F1F1F1"}}>GIỚI TÍNH</Col>
                <Col md={1} style={{backgroundColor:"#F1F1F1"}}>TÒA NHÀ</Col>
                <Col md={3} style={{backgroundColor:"#F1F1F1"}}>BẮT ĐẦU</Col>
                <Col md={3} style={{backgroundColor:"#F1F1F1"}}>KẾT THÚC</Col>
                </Row>
                {managelist.map((item,index)=>(
                    <Row>
                    <Col md={1}>{index + 1}</Col>
                    <Col md={1}>{item.Staff_ID}</Col>
                    <Col md={2}>{item.Full_name}</Col>
                    <Col md={1}>{item.Gender==='MALE'?"Nam":"Nữ"}</Col>
                    <Col md={1}>{item.BName}</Col>
                    <Col md={3}>{moment(item.Start_date).format("DD/MM/YYYY")}</Col>
                    <Col md={3}>{moment(item.End_date).format("DD/MM/YYYY")}</Col>
                    </Row>
                ))}
           </Container>
          
       </div>
    )
}
