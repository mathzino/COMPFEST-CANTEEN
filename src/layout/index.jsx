import { DollarOutlined, AlertOutlined } from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import React, { useEffect, useState } from "react";
import "./index.css";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, logout, signin } from "../store/user";
const { Header, Content, Footer, Sider } = Layout;

const Layouts = (props) => {
  let sections;
  let dispatch = useDispatch();
  let { loginStatus } = useSelector(userSelector);
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("id");
    Cookies.remove("token");
    dispatch(logout());
    navigate("/");
  };
  const handleSignin = () => {
    navigate("/signin");
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  if (loginStatus) {
    sections = [
      { icon: AlertOutlined, label: "list food", link: "/" },
      { icon: AlertOutlined, label: "add food", link: "/addfood" },
      { icon: DollarOutlined, label: "balance", link: "/balance" },
    ];
  } else {
    sections = [{ icon: AlertOutlined, label: "list food", link: "/" }];
  }
  //responsive sidebar
  let [position1, setPosition1] = useState("");
  let [broken, setBroken] = useState("");
  useEffect(() => {
    Cookies.get("token") ? dispatch(signin()) : dispatch(logout());
  }, [dispatch]);
  useEffect(() => {
    setPosition1(broken ? { position: "absolute", height: "100vh", zIndex: "10" } : null);
  }, [broken]);
  //
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          setBroken(broken);
        }}
        style={position1}
      >
        <div className="logo" />
        <Menu
          onSelect={({ key }) => {
            navigate(sections[key - 1].link);
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={sections.map((s, index) => ({
            key: String(index + 1),
            icon: React.createElement(s.icon),
            label: ` ${s.label}`,
          }))}
        />
      </Sider>
      <Layout>
        <Header
          theme="light"
          className="site-layout-sub-header-background"
          style={{
            padding: "0 20px",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "400px", fontSize: "0.8em" }}>COMPFEST CANTEEN</div>
            {loginStatus ? (
              <Button onClick={handleLogout} style={{ position: "absolute", right: "20px" }}>
                Log out
              </Button>
            ) : (
              <div style={{ position: "absolute", right: "10px" }}>
                <Button onClick={handleSignin} style={{ width: "10vw", minWidth: "80px" }}>
                  Signin
                </Button>
                <Button onClick={handleSignup} style={{ margin: "0 10px", width: "10vw", fontSize: "0.6em", minWidth: "80px" }}>
                  Signup
                </Button>
              </div>
            )}
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {props.content}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Mathzino
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Layouts;
