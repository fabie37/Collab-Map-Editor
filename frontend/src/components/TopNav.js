import React, { useState, useContext } from 'react';
//import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, NavbarText, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../user-context'
import './TopNav.css'
import logo from '../assets/logo.jpg'
import api from '../services/api'

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default function TopNav() {
    let history = useHistory()
    const { isLoggedIn, setIsloggedIn } = useContext(UserContext);
    const userName = localStorage.getItem('userName')
    


    return (
        <SideNav id="SideNav" onSelect={(selected) => {
            if(typeof(selected) !== "undefined"){
                if(selected === "logout"){
                    localStorage.removeItem('user')
                    localStorage.removeItem('user_id')
                    localStorage.removeItem('profilePic')
                    localStorage.removeItem('userName')
                    setIsloggedIn(false)
                    history.push("/login")
                }
                if(selected === "profile"){
                    history.push("/profile") 
                }
                if(selected === "home"){
                    history.push("/") 
                }
                if(selected === "map"){
                    history.push("/mapeditor") 
                }
                if(selected === "maps/browse"){
                    history.push("/mapbrowser")
                }
                if(selected === "maps/browselayers"){
                    history.push("/layerbrowser")
                }
                if(selected === "maps/browsenodes"){
                    history.push("/nodebrowser")
                }
                if(selected === "maps/createmap"){
                    history.push("/createmap")
                }
                if(selected === "maps/createlayer"){
                    history.push("/createlayer")
                }
                if(selected === "maps/createnode"){
                    history.push("/createnode")
                }
                
            }
        }}>
        <SideNav.Toggle id="SideNavToggle" />
            <SideNav.Nav defaultSelected="home">

                <NavItem id="NavItemLogo">
                    <NavIcon>
                        <img className="logo" src={logo}/>
                    </NavIcon>
                    <NavText id="NavTextLogo">
                        CISmap
                    </NavText>
                </NavItem>
                
                { isLoggedIn ? (
                <NavItem eventKey="profile_dropdown" id="NavItem">
                       <NavIcon>
                         <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                     <NavText id="NavText">
                          {localStorage.userName}
                      </NavText>
                      <NavItem eventKey="profile" id="NavItem">
                         <NavText id="NavTextSub">
                             Profile
                        </NavText>
                    </NavItem>
                     <NavItem eventKey="logout" id="NavItem">
                         <NavText id="NavTextSub">
                              Logout
                          </NavText>
                    </NavItem>
                </NavItem>
                ) : ""
                }

                <NavItem eventKey="home" id="NavItem">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText id="NavText">
                        Home
                    </NavText>
                </NavItem>

                <NavItem eventKey="maps" id="NavItem">

                    <NavIcon>
                        <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                    </NavIcon>

                    <NavText id="NavText">
                        Maps
                    </NavText>

                    <NavItem eventKey="maps/createmap" id="NavItem">
                        <NavText id="NavTextSub">
                            Create New Map
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="maps/createlayer" id="NavItem">
                        <NavText id="NavTextSub">
                            Create Layer (dev)
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="maps/createnode" id="NavItem">
                        <NavText id="NavTextSub">
                            Create Node (dev)
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="maps/browse" id="NavItem">
                        <NavText id="NavTextSub">
                            Browse Maps
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="maps/browselayers" id="NavItem">
                        <NavText id="NavTextSub">
                            Browse Layers (dev)
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="maps/browsenodes" id="NavItem">
                        <NavText id="NavTextSub">
                            Browse Nodes (dev)
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="maps/mymaps" id="NavItem">
                        <NavText id="NavTextSub">
                            My Maps
                        </NavText>
                    </NavItem>

                </NavItem>

                <NavItem eventKey="map" id="NavItem">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText id="NavText">
                        Map Prototype
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    )
}