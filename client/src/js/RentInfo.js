import React from 'react'
import { useState } from 'react'
import { Row, Col, Container, Button} from 'react-bootstrap';
import Axios from 'axios';
import Moment from 'moment';
import '../css/Hung.css';

export default function RentInfo({rentInfoList}) {
    
  const deleteRow = (rentInfo) => {
    Axios.post('http://localhost:3000/api/delete_from_rent_info', {
      R_StudentID: rentInfo.R_StudentID,
      R_BName: rentInfo.R_BName,
      R_Room_ID: rentInfo.R_Room_ID,
      Start_date: Moment(rentInfo.Start_date).format("YYYY-MM-DD"),
      End_date: Moment(rentInfo.End_date).format("YYYY-MM-DD"),
      isRoomleader: rentInfo.isRoomleader
    }).then(() => {
      alert("Successfull delete");
    });

  }
  return (
    <div className="Information">
      <Container>
        <Row>
          <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>R_StudentID</Col>
          <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>R_BName</Col>
          <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>R_Room_ID</Col>
          <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>Start date</Col>
          <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>End date</Col>
          <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>isRoomleader</Col>
          <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>Delete</Col>
        </Row>
        
        {rentInfoList.map(rentInfo => (
          <Row>
            <Col>{rentInfo.R_StudentID}</Col>
            <Col>{rentInfo.R_BName}</Col>
            <Col>{rentInfo.R_Room_ID}</Col>
            <Col>{Moment(rentInfo.Start_date).format("YYYY-MM-DD")}</Col>
            <Col>{Moment(rentInfo.End_date).format("YYYY-MM-DD")}</Col>
            <Col>{rentInfo.isRoomleader}</Col>
            <Col>
              <Button onClick={() => deleteRow(rentInfo)}>Delete</Button>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  )
}
