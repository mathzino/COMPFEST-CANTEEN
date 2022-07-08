import "./App.css";

import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom";
import FoodTable from "./component/table";
import Layouts from "./layout";
import SigninForm from "./component/signin/index";
import SignupForm from "./component/signup/index";
import FoodForm from "./component/foodForm";
import Balance from "./component/balance";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import Cookies from "js-cookie";
import { selectBalance } from "./store/balance";
import { logout, signin, userSelector } from "./store/user";
function App() {
  let dispatch = useDispatch();
  let { loginStatus } = useSelector(userSelector);
  let { balance } = useSelector(selectBalance);
  useEffect(() => {
    Cookies.get("token") ? dispatch(signin()) : dispatch(logout());
  }, [loginStatus, dispatch]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Layouts content={<FoodTable />} />}></Route>
          <Route path="/signin" exact element={<Layouts content={<SigninForm />} />}></Route>
          <Route path="/signup" exact element={<Layouts content={<SignupForm />} />}></Route>
          {!loginStatus ? (
            <>
              <Route path="/addfood" exact element={<Navigate replace to="/" />}></Route>
              <Route path="/balance" exact element={<Navigate replace to="/" />}></Route>
            </>
          ) : (
            <>
              <Route path="/addfood" exact element={<Layouts content={<FoodForm />} />}></Route>
              <Route path="/balance" exact element={<Layouts content={<Balance balance={balance} />} />}></Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
