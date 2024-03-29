import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Aside from './SideBar/Aside';
import { useParams, useLocation, Outlet } from "react-router-dom";
import Header from './Header';
import './SideBar/styles/index.css';
import './SideBar/styles/App.scss';
import './SideBar/styles/bootstrap.css';
import { mudarDados } from '../components/actions/AppActions';

const Home = (props) => {
    const toggled = useSelector(store => store.AppReducer.toggled)
    const collapsed = useSelector(store => store.AppReducer.collapsed)

    const dispatch = useDispatch();
    const [image, setImage] = useState(true);
    const handleCollapsedChange = (checked) => {
        dispatch(mudarDados({ collapsed: checked }));

    };

    const handleToggleSidebar = (value) => {
        // setToggled(value);
        dispatch(mudarDados({ toggled: value }));
    };

    useEffect(() => {
        const event = (e) => {
            if (window.innerWidth <= 768) {
                dispatch(mudarDados({ toggled: false, collapsed: false }));

            }
            else {

                dispatch(mudarDados({ toggled: true, collapsed: true }));

            }
        };
        return () => {
            window.removeEventListener('resize', event);
        }
    }, [])
    const location = useLocation()
    const marginLeft = (toggled === false || window.innerWidth <= 768) ? 0 : (collapsed === false ? 270 : 80);
    console.log('toggle', toggled, collapsed);
    return (
        <div className='d-flex app'>
            <Aside
                image={image}
                collapsed={collapsed}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                handleCollapsedChange={handleCollapsedChange}

            />
            <div className="container-fluid d-flex justify-content-center bg-white">
                <div className="container-fluid anime-left" >
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Home;