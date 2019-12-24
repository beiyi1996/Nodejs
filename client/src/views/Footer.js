import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
    left: 0
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
  }
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} />
      <BottomNavigationAction label="Order" icon={<RestaurantRoundedIcon />} className={classes.order} />
      <BottomNavigationAction label="Account" icon={<AccountCircleRoundedIcon />} />
    </BottomNavigation>
  );
}
