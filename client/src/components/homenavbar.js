import React from "react"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import "../styles/home.css"

export default function NavbarComp(props) {
    if(!props.isLoggedIn) {
        return(
            <>
                <Navbar collapseOnSelect bg="black" variant="dark" id="nav">
                    <Container fluid>
                            <Navbar.Brand href="#">
                                <span className="brand_title">Tasker</span>
                            </Navbar.Brand>
                        <Nav className="ml-auto">
                            <Nav.Item>
                            <Button variant="light" href="/login" className="me-3 custom_button" ><strong>Log In</strong></Button>{' '}
                            </Nav.Item>
                            <Nav.Item>
                            <Button variant="light" href="/signup" className="me-3 custom_button"><strong>Sign Up</strong></Button>
                            </Nav.Item>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        )
    } else {
        return(
            <>
                <Navbar collapseOnSelect expand="lg" bg="black" variant="dark" id="nav">
                    <Container fluid>
                        <Navbar.Brand href="#" className="ml-auto"> 
                            <span className="brand_title">Tasker</span>
                        </Navbar.Brand>
                        <Nav className="pull-right">
                            <Button variant="light" href="/tasks" className="me-3 custom_button"><strong>Tasks</strong></Button>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        )
    }
};