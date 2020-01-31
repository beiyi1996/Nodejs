import React, { useState, useEffect } from "react";
import productService from "../services/productService";
import { Link, useHistory } from "react-router-dom";
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
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";

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
    marginTop: 10,
    position: "relative"
  },
  title: {
    fontSize: 18,
    flexGrow: 1
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
    marginTop: 15,
    marginBottom: 25,
    position: "relative",

    "&::after": {
      content: "''",
      width: "100%",
      position: "absolute",
      bottom: "-15px",
      border: "0.5px dashed #B8B9C3"
    }
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
  },
  featureBtn: {
    position: "absolute",
    top: 0,
    right: 0,

    "& > a": {
      "& > button": {
        minWidth: "auto",
        "& > span > svg": {
          color: "#7FABAB"
        }
      }
    },
    "& > button": {
      minWidth: "auto",
      lineHeight: "initial",

      "&:nth-child(2)": {
        color: "#E07A5F"
      }
    }
  },
  noOrder: {
    backgroundColor: "#F9F7ED",
    color: "#E07A5F",
    fontFamily: "Microsoft JhengHei",
    fontSize: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: "100%",
    padding: 10,
    wordBreak: "normal"
  }
}));

function Orders() {
  const [restaurant, setrestaurant] = useState(null);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [orders, setOrders] = useState([]);
  const openU = Boolean(anchorEl);
  const [sessionStroage, setSessionStorage] = useState({});
  const history = useHistory();
  const listItem = [
    { title: "查看訂單", href: `/orders?name=${sessionStroage.member}` },
    { title: "首頁", href: "/" },
    { title: "聯絡我們", href: "#" }
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getRestaurant = async () => {
    let res = await productService.getAll();
    setrestaurant(res);
  };

  const getAllOrders = async () => {
    const user = sessionStorage.getItem("user") !== null ? JSON.parse(sessionStorage.getItem("user")) : {};
    setSessionStorage(user);
    if (user.member) {
      const res = await productService.getAllOrders(user.member);
      console.log("get all orders res", res);
      setOrders(res);
    } else {
      alert("請先登入, 即可查看訂單! 謝謝!");
      sessionStorage.clear();
      history.push("/login");
    }
  };

  useEffect(() => {
    if (!restaurant) {
      getRestaurant();
    }
    getAllOrders();
  }, []);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteOrder = async order_ID => {
    console.log("handle delete order order_ID", order_ID);
    const deleteOrder = window.confirm("請問您確定要刪除此筆訂單嗎?");
    if (deleteOrder) {
      const deleteOrder = await productService.deleteOrderDetails(order_ID);
      console.log("deleteOrder", deleteOrder);
      if (deleteOrder.code === 400) {
        alert("您已超過最晚取消預約時間, 無法將您的訂單移除!");
      } else if (deleteOrder.code === 301) {
        alert("您已登入超過10分鐘, 系統為確保您的資料安全, 已將您登出!! 請您再次登入進行修改, 謝謝!");
        sessionStorage.clear();
        history.push("/login");
      } else {
        await getAllOrders();
        alert(`已將您的訂單編號為 (${order_ID}) 訂單刪除!`);
      }
    }
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
      alert("已將您的帳號登出!");
      handleClose();
      history.push("/");
    }
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
                <MenuItem onClick={handleCheckOrderDetails}>查詢訂單</MenuItem>
                <MenuItem onClick={handleLogOut}>登出</MenuItem>
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
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          {orders.length !== 0 ? (
            orders.map(item => {
              const formatDateTime = new Date(item.dateTime);
              const date = `${formatDateTime.getFullYear()} / ${formatDateTime.getMonth() +
                1} / ${formatDateTime.getDate()}`;
              const minutes =
                formatDateTime.getMinutes() > 9 ? formatDateTime.getMinutes() : `0${formatDateTime.getMinutes()}`;
              const time = `${formatDateTime.getHours()} : ${minutes}`;
              const createDateTime = new Date(item.create_time);
              const createDate = `${createDateTime.getFullYear()} / ${createDateTime.getMonth() +
                1} / ${createDateTime.getDate()}`;
              const createMinutes =
                createDateTime.getMinutes() > 9 ? createDateTime.getMinutes() : `0${createDateTime.getMinutes()}`;
              const createTime = `${createDateTime.getHours()} : ${createMinutes}`;
              return (
                <Grid item xs={12} className={classes.orderContent} key={item.create_time}>
                  <Typography className={classes.orderTitle}>
                    <span>訂單編號 : </span>
                    <span>{item._id}</span>
                  </Typography>
                  <Typography className={classes.orderTitle}>
                    <span>成立訂單 : </span>
                    <span>
                      {createDate} - {createTime}
                    </span>
                  </Typography>
                  <Card className={classes.card}>
                    <ul className={classes.orderDetail}>
                      <li>
                        日期 : <span>{date}</span>
                      </li>
                      <li>
                        時間 : <span>{time}</span>
                      </li>
                      <li>
                        人數 :{" "}
                        <span>
                          {item.adult} 大人 {item.children}小孩
                        </span>
                      </li>
                      <li>
                        備註 : <span>{item.notes}</span>
                      </li>
                    </ul>
                    <div className={classes.featureBtn}>
                      <Link to={`/orderdetails?order_ID=${item._id}`}>
                        <Button>
                          <CreateRoundedIcon />
                        </Button>
                      </Link>
                      <Button onClick={() => handleDeleteOrder(item._id)}>
                        <DeleteRoundedIcon />
                      </Button>
                    </div>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <div className={classes.noOrder}>
              還沒找到喜歡的餐廳嗎?? <br />
              快回首頁在搜尋一下吧!!
            </div>
          )}
        </main>
      </div>
    </Container>
  );
}

export default Orders;
