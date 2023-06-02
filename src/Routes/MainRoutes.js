import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Dashboard from ".././Private/Home";
// import LoginRoute from "./LoginRoute";
import Login from "../components/Login/Login";
import Register from "../components/Login/Register";
import CreateUser from "../Private/User/CreateUser";
import ListBooks from "../Private/Book/ListBooks";
import CreateBook from "../Private/Book/CreateBook";
import EditBook from "../Private/Book/EditBook";

const MainRoutes = () => {
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  let cartItems = localStorage.getItem("cart_items");

  const userRedux = useSelector(state => state.AppReducer.user)

  user = JSON.parse(user);
  if (user == null || user === undefined) {
    user = {}
  }

  // console.log('user', userRedux)
  if (userRedux?.id !== user?.id) {
    dispatch({ type: "login", payload: { token: token, user: user } });
    dispatch({ type: "cart_items", payload: cartItems ? JSON.parse(cartItems) : '' });
  }

  return (
    <Routes>
      <Route path={"/*"} element={<Home />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"users/create"} element={<CreateUser />} />
      {user.email === 'admin@admin.com' &&
        <Route path={"/admin/"} element={<Dashboard />}>
          <Route path={"users/create"} element={<CreateUser />} />
          <Route path={"books"} element={<ListBooks />} />
          <Route path={"books/create"} element={<CreateBook />} />
          <Route path={"books/edit/:id"} element={<EditBook />} />
        </Route>}
    </Routes>
  );
};

export default MainRoutes;
