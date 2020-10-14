import React, { Component } from 'react'
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import {CgShoppingCart} from 'react-icons/cg'
import {FaUserCircle} from 'react-icons/fa'
export class NavBar extends Component {
    render() {
        return (
            <div>

                <Navbar bg="dark" expand="lg" >
                    <Navbar.Brand href="/home" style={{color:'#fff'}}>Amazon Clone</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/home" style={{color:'#fff'}}>Home</Nav.Link>
                            <Nav.Link href="/upload/material" style={{color:'#fff'}}>Upload</Nav.Link>
                            <Nav.Link href="/logout" style={{color:'#fff'}}>Logout</Nav.Link>
                            
                        </Nav>
                        <Form inline>
                            
                            <CgShoppingCart  style={{height:'30px',width:'30px',color:'#fff'}}/><span className="badge badge-warning"></span>
                            <FaUserCircle style={{marginLeft:'17px', height:'30px',width:'30px',color:'#fff'}}/>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavBar
