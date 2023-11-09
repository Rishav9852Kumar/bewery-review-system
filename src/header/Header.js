import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { IoIosLogOut } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { PlayerContext } from "../context/playerContext";

const Header = () => {
  const userContext = useContext(UserContext);
  const playerContext = useContext(PlayerContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    userContext.setUser(null);
    playerContext.setPlayer(null);
    navigate("/");
  };

  return (
    <Navbar
      color="primary"
      light
      expand="md"
      className="container-fluid is-italic"
    >
      <NavbarBrand>
        <Link to="/" className="text-white">
          Language Learning Game
        </Link>
      </NavbarBrand>

      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {userContext.user ? (
            <>
              <NavbarText className="text-white">
                <VscAccount size={30} />{" "}
                {userContext.user?.email ? userContext.user.email : ""}
              </NavbarText>
              <NavItem className="float-end">
                <NavLink
                  data-toggle="tooltip"
                  data-placement="right"
                  title="To Log out"
                  onClick={handleSignOut}
                  className="text-white offset-lg-3 navbar-end"
                >
                  Sign Out <IoIosLogOut size={30} />
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/signup"
                  className="text-white ml-auto"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="To sign up as a new user"
                >
                  Sign Up
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/signin"
                  className="text-white ml-auto"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Login to an existing account"
                >
                  Sign In
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
