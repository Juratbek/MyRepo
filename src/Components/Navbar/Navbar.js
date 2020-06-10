import React from 'react';
import {Collapse, Nav, Navbar, NavItem, NavLink} from 'reactstrap';

const MyNavbar = (props) => {

    return (
        <div className="mb-5" >
            <Navbar color="light" light expand="md" >
                <Collapse  navbar className="px-2">
                    <h5>Covid 19 statistics</h5>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/">Summary</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/detailed">Detailed</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default MyNavbar;