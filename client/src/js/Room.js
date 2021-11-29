import React from 'react'
import { useState } from 'react'
import { Row, Col, Container} from 'react-bootstrap';
import Axios from 'axios';
import '../css/Hung.css'
import UpdateModal from './UpdateModal';

export default function Room() {
    const [roomList, setRoomList] = useState([])
    const [handler, sethandler] = useState(()=>{
        var data = Axios.get("http://localhost:3000/room1")
        data.then((res)=>{
            setRoomList(res.data)
        })
    })

    console.log(roomList)

    return (
        <div className="Information">
          <Container>
            <Row>
              <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>BName</Col>
              <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>RoomID</Col>
              <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>Capacity</Col>
              <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>Amount of member</Col>
              <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>Air conditioner</Col>
              <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>Status</Col>
              <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>Update</Col>
            </Row>
            
            {roomList.map(room => (
              <Row>
                <Col>{room.B_Name}</Col>
                <Col>{room.Room_ID}</Col>
                <Col>{room.Capacity}</Col>
                <Col>{room.Amount_of_member}</Col>
                <Col>{room.is_Air_Conditioner}</Col>
                <Col>{room.Status}</Col>
                <Col>
                  <UpdateModal room={room}/>
                </Col>
              </Row>
            ))}
          </Container>
        </div>
    )
}
