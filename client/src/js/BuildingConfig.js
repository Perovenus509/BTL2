import React from 'react'
import { useState } from 'react'
import { Row, Col, Container} from 'react-bootstrap';
import Axios from 'axios';
import Moment from 'moment';
import '../css/Hung.css';

export default function BuildingConfig() {
    const [buildingConfigList, setBuildingConfigList] = useState([])
    const [handler, sethandler] = useState(()=>{
        var data = Axios.get("http://localhost:3002/building_config")
        data.then((res)=>{
            setBuildingConfigList(res.data)
        })
    })

    return (
      <div className="Information">
        <Container>
          <Row>
            <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>Name</Col>
            <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>W price index</Col>
            <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>E price index</Col>
            <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>Config date</Col>
            <Col style={{backgroundColor:"#bdc3c7", fontWeight:"700"}}>BM_ID</Col>
          </Row>
          
          {buildingConfigList.map(buildingConfig => (
            <>
              <Row>
                <Col>{buildingConfig.BName}</Col>
                <Col>{buildingConfig.W_price_index}</Col>
                <Col>{buildingConfig.E_price_index}</Col>
                <Col>{Moment(buildingConfig.Last_config_date).format("YYYY-MM-DD")}</Col>
                <Col>{buildingConfig.BM_ID}</Col>
              </Row>
            </>
          ))}
        </Container>
      </div>
    )
}
