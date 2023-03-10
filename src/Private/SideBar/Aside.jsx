import React from 'react';
import { ProSidebar, Menu, MenuItem, SidebarFooter, SidebarContent, SubMenu } from 'react-pro-sidebar';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';
import sidebarBg from './assets/bg1.jpg';
import { NavLink } from 'react-router-dom';
import { MdCopyright } from 'react-icons/md';
// import { useSelector, useDispatch } from 'react-redux';


const Aside = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  // let user = useSelector(store => store.AppReducer.user);


  return (
    <ProSidebar
      image={image ? sidebarBg : false}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      style={{ height: 'calc(100vh)', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
      onToggle={handleToggleSidebar}
    >
      <SidebarContent className='scrollMenu' style={{ background: '#222d32', overflowY: 'auto' }}>
        <Menu iconShape="circle">
          <SubMenu defaultOpen activeStyle={{ fontWeight: "bold" }} title="Usuário" icon={<FaUser size='20' />}>
            <MenuItem activeStyle={{ fontWeight: "bold" }}>
              <NavLink exact to="users/create" activeStyle={{ fontWeight: "bold" }}>
                Cadastro de Usuário
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
          <a
            href="http://www.verdaz.com.br"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <MdCopyright />
            <span> {'CopyRight 2022 MeetES'}</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar >
  );
};

export default Aside;
