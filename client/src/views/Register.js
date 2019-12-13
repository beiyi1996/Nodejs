import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MaskedInput from "../../node_modules/react-text-mask";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

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

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={["(", /[0-9]/, /\d/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

function Register() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    textmask: "(09)  -    -     ",
    numberformat: "4330"
  });

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };
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
            <TextField label="name" name="name" className={classes.input} />
            <TextField label="gender" name="gender" className={classes.input} />
            <FormControl className={classes.input}>
              <InputLabel htmlFor="formatted-text-mask-input">phone</InputLabel>
              <Input
                value={values.textmask}
                onChange={handleChange("textmask")}
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom}
              />
            </FormControl>
          </form>
        </Grid>
        <Grid item xs={12} className={classes.buttonGrid}>
          <Button variant="outlined" className={classes.button}>
            註冊
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
