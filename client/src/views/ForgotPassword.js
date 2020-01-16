import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import productService from "../services/productService";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    textAlign: "center"
  },
  logo: {
    borderRadius: "50%"
  },
  grid: {
    width: "100%",
    margin: "0 auto",
    paddingTop: 30
  },
  typography: {
    fontFamily: "Microsoft JhengHei"
  },
  warning: {
    backgroundColor: "#F9F7ED",
    color: "#E07A5F",
    padding: 5
  },
  errorIcon: {
    fontSize: 18,
    verticalAlign: "text-bottom",
    marginRight: 5
  }
}));

function ForgotPassword() {
  const classes = useStyles();

  useEffect(() => {
    async function forgetPassword() {
      await productService.forgotPassword();
      console.log("發送忘記密碼郵件!!!");
    }
  }, []);

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Grid item xs={12} className={classes.container}>
        <Grid item xs={12} className={classes.paper}>
          <img src="http://fakeimg.pl/100x100?text=logo&font=lobster" alt="" className={classes.logo} />
        </Grid>
        <Grid item xs={10} className={classes.grid}>
          <Typography variant="body1" gutterBottom className={classes.typography}>
            我們已寄送email, 請至您的信箱查看修改密碼分頁。
            <p className={classes.warning}>
              <ErrorIcon className={classes.errorIcon} />
              提醒您, 更改密碼具有時效性, 建議10分鐘內盡速修改完成! <br />
              謝謝您!
            </p>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ForgotPassword;
