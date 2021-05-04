import React from 'react'
import {Col,Row,Container} from 'react-bootstrap'
import { MDBIcon, MDBContainer } from 'mdbreact'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        <Col className="socialm">
                            <MDBContainer>
                                <a href="#!" className="tw-ic mr-3">
                                    <MDBIcon fab icon="twitter" />
                                </a>
                                <a href="#!" className="fb-ic mr-3">
                                    <MDBIcon fab icon="facebook-f" />
                                </a>
                                <a href="#!" className="git-ic mr-3">
                                    <MDBIcon fab icon="instagram" />
                                </a>
                            </MDBContainer>
                        </Col>
                        Copyright &copy; Ktoubtna
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
