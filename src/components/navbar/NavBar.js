import React, { Component } from 'react'
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'

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
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown" style={{color:'#fff'}}>
                                <NavDropdown.Item href="#action/3.1" style={{color:'#fff'}}>Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2" style={{color:'#fff'}}>Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3" style={{color:'#fff'}}>Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4" style={{color:'#fff'}}>Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavBar
