import React, { useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import './style.css'
import { Link, NavLink } from 'react-router-dom';

const Header = ({ current }) => {

    const isSignIn = localStorage.getItem('IS_AUTHENTICATED') || '';

    useEffect(() => {
        if (isSignIn !== 'true') {
            redirect();
        }
    }, [isSignIn])
    
    function redirect() {
        window.location.href = "/";
    }

    function handleLogout() {
        localStorage.clear();
        redirect();
    }

    return (
        isSignIn !== 'true' ? <></> : 
        <div className="w100">
            <div className="container">
                <Navbar bg="dark" expand="lg">
                    <Navbar.Brand><span className="custom-link"><Link to="/" className="custom-link">Dany Makeup</Link></span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="custom-nav">
                        <Nav.Link as={NavLink} to="/lojas" className={`custom-link ${current === 'lojas' && "link-active" }` }>Lojas</Nav.Link>
                            <Nav.Link as={NavLink} to="/fabricantes" className={`custom-link ${current === 'fabricantes' && "link-active" }` }>Fabricantes</Nav.Link>
                            <Nav.Link as={NavLink} to="/categorias" className={`custom-link ${current === 'categorias' && "link-active" }` }>Categorias</Nav.Link>
                            <Nav.Link as={NavLink} to="/produtos" className={`custom-link ${current === 'produtos' && "link-active" }` }>Produtos</Nav.Link>
                            <Nav.Link as={NavLink} to="/promocoes" className={`custom-link ${current === 'promocoes' && "link-active" }` }>Promoções</Nav.Link>
                            <Nav.Link as={NavLink} to="/banners" className={`custom-link ${current === 'banners' && "link-active" }` }>Banner</Nav.Link>
                            <Nav.Link as={NavLink} to="/clientes" className={`custom-link ${current === 'clientes' && "link-active" }` }>Clientes</Nav.Link>
                            <Nav.Link as={NavLink} to="/pedidos" className={`custom-link ${current === 'pedidos' && "link-active" }` }>Pedidos</Nav.Link>
                            <a href="#" className="custom-link nav-link" onClick={handleLogout}>Sair</a>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    )
}

export default Header;