import React from 'react';
import './css/Task.css'
import Task from './js/Task';
import Student from './js/Student';
import Hung from './js/Hung';
import logo from './img/logo.png' 
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Row ,Col} from 'react-bootstrap';
function App() {

    return (
      <Router>
         <div className="Header-app">
            <div className="nav-app"> 
            <Container>
              <Row>
                <Col><Link to="/Han">QUẢN LÝ NHÂN VIÊN</Link></Col>
                <Col><Link to= "/Nghia">QUẢN LÝ SINH VIÊN</Link></Col>
                <Col><Link to ="/Hung">QUẢN LÝ TÒA NHÀ</Link></Col>
              </Row>
            </Container>
            </div>
            <div className="content-header-app">
                <img src={logo} alt="hệ thống quản lý ktx"></img>
                TRANG THÔNG TIN NHÂN VIÊN QUẢN LÝ KÝ TÚC XÁ
            </div>
          </div>
        <Switch>
        <Route  path="/Han">
            <Task/>
        </Route>
        <Route  path="/Nghia">
            <Student/>
        </Route>
        <Route  path="/Hung">
            <Hung/>
        </Route>
        </Switch>
      </Router>
    )
}
export default App;