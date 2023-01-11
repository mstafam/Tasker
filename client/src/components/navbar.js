import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import AccountPicture from "../assets/account.png";
import LogoutIcon from "../assets/logout.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTasksContext } from "../hooks/useTasksContext"
import "../styles/navbar.css";

export default function NavbarComp() {
    const { user, dispatch } = useAuthContext()
    const { dispatch: tasksDispatch } = useTasksContext()
    const handleLogout = () => {
        localStorage.removeItem('user')
        tasksDispatch({type: "GET_TASKS", payload: null})
        dispatch({type: 'LOGOUT'})
    }
    
    return(
        <>
            <Navbar expand="md" bg="black" variant="dark" id="nav">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <span className="brand_title">Tasker</span>
                    </Navbar.Brand>
                    <NavDropdown align="end" title={
                        <Image className="custom_account" src={AccountPicture} width="40"></Image>
                    }>
                        <NavDropdown.Item disabled>
                            <strong className="Username">{user && user.username}</strong>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout}>
                        <Image src={LogoutIcon} width="20"></Image>{' '}
                        <strong>Log Out</strong>
                        </NavDropdown.Item>
                        </NavDropdown>
                </Container>
            </Navbar>
        </>
    )
};