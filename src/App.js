import "./App.css";
import { useContext } from "react";
import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom";
import FoodTable from "./component/table";
import Layouts from "./layout";
import SigninForm from "./component/signin/index";
import SignupForm from "./component/signup/index";
import FoodForm from "./component/foodForm";
import { UserContext } from "./context/userContext";
import Balance from "./component/balance";
import { useEffect } from "react";
import Cookies from "js-cookie";
function App() {
  let { loginStatus, setLoginStatus } = useContext(UserContext);
  useEffect(() => {
    Cookies.get("token") ? setLoginStatus(true) : setLoginStatus(false);
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Layouts content={<FoodTable />} />}></Route>
          <Route path="/signin" exact element={<Layouts content={<SigninForm />} />}></Route>
          <Route path="/signup" exact element={<Layouts content={<SignupForm />} />}></Route>
          {loginStatus ? (
            <>
              <Route path="/addfood" exact element={<Layouts content={<FoodForm />} />}></Route>
              <Route path="/balance" exact element={<Layouts content={<Balance />} />}></Route>
            </>
          ) : (
            <>
              <Route path="/addfood" exact element={<Navigate replace to="/" />}></Route>
              <Route path="/balance" exact element={<Navigate replace to="/" />}></Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
