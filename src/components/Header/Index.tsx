import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import './style.css'
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className="w100">
            <div className="container">
                <Navbar bg="dark" expand="lg">
                    <Navbar.Brand><span className="custom-link"><Link to="/" className="custom-link">Dany Makeup</Link></span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="custom-nav">
                            <Nav.Link as={NavLink} to="/fabricantes" className="custom-link">Fabricantes</Nav.Link>
                            <Nav.Link as={NavLink} to="/categorias" className="custom-link">Categorias</Nav.Link>
                            <Nav.Link as={NavLink} to="/produtos" className="custom-link">Produtos</Nav.Link>
                            <Nav.Link as={NavLink} to="/promocoes" className="custom-link">Promoções</Nav.Link>
                            <Nav.Link as={NavLink} to="/banner" className="custom-link">Banner</Nav.Link>
                            <Nav.Link as={NavLink} to="/clientes" className="custom-link">Clientes</Nav.Link>
                            <Nav.Link as={NavLink} to="/pedidos" className="custom-link">Pedidos</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    )
}

export default Header;