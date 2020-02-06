import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import GithubIcon from "../images/github-big-logo.png";
import CodepenIcon from "../images/codepen.png";
import Paper from "@material-ui/core/Paper";
import Header from "./Header";
import Footer from "./Footer";

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "center",
    height: "100vh",
    boxShadow: "1px 5px 15px 0px #DBDCE1",
    position: "relative",
    "& > *": {
      color: "#3D405B"
    }
  },
  logoGrid: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    padding: "0 20px",
    alignItems: "center"
  },
  logo: {
    borderRadius: "50%"
  },
  formGrid: {
    width: "100%",
    margin: "0 auto",
    padding: 10
  },
  iconImg: {
    width: 22
  },
  introduction: {
    padding: 20,
    "& > div > *": {
      fontFamily: "Microsoft JhengHei"
    }
  },
  buttonGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  logInOrRegister: {
    display: "flex",
    width: 150,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  button: {
    margin: "10px 0",
    fontFamily: "Microsoft JhengHei",
    border: "none"
  },
  footerDiv: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    "& > div": {
      position: "static"
    }
  }
}));

function ContactMe() {
  const classes = useStyles();

  const handleClickEmailButton = () => {
    console.log("clicked email button");
  };

  const handleClickGitHubButton = () => {
    console.log("clicked github button");
  };

  const handleClickCodePenButton = () => {
    console.log("clicked codepen button");
  };

  return (
    <Container maxWidth="sm">
      <Grid item xs={12} className={classes.container}>
        <Header />
        <Grid item xs={12} className={classes.logoGrid}>
          <img src="http://fakeimg.pl/200x200?text=logo&font=lobster" alt="" className={classes.logo} />
          <Grid item xs={12} className={classes.formGrid}>
            <Typography variant="h4">Winni Huang</Typography>
            <Grid item xs={12}>
              <IconButton aria-label="phone">
                <PhoneRoundedIcon />
              </IconButton>
              <IconButton aria-label="email" onClick={handleClickEmailButton}>
                <EmailRoundedIcon />
              </IconButton>
              <IconButton aria-label="email" onClick={handleClickGitHubButton}>
                <img src={GithubIcon} className={classes.iconImg} />
              </IconButton>
              <IconButton aria-label="email" onClick={handleClickCodePenButton}>
                <img src={CodepenIcon} className={classes.iconImg} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.introduction}>
          <Paper>
            <Typography variant="h5">樂觀開朗，勇於挑戰。</Typography>
            <Typography variant="body1">
              在大學的最後一個學期，決定加入Build School，培養自己的第二專長。
              從一開始的C#課程，完成了生命靈數、運輸票價等作品；到前端的HTML、CSS、JavaScript，使用BootStrap 4
              刻了蝦皮首頁、jQuery搭配localstorage跟Google Maps API實作了一個自己的行事曆、CSS :
              Flexbox搭配設定網頁斷點實作貓奴選物的RWD響應式網頁以及運用Vue.js實做簡易TodoList工具；並且在6月底參加企業專題，使用
              VSTS 及 Scurm 與4位組員偕同開發 Bot Designer 專案。希望我可以成為貴公司的一份子！
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.buttonGrid}>
          <Button variant="outlined" className={classes.button}>
            Contact me
          </Button>
        </Grid>
        <div className={classes.footerDiv}>
          <Footer />
        </div>
      </Grid>
    </Container>
  );
}

export default ContactMe;
