import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import AccountPicture from "../assets/account.png";
import LogoutIcon from "../assets/logout.png";
import { useLogout } from "../hooks/useLogout.js"
import { useAuthContext } from "../hooks/useAuthContext.js";
import "../styles/navbar.css"

export default function NavbarComp() {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleLogout = () => {
        logout()
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
                            <strong>{user && user.username}</strong>
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