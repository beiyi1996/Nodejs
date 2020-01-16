import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    fontFamily: "Microsoft JhengHei"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  logo: {
    borderRadius: "50%"
  },
  paperText: {
    textAlign: "left",
    boxShadow: "none",
    margin: "0 auto",
    width: "50%"
  },
  center: {
    textAlign: "center"
  },
  buttonGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10
  },
  button: {
    margin: "10px 0",
    fontFamily: "Microsoft JhengHei"
  }
}));

function Completed() {
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <Grid item xs={12} className={classes.container}>
        <Grid item xs={12} className={classes.paper}>
          <img src="http://fakeimg.pl/130x130?text=logo&font=lobster" alt="" className={classes.logo} />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paperText}>
            <p className={classes.center}>感謝您的訂位!</p>
            <p>
              訂單編號：<a href="https://www.youtube.com/watch?v=jL25Drh3Npo">20191210812991</a>
            </p>
            <p>請至網站「查詢訂單」查看訂單明細。</p>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.buttonGrid}>
          <Link to="/">
            <Button variant="outlined" className={classes.button}>
              回首頁
            </Button>
          </Link>
          <Link to="/order">
            <Button variant="outlined" className={classes.button}>
              查看訂單
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Completed;
