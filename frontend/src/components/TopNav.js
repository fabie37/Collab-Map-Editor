import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, NavbarText, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../user-context'
import './TopNav.css'
import logo from '../assets/logo.jpg'

const TopNav = () => {
    const { isLoggedIn, setIsloggedIn } = useContext(UserContext);
    const userName = localStorage.getItem('userName')
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    const logoutHandler = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('user_id')
        setIsloggedIn(false)
    }
    console.log(window.location.origin)
    return isLoggedIn ? 
        <div>
{/*             <Navbar color="faded" light>
                <Nav navbar>
                    <NavItem>
                        <Link to="/user">Profile</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/events">Events</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/">Dashboard</Link>
                    </NavItem>
                </Nav>
                <Link to="/login" onClick={logoutHandler}>Logout</Link>
            </Navbar> */}
            

            <Navbar color="light" light expand="md">
                <img className="logo" src={logo}/>
                <NavbarBrand href="/"> CISmap (Working title) </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar className="container-fluid">
                        <UncontrolledDropdown nav inNavbar className="ml-auto">
                            <DropdownToggle nav caret>
                                {userName}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <NavLink href="/profile">Profile</NavLink>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <NavLink href="/login" onClick={logoutHandler}>Logout</NavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    : ""
}

export default TopNav;