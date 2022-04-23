import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { isAutheticated, signout } from "../auth/helper";
import { loadCart } from "../user/helper/cartHelper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#000000" };
  } else {
    return { color: "#c4c4c4" };
  }
};

const Nav = ({ history }) => {
  return (
    <Navigation>
      <div className="nav">
        <ul className="nav-links">
          <li>
            <Link style={currentTab(history, "/")} className="nav-link" to="/">
              home
            </Link>
          </li>
          <li>
            <Link
              style={currentTab(history, "/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              dashboard
            </Link>
          </li>
          {isAutheticated() && isAutheticated().user.role === 1 && (
            <li>
              <Link
                style={currentTab(history, "/admin/dashboard")}
                className="nav-link"
                to="/admin/dashboard"
              >
                a.dashboard
              </Link>
            </li>
          )}
          {!isAutheticated() && (
            <Fragment>
              <li>
                <Link
                  style={currentTab(history, "/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  signin
                </Link>
              </li>{" "}
              <li>
                <Link
                  style={currentTab(history, "/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  signup
                </Link>
              </li>
            </Fragment>
          )}
          {isAutheticated() && (
            <li>
              <span
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Signout
              </span>
            </li>
          )}
        </ul>
        <div className="lgo">
          <h1 className="lgoitme"></h1>
        </div>
        <ul className="cart">
          <li>
            <Link
              style={currentTab(history, "/cart")}
              className="nav-link"
              to="/cart"
            >
              <h3>
                <i className="fas fa-shopping-cart"></i>
              </h3>
            </Link>
          </li>
        </ul>
      </div>
      {!isAutheticated()}
    </Navigation>
  );
};

const Navigation = styled.div`
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
  position: relative;

  .nav {
    width: 99%;
    margin: auto;
    display: flex;
    align-items: center;
    min-height: 10vh;
    padding: 0.5rem 0rem;
    justify-content: space-between;
    font-size: 1.5rem;
  }
  .lgo {
    width: 100%;
    position: absolute;
    align-items: center;
    display: flex;
    justify-content: center;
    z-index: -1;
  }
  .lgoitme {
    font-size: 2.5rem;
    font-family: caveat;
  }
  ul {
    list-style: none;
  }
  a {
    color: black;
    text-decoration: none;
  }
  li {
    padding: 0 1rem;
  }
  .nav-links {
    display: flex;
    align-items: center;
    flex: 1 1 20rem;
  }
  span {
    cursor: pointer;
  }

  .account {
    background-color: black;
    color: white;
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      margin-left: 0.5rem;
      font-size: 1.5rem;
    }
  }
`;

export default withRouter(Nav);
