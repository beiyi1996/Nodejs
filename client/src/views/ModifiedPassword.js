import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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

function ModifiedPassword() {
  const classes = useStyles();
  const [newValues, setNewValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false
  });
  const [checkValues, setCheckValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false
  });

  const handleChange = prop => event => {
    setNewValues({ ...newValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setNewValues({ ...newValues, showPassword: !newValues.showPassword });
  };

  const handleChangeCheckPassword = prop => event => {
    setCheckValues({ ...checkValues, [prop]: event.target.value });
  };

  const handleClickCheckShowPassword = () => {
    setCheckValues({ ...checkValues, showPassword: !checkValues.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <Container maxWidth="sm">
      <Grid item xs={12} className={classes.container}>
        <Grid item xs={12} className={classes.paper}>
          <img src="http://fakeimg.pl/100x100?text=logo&font=lobster" alt="" className={classes.logo} />
        </Grid>
        <Grid item xs={12} className={classes.formGrid}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              label="email"
              name="email"
              disabled={true}
              defaultValue="example@gmail.com"
              className={classes.input}
            />
            <FormControl className={clsx(classes.margin, classes.textField, classes.input)}>
              <InputLabel htmlFor="standard-adornment-password">new password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={newValues.showPassword ? "text" : "password"}
                value={newValues.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {newValues.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                name="password"
              />
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.textField, classes.input)}>
              <InputLabel htmlFor="standard-adornment-password">check new password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={checkValues.showPassword ? "text" : "password"}
                value={checkValues.password}
                onChange={handleChangeCheckPassword("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickCheckShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {checkValues.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                name="password"
              />
            </FormControl>
          </form>
        </Grid>
        <Grid item xs={12} className={classes.buttonGrid}>
          <Button variant="outlined" className={classes.button}>
            儲存修改
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ModifiedPassword;
