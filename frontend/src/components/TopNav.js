import React, { useContext } from 'react';
//import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, NavbarText, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthState';
import './TopNav.css';
import logo from '../assets/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faUser,
    faMapMarkedAlt,
    faWrench,
} from '@fortawesome/free-solid-svg-icons';

import SideNav, {
    Toggle,
    Nav,
    NavItem,
    NavIcon,
    NavText,
} from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default function TopNav() {
    let history = useHistory();
    const { isAuthenticated, logoutUser, user } = useContext(AuthContext);

    return (
        <SideNav
            id='SideNav'
            onSelect={(selected) => {
                if (typeof selected !== 'undefined') {
                    if (selected === 'logout') {
                        logoutUser();
                        history.push('/login');
                    }
                    if (selected === 'profile') {
                        history.push('/profile');
                    }
                    if (selected === 'home') {
                        history.push('/');
                    }
                    if (selected === 'map') {
                        history.push('/mapeditor');
                    }
                    if (selected === 'maps/browse') {
                        history.push('/mapbrowser');
                    }
                    if (selected === 'maps/browselayers') {
                        history.push('/layerbrowser');
                    }
                    if (selected === 'maps/browsenodes') {
                        history.push('/nodebrowser');
                    }
                    if (selected === 'maps/createmap') {
                        history.push('/createmap');
                    }
                    if (selected === 'maps/createlayer') {
                        history.push('/createlayer');
                    }
                    if (selected === 'maps/createnode') {
                        history.push('/createnode');
                    }
                    if (selected === 'maps/mymaps') {
                        history.push('/mymaps');
                    }
                }
            }}
        >
            <SideNav.Toggle id='SideNavToggle' />
            <SideNav.Nav defaultSelected='home'>
                <NavItem id='NavItemLogo'>
                    <NavIcon>
                        <img className='logo' src={logo} />
                    </NavIcon>
                    <NavText id='NavTextLogo'>CISmap</NavText>
                </NavItem>

                {isAuthenticated ? (
                    <NavItem eventKey='profile_dropdown' id='NavItem'>
                        <NavIcon id='NavIcon'>
                            <FontAwesomeIcon
                                icon={faUser}
                                color='black'
                                style={{ color: 'black' }}
                            />
                        </NavIcon>
                        <NavText id='NavText'>{user.name}</NavText>
                        <NavItem eventKey='profile' id='NavItem'>
                            <NavText id='NavTextSub'>Profile</NavText>
                        </NavItem>
                        <NavItem eventKey='logout' id='NavItem'>
                            <NavText id='NavTextSub'>Logout</NavText>
                        </NavItem>
                    </NavItem>
                ) : (
                    ''
                )}

                <NavItem eventKey='home' id='NavItem'>
                    <NavIcon id='NavIcon'>
                        <FontAwesomeIcon
                            icon={faHome}
                            color='black'
                            style={{ color: 'black' }}
                        />
                    </NavIcon>
                    <NavText id='NavText'>Home</NavText>
                </NavItem>

                <NavItem eventKey='maps' id='NavItem'>
                    <NavIcon id='NavIcon'>
                        <FontAwesomeIcon
                            icon={faMapMarkedAlt}
                            color='black'
                            style={{ color: 'black' }}
                        />
                    </NavIcon>

                    <NavText id='NavText'>Maps</NavText>

                    <NavItem eventKey='maps/createmap' id='NavItem'>
                        <NavText id='NavTextSub'>Create New Map</NavText>
                    </NavItem>

                    <NavItem eventKey='maps/browse' id='NavItem'>
                        <NavText id='NavTextSub'>Browse Maps</NavText>
                    </NavItem>

                    <NavItem eventKey='maps/mymaps' id='NavItem'>
                        <NavText id='NavTextSub'>My Maps</NavText>
                    </NavItem>
                </NavItem>

                <NavItem eventKey='map' id='NavItem'>
                    <NavIcon id='NavIcon'>
                        <FontAwesomeIcon
                            icon={faWrench}
                            color='black'
                            style={{ color: 'black' }}
                        />
                    </NavIcon>
                    <NavText id='NavText'>Map Prototype</NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
}
