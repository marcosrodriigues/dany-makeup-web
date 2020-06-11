import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import './style.css'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="w100">
            <div className="container">
                <Navbar bg="dark" expand="lg">
                    <Navbar.Brand><span className="custom-link"><Link to="/" className="custom-link">Dany Makeup</Link></span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="custom-nav">
                            <Nav.Link><Link to="/produtos" className="custom-link">Produtos</Link></Nav.Link>
                            <Nav.Link><Link to="/categorias" className="custom-link">Categorias</Link></Nav.Link>
                            <Nav.Link><Link to="/promocoes" className="custom-link">Promoções</Link></Nav.Link>
                            <Nav.Link><Link to="/banner" className="custom-link">Banner</Link></Nav.Link>
                            <Nav.Link><Link to="/clientes" className="custom-link">Clientes</Link></Nav.Link>
                            <Nav.Link><Link to="/pedidos" className="custom-link">Pedidos</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    )
}

export default Header;