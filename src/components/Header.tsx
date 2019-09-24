import {
  Button,
  ClickAwayListener,
  Fade,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import Logo from "./Logo";

import UserDefaultImage from "../assets/images/author/user-image.jpg";
import cookie from "js-cookie";
import logo from "../assets/images/logo.svg";
import { NavLink, Redirect } from "react-router-dom";
import FontAwesome from "../utils/FontAwesome";
import Image from "./Image";
import { PopperPlacementType } from "@material-ui/core/Popper";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>("top");
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);

  const handleClickAway = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClick = useCallback(
    newPlacement => {
      return (event: MouseEvent) => {
        const { currentTarget } = event;
        setAnchorEl(currentTarget);
        setOpen(placement !== newPlacement || !open);
        setPlacement(newPlacement);
      };
    },
    [open, placement]
  );

  const Auth = cookie.get("Auth");
  if (!Auth) {
    return <Redirect to="/login" />;
  }

  return (
    <Grid className="mainHeadeArea">
      <Grid container alignItems="center" className="container">
        <Grid item xs={12} sm={4} md={2}>
          <Logo logo={logo} alt="CryptWallet" link="/dashboard" />
        </Grid>
        <Hidden smDown>
          <Grid item md={8}>
            <List className="mainMenu">
              <ListItem className="menuItem">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </ListItem>
              <ListItem className="menuItem">
                <NavLink to="/buy-coin">Buy Coin</NavLink>
              </ListItem>
              <ListItem className="menuItem">
                <NavLink to="/my-wallet">My Wallet</NavLink>
              </ListItem>
              <ListItem className="menuItem">
                <NavLink to="/my-profile">My Profile</NavLink>
              </ListItem>
              <ListItem className="menuItem">
                <NavLink to="/settings">Settings</NavLink>
              </ListItem>
              <ListItem className="menuItem">
                <NavLink to="/referral">Referral</NavLink>
              </ListItem>
              <ListItem className="menuItem">
                <NavLink to="/landingpage">landingpage</NavLink>
              </ListItem>
            </List>
          </Grid>
        </Hidden>

        <Grid item xs={12} sm={8} md={2} className="profileMenu">
          <ClickAwayListener onClickAway={handleClickAway}>
            <Grid>
              <Button disableRipple className="profileBtn" onClick={handleClick("bottom-end")}>
                <Typography className="userImage" component="div">
                  <Image src={UserDefaultImage} />
                </Typography>
                <Typography className="userName" component="span">
                  John Doe
                </Typography>
                <FontAwesome name={!open ? "caret-down" : "caret-up"} />
              </Button>

              <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <List className="profileMenuList">
                        <ListItem>
                          <NavLink to="/my-profile">My Profile</NavLink>
                        </ListItem>
                        {Auth ? (
                          <ListItem>
                            <Button onClick={logOutHandler} disableRipple>
                              Sign Out
                            </Button>
                          </ListItem>
                        ) : (
                          <ListItem>
                            <NavLink to="/login">Login</NavLink>
                          </ListItem>
                        )}
                      </List>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </Grid>
          </ClickAwayListener>
          <Hidden mdUp>
            <IconButton className="hamBurger" color="primary" aria-label="Menu" onClick={this.sMenuHandler}>
              <FontAwesome name={sideMenu ? "times" : "bars"} />
            </IconButton>
          </Hidden>
        </Grid>
      </Grid>
      <Hidden mdUp>
        <Grid className={`sidebarMenu ${sideMenu ? "showSidebar" : ""}`}>
          <Typography onClick={this.sMenuHandleClose} component="div" className="backDrop" />
          <MenuList>
            <MenuItem>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/buy-coin">Buy Coin</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/my-wallet">My Wallet</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/my-profile">My Profile</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/settings">Settings</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/referral">Referral</NavLink>
            </MenuItem>
          </MenuList>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default Header;
