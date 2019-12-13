import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    fontFamily: "Microsoft JhengHei"
  },
  container: {
    textAlign: "center"
  },
  logo: {
    borderRadius: "50%"
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "250px"
    },
    display: "flex",
    flexDirection: "column"
  },
  formGrid: {
    width: "100%",
    margin: "0 auto",
    paddingTop: 10
  },
  input: {
    margin: "10px auto"
  },
  buttonGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: "40%",
    margin: "50px 0",
    fontFamily: "Microsoft JhengHei"
  }
}));

function LogIn() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Grid item xs={12} className={classes.container}>
        <Grid item xs={12} className={classes.paper}>
          <img src="http://fakeimg.pl/100x100?text=logo&font=lobster" alt="" className={classes.logo} />
        </Grid>
        <Grid item xs={12} className={classes.formGrid}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField label="email" name="email" className={classes.input} />
            <TextField label="password" name="password" className={classes.input} />
          </form>
        </Grid>
        <Grid item xs={12} className={classes.buttonGrid}>
          <Button variant="outlined" className={classes.button}>
            登入
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LogIn;
