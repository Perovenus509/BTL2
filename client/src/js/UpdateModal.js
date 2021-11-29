import React from 'react'
import { useState } from 'react'
import { Modal, Button, Row, Col, Container } from 'react-bootstrap'
import Axios from 'axios'


export default function UpdateModal({room}) {

    const [showUpdate, setShowUpdate] = useState(false)
    const handleShowUpdate = () => setShowUpdate(true)
    const handleCloseUpdate = () => setShowUpdate(false)

    const [capacity, updateCapacity] = useState(room.Capacity);
    const [amountOfMember, updateAmountOfMember] = useState(room.Amount_of_member);
    const [isAirconditioner, updateIsAirconditioner] = useState(room.is_Air_Conditioner);

    const updateRoom = (B_Name, Room_ID) => {
      Axios.post('http://localhost:3000/api/update_for_room', {
        B_Name: B_Name,
        Room_ID: Room_ID,
        Capacity: capacity,
        Amount_of_member: amountOfMember,
        isAirconditioner: isAirconditioner
      }).then(() => {
        alert('successfull update');
      });
    }

    return (
        <div>
            <Button onClick={handleShowUpdate}>Update</Button>

            <Modal show={showUpdate} centered onHide={handleCloseUpdate}>
                <Modal.Header closeButton style={{backgroundColor:"#2980b9"}}></Modal.Header>
                <Modal.Body>
                  <Container>
                    <Row>
                      <Col md={6}>
                        <label>B_Name</label>
                      </Col>
                      <Col md={6}>
                        <input style={{width:"60%"}} value={room.B_Name}></input>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <label>Room_ID</label>
                      </Col>
                      <Col md={6}>
                        <input style={{width:"60%"}} value={room.Room_ID}></input>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <label>Capacity</label>
                      </Col>
                      <Col md={6}>
                        <input style={{width:"60%"}} placeholder={room.Capacity} onChange={(e) => {
                          updateCapacity(e.target.value)}}></input>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <label>Amount of member</label>
                      </Col>
                      <Col md={6}>
                        <input style={{width:"60%"}} placeholder={room.Amount_of_member} onChange={(e) => {
                          updateAmountOfMember(e.target.value)}}></input>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <label>isAirconditioner</label>
                      </Col>
                      <Col md={6}>
                        <input style={{width:"60%"}} placeholder={room.is_Air_Conditioner} onChange={(e) => {
                          updateIsAirconditioner(e.target.value)}}></input>
                      </Col>
                    </Row>
                  </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => updateRoom(room.B_Name,room.Room_ID)}>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
