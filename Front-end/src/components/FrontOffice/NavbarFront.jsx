import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import cover from './images/cover.png'

function NavbarFront() {
    return (
       
        <Navbar  expand="lg"  className="navBarAdmin" >

        <Navbar.Brand href="#" style={{fontSize:10,left:20,position:'relative'}}> <img src={cover} height="60" width="190" /> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navBarAdmin" style={{fontSize:15,left:750,position:'relative'}} >
                
            
            <Nav.Link href="/">INSCRIPTION</Nav.Link>
            <Nav.Link href="/AdminLogin">CONNECTER</Nav.Link>

            </Nav>
        </Navbar.Collapse>

        </Navbar>
    )
}

export default NavbarFront