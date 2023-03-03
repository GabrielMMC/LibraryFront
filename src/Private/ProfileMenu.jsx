
import React, { Component, useCallback, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';

// users
import { MdExitToApp } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { logout } from '../components/actions/AppActions';

const ProfileMenu = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(store => store.AppReducer.user);
    const [menu, setMenu] = useState(false);
    const toggle = useCallback(() => {
        console.log('toogle')
        setMenu(!menu)
    }, [menu]);

    const logout_ = useCallback(() => {
        console.log('logout')

        localStorage.removeItem('token'); localStorage.removeItem('user');

        dispatch(logout());
    }, []);

    return (
        <React.Fragment>
            <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block" >
                <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
                    <img className="rounded-circle header-profile-user" src='' onError={(e) => e.target.src = ''} height="50" width='50' style={{ objectFit: "cover" }} alt="Header Avatar" />
                </DropdownToggle>
                <DropdownMenu end>
                    <Link to={`/accounts/profile/${user["id"]}`}>
                        <DropdownItem style={{ cursor: 'pointer', alignItems: 'center', display: "flex" }}><CgProfile style={{ marginRight: 5 }} /> Meu perfil</DropdownItem>
                    </Link>
                    <DropdownItem tag="a" onClick={logout_} style={{ cursor: 'pointer', alignItems: 'center', display: "flex" }}><MdExitToApp style={{ marginRight: 5 }} /> Sair</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
}


export default ProfileMenu;


