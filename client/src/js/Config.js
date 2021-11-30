import React from 'react'
import { useState } from 'react'
import { Row, Col, Container} from 'react-bootstrap';
import Axios from 'axios';
import Moment from 'moment';
import '../css/Hung.css';

export default function Config() {

    const [configList, setConfigList] = useState([])
    const [handler, sethandler] = useState(()=>{
        var data = Axios.get("http://localhost:3002/config")
        data.then((res)=>{
            setConfigList(res.data)
        })
    })

    return (
        <div className="Information">
          <Container>
            <Row>
              <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>BM_ID</Col>
              <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>BName</Col>
              <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>Last config date</Col>
              <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>Latest W price index</Col>
              <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>Latest E price index</Col>
            </Row>
            
            {configList.map(config => (
              <Row>
                <Col>{config.BM_ID}</Col>
                <Col>{config.BName}</Col>
                <Col>{Moment(config.Last_config_date).format("YYYY-MM-DD")}</Col>
                <Col>{config.Latest_W_price_index}</Col>
                <Col>{config.Latest_E_price_index}</Col>
              </Row>
            ))}
          </Container>
        </div>
    )
}
