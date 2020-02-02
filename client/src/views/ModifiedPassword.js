import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import productService from "../services/productService";
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
import { useEffect } from "react";

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
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newValues, setNewValues] = useState({
    password: "",
    showPassword: false
  });
  const [checkValues, setCheckValues] = useState({
    password: "",
    showPassword: false
  });
  const [passwordError, setPasswordError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    console.log(123456, "modified password useEffect");
    async function getModifiedPasswordPage() {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      setToken(token);
      const res = await productService.modifiedPasswordGET(token);
      console.log("get modified password!!!", res);
      if (res) {
        setEmail(res.email);
      } else {
        alert("您的修改密碼時間已超過10分鐘, 為確保您的帳戶安全, 系統已將您自動登出, 麻煩您再次進行忘記密碼的操作流程! 謝謝您!");
        history.push("/login");
      }
    }
    getModifiedPasswordPage();
  }, [history]);

  const handleChange = prop => event => {
    setPasswordError(false);
    setNewValues({ ...newValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setNewValues({ ...newValues, showPassword: !newValues.showPassword });
  };

  const handleChangeCheckPassword = prop => event => {
    setPasswordError(false);
    setCheckValues({ ...checkValues, [prop]: event.target.value });
  };

  const handleClickCheckShowPassword = () => {
    setCheckValues({ ...checkValues, showPassword: !checkValues.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleModifiedPassword = async () => {
    console.log("handle modified password");
    if (newValues.password !== checkValues.password) {
      alert("密碼與確認密碼不同, 請再次確認");
      setPasswordError(true);
    } else {
      let res = await productService.modifiedPasswordPOST(token, email, checkValues.password);
      console.log("res", res);
      if (res.code === 200) {
        alert("您已完成修改密碼!");
        history.push("/");
      }
    }
  };
  return (
    <Container maxWidth="sm">
      <Grid item xs={12} className={classes.container}>
        <Grid item xs={12} className={classes.paper}>
          <img src="http://fakeimg.pl/100x100?text=logo&font=lobster" alt="" className={classes.logo} />
        </Grid>
        <Grid item xs={12} className={classes.formGrid}>
          <form className={classes.form} noValidate autoComplete="off">
            {console.log("email", email)}
            <TextField label="email" name="email" disabled={true} value={email} className={classes.input} />
            <FormControl className={clsx(classes.margin, classes.textField, classes.input)}>
              <InputLabel htmlFor="standard-adornment-password">new password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={newValues.showPassword ? "text" : "password"}
                value={newValues.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                      {newValues.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                name="password"
                error={passwordError}
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
                    <IconButton aria-label="toggle password visibility" onClick={handleClickCheckShowPassword} onMouseDown={handleMouseDownPassword}>
                      {checkValues.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                name="password"
                error={passwordError}
              />
            </FormControl>
          </form>
        </Grid>
        <Grid item xs={12} className={classes.buttonGrid}>
          <Button variant="outlined" className={classes.button} onClick={handleModifiedPassword}>
            儲存修改
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ModifiedPassword;
