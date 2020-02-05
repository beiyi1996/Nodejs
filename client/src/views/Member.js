import React, { useState, useEffect } from "react";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import productService from "../services/productService";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Footer from "./Footer";
import Header from "./Header";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingBottom: 30,
    position: "relative",
    height: "100vh",
    boxShadow: "1px 5px 15px 0px #DBDCE1",
    textAlign: "center"
  },
  userPicGrid: {
    marginTop: 50
  },
  userPic: {
    borderRadius: "50%"
  },
  userGrid: {
    display: "flex",
    justifyContent: "space-around",
    padding: "10px 20px"
  },
  userPaper: {
    width: "50%",
    "&:first-child": {
      borderBottomRightRadius: 0
    },
    "&:last-child": {
      borderBottomLeftRadius: 0
    },
    "& > h6": {
      fontFamily: "Microsoft JhengHei",
      color: "#3D405B"
    }
  },
  userDetails: {
    textAlign: "left",
    padding: "0 20px",
    "& > *": {
      fontFamily: "Microsoft JhengHei"
    }
  },
  orders: {
    marginTop: 20,
    "& > *": {
      fontFamily: "Microsoft JhengHei"
    }
  },
  orderCards: {
    "& > *": {
      fontFamily: "Microsoft JhengHei"
    },
    "& > a": {
      textDecoration: "none"
    }
  },
  cardButton: {
    width: "100%",
    textAlign: "left",
    "&:hover": {
      backgroundColor: "#FEFAF4"
    }
  },
  cardContent: {
    "& > *": {
      fontFamily: "Microsoft JhengHei"
    }
  },
  cardTitle: {
    color: "#E07A5F"
  },
  cardContents: {
    color: "#717487"
  },
  footerDiv: {
    position: "absolute",
    bottom: 0,
    width: "inherit",
    "& > div": {
      position: "static"
    }
  }
}));

function Member() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [userName, setUserName] = useState("");
  const [orderCount, setOrderCount] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function didMountWork() {
      await getMemberDetails();
    }
    didMountWork();
  }, []);

  const getMemberDetails = async () => {
    const sessionStorageData =
      sessionStorage.getItem("user") !== null ? JSON.parse(sessionStorage.getItem("user")) : {};
    if (Object.keys(sessionStorageData).length === 0) {
      const routeLogIn = window.confirm("您上未登入, 需要將您導至登入頁嗎?");
      if (routeLogIn) {
        history.push("/login");
      } else {
        setUserName("");
        setOrders([]);
        setOrderCount(0);
        setUserEmail("");
      }
    } else {
      const orders = await productService.getAllOrders(sessionStorageData.member);
      console.log("member orders", orders);
      setUserName(sessionStorageData.member);
      setUserEmail(sessionStorageData.email);
      setOrders(orders.orders);
      setOrderCount(orders.orders.length);
    }
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Grid item xs={12}>
        <Header />
        <Grid item xs={12} className={classes.userPicGrid}>
          <img src="http://fakeimg.pl/100x100?text=userPic&font=lobster" alt="" className={classes.userPic} />
        </Grid>
        <Grid item xs={12} className={classes.userGrid}>
          <Paper className={classes.userPaper}>
            <Typography variant="h6">Name</Typography>
            <Typography variant="subtitle1">{userName}</Typography>
          </Paper>
          <Paper className={classes.userPaper}>
            <Typography variant="h6">訂單總數</Typography>
            <Typography variant="subtitle1">{orderCount}筆</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.userDetails}>
          <Typography variant="h6">電子郵件地址 : {userEmail}</Typography>
          <Typography variant="h6">最近訂單:</Typography>
          <Grid item xs={12} className={classes.orders}>
            {/* {orders.length > 0 ? (
              orders.map(item => {
                return (
                  <Card className={classes.orderCards}>
                    <Button className={classes.cardButton}>
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom className={classes.cardTitle} variant="h6">
                          訂位時間: {item.dateTime}
                        </Typography>
                        <Typography variant="body2" className={classes.cardContents} component="p">
                          餐廳名稱 : {item.restaurant_id} | 人數 : 2 位大人, 0位小孩
                        </Typography>
                      </CardContent>
                    </Button>
                  </Card>
                );
              })
            ) : (
              <Paper>目前還沒有任何訂單喲!!</Paper>
            )} */}
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.footerDiv}>
        <Footer selectedValue={2} />
      </div>
    </Container>
  );
}

export default Member;
