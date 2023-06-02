import React from 'react';
import { ProSidebar, Menu, MenuItem, SidebarFooter, SidebarContent, SubMenu } from 'react-pro-sidebar';
import { FaUser, FaBook } from 'react-icons/fa';
import sidebarBg from './assets/bg1.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from 'react-icons/md';
import { IconButton } from '@mui/material';
import { logout } from '../../components/actions/AppActions';
import { useDispatch } from 'react-redux';


const Aside = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  const dispatch = useDispatch()
  const history = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    history('/login')
  }

  return (
    <ProSidebar
      image={image ? sidebarBg : false}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      // style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
      onToggle={handleToggleSidebar}
    >
      <SidebarContent className='scrollMenu' style={{ background: '#222d32', overflowY: 'auto' }}>
        <div className="d-flex">
          <div className="ms-auto">
            <IconButton onClick={handleLogout}><MdOutlineLogout color="#adadad" /></IconButton>
          </div>
        </div>
        <Menu iconShape="circle">
          <SubMenu defaultOpen activeStyle={{ fontWeight: "bold" }} title="Usuário" icon={<FaUser size='20' />}>
            <MenuItem activeStyle={{ fontWeight: "bold" }}>
              <NavLink exact to="users/create" activeStyle={{ fontWeight: "bold" }}>
                Cadastro de Usuário
              </NavLink>
            </MenuItem>
          </SubMenu>

          <SubMenu defaultOpen activeStyle={{ fontWeight: "bold" }} title="Livros" icon={<FaBook size='20' />}>
            <MenuItem activeStyle={{ fontWeight: "bold" }}>
              <NavLink exact to="books" activeStyle={{ fontWeight: "bold" }}>
                Lista de Livros
              </NavLink>
            </MenuItem>

            <MenuItem activeStyle={{ fontWeight: "bold" }}>
              <NavLink exact to="books/create" activeStyle={{ fontWeight: "bold" }}>
                Cadastro de Livro
              </NavLink>
            </MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center', background: '#222d32' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <span> {'Trabalho do Boer - Rafaela - ©2023'}</span>
        </div>
      </SidebarFooter>
    </ProSidebar >
  );
};

export default Aside;
