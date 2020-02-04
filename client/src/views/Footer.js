import React, { useState } from "react";
import { makeStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import clsx from "clsx";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import RestaurantRoundedIcon from "@material-ui/icons/RestaurantRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    "& > a > span": {
      color: "#9BD0D0"
    },
    "& > a.selected": {
      color: "red"
    }
  },
  order: {
    "& > span > span:last-child": {
      position: "relative"
    },
    "& > span > span:last-child::after": {
      content: "'99'",
      position: "absolute",
      top: "-30px",
      borderRadius: 30,
      backgroundColor: "#E07A5F",
      color: "#fff",
      padding: 3
    }
  },
  selected: {
    "& > span": {
      color: "#638585 !important"
    }
  }
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const user = sessionStorage.getItem("user") !== null ? JSON.parse(sessionStorage.getItem("user")) : {};

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={Link}
        to="/"
        label="Home"
        icon={<HomeRoundedIcon />}
        className={clsx({ [classes.selected]: value === 0 })}
      />
      <BottomNavigationAction
        component={Link}
        to={`/orders?name=${user.member}`}
        label="Order"
        icon={<RestaurantRoundedIcon />}
        className={classes.order}
      />
      <BottomNavigationAction component={Link} to="/member" label="Account" icon={<AccountCircleRoundedIcon />} />
    </BottomNavigation>
  );
}
