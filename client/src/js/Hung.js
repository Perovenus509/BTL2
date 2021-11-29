import '../css/Hung.css';
import React from 'react';
import { useState } from 'react';
import logo from '../img/logo.png'
import BuildingConfig from './BuildingConfig';
import Config from './Config';
import Room from './Room';
import RentInfo from './RentInfo';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Row, Col, Modal, Button, Container } from 'react-bootstrap'
import Axios from 'axios';

function Hung() {
  const [showInsert, setShowInsert] = useState(false);
  const handleShowInsert = () => setShowInsert(true);
  const handleCloseInsert = () => setShowInsert(false);

  const [BM_ID, setBM_ID] = useState('');
  const [bName, setBName] = useState('');
  const [lastConfigDate, setLastConfigDate] = useState('');
  const [latestWPriceIndex, setLatestWPriceIndex] = useState('');
  const [latestEPriceIndex, setLatestEPriceIndex] = useState('');

  const [searchKey, setSearchKey] = useState('');

  const insertConfig = () => {
    Axios.post('http://localhost:3000/api/insert_on_config', {
      BM_ID: BM_ID,
      BName: bName,
      Last_config_date: lastConfigDate,
      Latest_W_price_index: latestWPriceIndex,
      Latest_E_price_index: latestEPriceIndex
    }).then(() =>{
      alert("succesfull insert");
    });
  }

  const searchRentInfo = () => {
    Axios.post('http://localhost:3000/api/search_in_rent_info', {
      searchKey: searchKey
    }).then((res) =>{
      if(!res.data) {
        alert("No search key")
      }
      else setRentInfoList(res.data)
    });
  }

  const [rentInfoList, setRentInfoList] = useState([])
  const [handlerRent, sethandlerRent] = useState(()=>{
      var data = Axios.get("http://localhost:3000/rent_info")
      data.then((res)=>{
          setRentInfoList(res.data)
      })
  })

  return (
    <div className="App">
      {/* <header className="AppHeader">
      </header>
      <div className="Logo">
        <img src={logo} alt="logo ktx" />
        <h1>
          TRANG THÔNG TIN SINH VIÊN Ở KÝ TÚC XÁ ĐẠI HỌC QUỐC GIA
        </h1>
      </div> */}

      <Router>
        <main className="AppMain">
          <div className="Search">
            <div style={{textAlign:'center'}}>
              <Link to="/Hung"><button id="Button">GIÁ ĐIỆN NƯỚC CỦA CÁC TÒA NHÀ</button></Link>
              <Link to="/Hung/Config"><button id="Button">DANH SÁCH CẤU HÌNH GIÁ ĐIỆN NƯỚC</button></Link>
              <button id="Button" style={{width:"40%"}} onClick={handleShowInsert}>Insert</button>
              <Link to="/Hung/Room"><button id="Button">DANH SÁCH PHÒNG Ở</button></Link>
              {/* <Link to="/Rent"><button id="Button">DANH SÁCH MƯỢN PHÒNG</button></Link> */}
              <Link to="/Hung/RentInfo"><button id="Button">THÔNG TIN MƯỢN PHÒNG CỦA SINH VIÊN</button></Link>
              {/* <Link to="/StudentRentInfo"><button id="Button">THÔNG TIN SINH VIÊN ĐANG Ở KÍ TÚC XÁ</button></Link> */}
            </div>
            <div className="SearchBar" style={{marginTop:'1vmax'}}>
              {/* <input placeholder='Tìm kiếm' onChange={(e) => {
                setSearchKey(e.target.value)}}></input>
              <Button style={{marginLeft:"10px"}}onClick={searchRentInfo}>Search</Button> */}
              <Container>
                <Row>
                  <Col md={9} ><input placeholder='Tìm kiếm' onChange={(e) => {
                setSearchKey(e.target.value)}}></input></Col>
                  <Col md={3}><Button style={{marginLeft:"10px"}}onClick={searchRentInfo}>Search</Button></Col>
                </Row>
              </Container>
            </div>

            <div>
              <Modal show={showInsert} centered onHide={handleCloseInsert}>
                <Modal.Header closeButton style={{backgroundColor:"#2980b9"}}></Modal.Header>
                <Modal.Body>
                  <Container>
                    <Row>
                      <Col md={6}>
                        <label>BM_ID</label>
                      </Col>
                      <Col md={6}>
                        <input placeholder="..." style={{width:'60%'}} onChange={(e) => {
                          setBM_ID(e.target.value);}}></input>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <label>BName</label>
                      </Col>
                      <Col md={6}>
                        <input placeholder="..." style={{width:'60%'}} onChange={(e) => {
                          setBName(e.target.value)}}></input>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <label>Last config date</label>
                      </Col>
                      <Col md={6}>
                        <input placeholder="YYYY-MM-DD" style={{width:'60%'}} onChange={(e) => {
                          setLastConfigDate(e.target.value)}}></input>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <label>Latest W price index</label>
                      </Col>
                      <Col md={6}>
                        <input placeholder="..." style={{width:'60%'}} onChange={(e) => {
                          setLatestWPriceIndex(e.target.value)}}></input>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <label>Latest E price index</label>
                      </Col>
                      <Col md={6}>
                        <input placeholder="..." style={{width:'60%'}} onChange={(e) => {
                          setLatestEPriceIndex(e.target.value)}}></input>
                      </Col>
                    </Row>
                    
                  </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={insertConfig}>Insert</Button>
                </Modal.Footer>
              </Modal>

            </div>

          </div>

          <Switch>
            <Route  exact path="/Hung">
              <BuildingConfig />
            </Route>
            <Route  path="/Hung/Config">
              <Config />
            </Route>
            <Route path="/Hung/Room">
              <Room />
            </Route>
            {/* <Route path="/Rent">
              <Rent />
            </Route> */}
            <Route path="/Hung/RentInfo">
              <RentInfo rentInfoList = {rentInfoList} />
            </Route>
            {/* <Route path="/StudentRentInfo">
              <StudentRentInfo />
            </Route> */}
          </Switch>
        </main>

      </Router>
    </div>

    
  );
}

export default Hung;
