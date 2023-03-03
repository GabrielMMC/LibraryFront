import React from 'react'

const PrivateRoute = (props) => {
 const token = useSelector((state) => state.AppReducer.token);

 return token != null ? (
  <Home {...props}></Home>
 ) : (
  <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
 );
}

export default PrivateRoute