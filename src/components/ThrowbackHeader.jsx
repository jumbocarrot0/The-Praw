import React from 'react';
import { Link } from "react-router-dom";
import {
  Row, Col
} from 'reactstrap';

import ThrowbackBox from '../components/ThrowbackBox';

// the header
export default function Header(props) {

  return (
    <ThrowbackBox className={props.className}>
      <Row className="d-flex align-items-end">
        <Col md={8}>
          <Link to="/">
            <img src={require("../images/warplogo2.jpg")} alt="The Praw Logo"/>
          </Link>
        </Col>
        <Col md={4}>
          <p className='fs-5 text-end mb-0'>Display Any Alien</p>
        </Col>
      </Row>

    </ThrowbackBox>
  );
}
