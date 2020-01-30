import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import productService from "../services/productService";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

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
  },
  title: {
    textAlign: "left",
    display: "inline-block",
    width: "25%"
  },
  radioInput: {
    flexDirection: "row",
    margin: "10px auto",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "Microsoft JhengHei"
  },
  radio: {
    width: "38%",
    marginRight: 0
  }
}));

function Register() {
  const classes = useStyles();
  const [phone, setPhone] = useState("");
  const [newValues, setNewValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false
  });
  const [gender, setGender] = useState("female");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleRedioChange = event => {
    setGender(event.target.value);
  };

  const handleChange = name => event => {
    setPhone({
      ...phone,
      [name]: event.target.value
    });
  };

  const handlePasswordChange = prop => event => {
    setNewValues({ ...newValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setNewValues({ ...newValues, showPassword: !newValues.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const handleChangeName = e => {
    setName(e.target.value);
  };

  const handleRegister = async (email, password, name, gender, phone) => {
    const genderNumber = gender === "male" ? 0 : 1;
    const res = await productService.register(email, password, name, genderNumber, phone);
    console.log("res", res);
  };
  return (
    <Container maxWidth="sm">
      <Grid item xs={12} className={classes.container}>
        <Grid item xs={12} className={classes.paper}>
          <img src="http://fakeimg.pl/100x100?text=logo&font=lobster" alt="" className={classes.logo} />
        </Grid>
        <Grid item xs={12} className={classes.formGrid}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField label="email" name="email" className={classes.input} onChange={handleChangeEmail} />
            <FormControl className={clsx(classes.margin, classes.textField, classes.input)}>
              <InputLabel htmlFor="standard-adornment-password">password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={newValues.showPassword ? "text" : "password"}
                value={newValues.password}
                onChange={handlePasswordChange("password")}
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
            <TextField label="name" name="name" className={classes.input} onChange={handleChangeName} />
            <RadioGroup
              aria-label="gender"
              name="gender"
              className={classes.radioInput}
              value={gender}
              onChange={handleRedioChange}
            >
              <span className={classes.title}>gender</span>
              <FormControlLabel
                value="male"
                control={<Radio color="primary" />}
                label="男"
                labelPlacement="end"
                className={classes.radio}
              />
              <FormControlLabel
                value="female"
                control={<Radio color="primary" />}
                label="女"
                labelPlacement="end"
                className={classes.radio}
              />
            </RadioGroup>
            <FormControl className={classes.input}>
              <InputLabel>phone</InputLabel>
              <TextField label="name" name="name" className={classes.input} onChange={handleChangeName} />
              <TextField label="name" name="name" className={classes.input} onChange={handleChangeName} />
              <TextField label="name" name="name" className={classes.input} onChange={handleChangeName} />
            </FormControl>
          </form>
        </Grid>
        <Grid item xs={12} className={classes.buttonGrid}>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={() => handleRegister(email, newValues.password, name, gender, phone.textmask)}
          >
            註冊
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
