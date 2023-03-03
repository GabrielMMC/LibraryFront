import React from 'react'
import Login from '../components/Login/Login';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const LoginRoute = (props) => {
 const token = useSelector((state) => state.AppReducer.token);

 return token == null ? (
  <Login {...props} />
 ) : (
  <Navigate to={{ pathname: "/home", state: { from: props.location } }} />
 );
}

export default LoginRoute