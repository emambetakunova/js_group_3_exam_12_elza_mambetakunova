import React, {Fragment} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink, UncontrolledDropdown} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";
import {apiURL} from "../../../constants";


const style={
    width: "50px",
    height: '50px',
    borderRadius: '50%'
};

const UserMenu = ({user, logout}) => (
    <Fragment>
        <NavItem>
            <NavLink tag={RouterNavLink} to="/gallery/new" exact>Add new picture</NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                {user.facebookId ?
                    <img src={user.avatarImage} alt="avatar" style={style}/>
                    : <img src={apiURL + '/uploads/' + user.avatarImage} alt="avatar"   style={style}/>
                }
                Hello, {user.displayName}
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                    Show profile
                </DropdownItem>
                <DropdownItem divider/>
                <DropdownItem onClick={logout}>
                    Log out
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    </Fragment>
);

export default UserMenu;