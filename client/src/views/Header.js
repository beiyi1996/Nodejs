import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import productService from "../services/productService";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const drawerWidth = 180;

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      margin: "0",
      padding: "0"
    },
    "*::-webkit-scrollbar": {
      width: "0em",
      height: "8px"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(155, 208, 208, .5)",
      outline: "1px solid slategrey",
      borderRadius: "15px"
    }
  },
  Container: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
    fontFamily: "Microsoft JhengHei"
  },
  card: {
    position: "relative"
  },
  cardContent: {
    padding: 0
  },
  item: {
    padding: "10px",
    overflow: "hidden"
  },
  title: {
    fontSize: 18,
    flexGrow: 1
  },
  pos: {
    marginBottom: 12,
    textAlign: "right",
    position: "absolute",
    right: "10px",
    top: "5px",
    color: "snow",
    fontWeight: "bold",
    fontFamily: "Microsoft JhengHei"
  },
  guessItem: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    marginTop: "5px"
  },
  img: {
    width: "100%",
    height: "100%"
  },
  restaurantName: {
    width: "65%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
    // marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
    // marginLeft: "105px"
  },
  restaurants: {
    display: "flex",
    flexWrap: "wrap"
  },
  summary: {
    padding: "0 24px 0 16px"
  },
  details: {
    padding: "0"
  },
  list: {
    width: "100%"
  }
}));

const categoryStyles = makeStyles({
  randomBlock: {
    display: "flex",
    overflowX: "auto"
  },
  div: {
    padding: "10px 5px 10px"
  },
  badge: {
    position: "absolute",
    top: "12px",
    right: "0",
    width: "100%"
  },
  card: {
    textAlign: "center"
  }
});

function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [restaurant, setrestaurant] = useState(null);
  const [showLogInButton, setShowLogInButton] = useState(true);
  const [sessionStroage, setSessionStorage] = useState({});
  const openU = Boolean(anchorEl);
  const history = useHistory();
  const listItem = [
    { title: "查看訂單", href: `/orders?name=${sessionStroage.member}` },
    { title: "首頁", href: "/" },
    { title: "聯絡我們", href: "#" }
  ];

  useEffect(() => {
    console.log("sessionStorage", JSON.parse(sessionStorage.getItem("user")));
    const sessionStorageData =
      sessionStorage.getItem("user") !== null ? JSON.parse(sessionStorage.getItem("user")) : {};
    if (!restaurant) {
      getRestaurant();
    }
    if (Object.keys(sessionStorageData).length > 0) {
      console.log("有sessionStorage , 表示已登入");
      setSessionStorage(sessionStorageData);
      setShowLogInButton(false);
    } else {
      setShowLogInButton(true);
    }
  }, []);

  const getRestaurant = async () => {
    let res = await productService.getAll();
    console.log("app res", res);
    setrestaurant(res);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogIn = () => {
    history.push("/login");
  };

  const handleCheckOrderDetails = async () => {
    const sessionStorageData = JSON.parse(sessionStorage.getItem("user"));
    console.log(8390, "sessionStorageData", sessionStorageData);
    const res = await productService.getAllOrders(sessionStorageData.member);
    console.log("handle check order details res", res);
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log("user", user);
    handleClose();
    history.push(`/orders?name=${user.member}`);
  };

  const handleLogOut = async () => {
    const res = await productService.logOut(sessionStroage.login);
    console.log("log out res", res);
    if (res.code === 200) {
      sessionStorage.clear();
      setShowLogInButton(true);
      alert("已將您的帳號登出!");
      handleClose();
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Gourmand
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-list-grow"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-list-grow"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={openU}
              onClose={handleClose}
            >
              {showLogInButton ? (
                <MenuItem onClick={handleLogIn}>登入</MenuItem>
              ) : (
                <div>
                  <MenuItem onClick={handleCheckOrderDetails}>查詢訂單</MenuItem>
                  <MenuItem onClick={handleLogOut}>登出</MenuItem>
                </div>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<KeyboardArrowDownRoundedIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.summary}
          >
            <Typography className={classes.heading}>餐廳分類</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <List className={classes.list}>
              {restaurant ? (
                restaurant.distinctByKind.map((kind, idx) => {
                  return (
                    <Link to={`/search?searchKeyWord=${kind}`} key={idx}>
                      <ListItem button>
                        <ListItemText primary={kind} />
                      </ListItem>
                    </Link>
                  );
                })
              ) : (
                <p>NONONO</p>
              )}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <List>
          {listItem.map((item, index) => (
            <Link to={item.href} key={index}>
              <ListItem button>
                <ListItemText primary={item.title} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Header;
