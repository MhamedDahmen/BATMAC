import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import "../styles/navbarAdmin.scss" ; 
import cover from './FrontOffice/images/cover.png';

function NavbarAdmin() {
    return (

        <>
     

            <Navbar  expand="lg"  className="navBarAdmin" >

                <Navbar.Brand href="#" style={{fontSize:30,left:30,position:'relative'}}> <img src={cover} height="60" width="60" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navBarAdmin" >


                    </Nav>
                </Navbar.Collapse>

            </Navbar>
            
        </>
    )
}

export default NavbarAdmin; 