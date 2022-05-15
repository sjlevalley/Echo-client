import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Import MUI components
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { Home as HomeIcon } from "@mui/icons-material";
// Components
import MyButton from "../../util/MyButton";
import Notifications from "./Notifications";
import PostBroadcast from "../broadcast/PostBroadcast";

function Navbar() {
  const authenticated = useSelector((state) => state.user.authenticated);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          {authenticated ? (
            <>
              <PostBroadcast />
              <Link to={"/"}>
                <MyButton tip="Home">
                  <HomeIcon color="primary" />
                </MyButton>
              </Link>
              <MyButton tip="Notifications">
                <Notifications />
              </MyButton>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
