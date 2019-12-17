/*jshint esversion: 6 */
import React, { useState, useEffect } from "react";
import productService from "../services/productService";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import AddIcon from "@material-ui/icons/Add";

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
    width: "100%",
    marginTop: 10
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
  summary: {
    padding: "0 24px 0 16px"
  },
  details: {
    padding: "0"
  },
  list: {
    width: "100%"
  },
  orderDetail: {
    listStyleType: "circle",
    paddingLeft: 30,
    fontFamily: "Microsoft JhengHei"
  },
  orderContent: {
    marginTop: 15
  },
  orderTitle: {
    fontFamily: "Microsoft JhengHei"
  },
  button: {
    marginTop: 10,
    textAlign: "right",

    "& > button": {
      fontFamily: "Microsoft JhengHei"
    }
  }
}));

function OrderDetails() {
  const [restaurant, setrestaurant] = useState(null);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openU = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!restaurant) {
      getRestaurant();
    }
  });

  const getRestaurant = async () => {
    let res = await productService.getAll();
    console.log("app res", res);
    setrestaurant(res);
  };
  console.log("restaurant", restaurant);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        <CssBaseline />
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
                <MenuItem onClick={handleClose}>查詢訂單</MenuItem>
                <MenuItem onClick={handleClose}>登出</MenuItem>
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
              expandIcon={<AddIcon />}
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
                      <ListItem button key={idx}>
                        <ListItemText primary={kind} />
                      </ListItem>
                    );
                  })
                ) : (
                  <p>NONONO</p>
                )}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <List>
            {["查看訂單", "首頁", "聯絡我們"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <Grid item xs={12} className={classes.orderContent}>
            <Typography className={classes.orderTitle}>
              <span>訂單編號 : </span>
              <span>_idxxxxxxxxxxxxxxxxx</span>
            </Typography>
            <Typography className={classes.orderTitle}>
              <span>成立訂單 : </span>
              <span>2019/12/31 - 12:00</span>
            </Typography>
            <Card className={classes.card}>
              <ul className={classes.orderDetail}>
                <li>
                  日期 : <span>2019/12/31</span>
                </li>
                <li>
                  時間 : <span>19:00</span>
                </li>
                <li>
                  人數 : <span>2 大人 2小孩</span>
                </li>
                <li>
                  備註 : <span>我是備註, 可有可無</span>
                </li>
              </ul>
            </Card>
            <Grid item xs={12} className={classes.button}>
              <Button>回上一頁</Button>
            </Grid>
          </Grid>
        </main>
      </div>
    </Container>
  );
}

export default OrderDetails;
