import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Footer from "./Footer";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "../../node_modules/@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingBottom: 30,

    "& > *": {
      fontFamily: "Microsoft JhengHei"
    }
  },
  grid: {
    width: "100%",
    margin: "0 auto",
    paddingTop: 10,
    display: "flex"
  },
  searchBar: {
    fontSize: 16,
    color: "#3D405B",
    border: "1px solid #B8B9C3",
    borderRadius: 20,
    width: "100%",
    padding: "5px 15px 5px",

    "&:focus": {
      outline: "none"
    }
  },
  searchIcon: {
    marginLeft: "-40px"
  },
  searchBtn: {
    borderRadius: 50,
    height: 40,
    minWidth: 40,
    padding: 5
  },
  icon: {
    verticalAlign: "text-bottom",
    marginTop: 3
  },
  restaurantName: {
    paddingLeft: 10,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical",
    fontFamily: "Microsoft JhengHei",
    fontSize: 17,
    margin: "0 0 5px"
  },
  paperGrid: {
    position: "relative",
    marginBottom: 50
  },
  paperRoot: {
    minHeight: 70,
    padding: 5,
    borderRadius: 4,
    marginTop: 10
  },
  detailList: {
    listStyle: "none",
    paddingLeft: 10,
    fontFamily: "Microsoft JhengHei",

    "& > li": {
      margin: "5px 0"
    }
  },
  title: {
    display: "inline-block",
    width: "100%",
    color: "#838596"
  },
  content: {
    paddingLeft: 15,
    display: "inline-block",
    color: "#4E5169"
  },
  googleMap: {
    padding: "0 5px",
    minHeight: 150,
    border: "1px solid #B8B9C3",
    marginTop: 15
  },
  paperFooter: {
    display: "flex",
    justifyContent: "center",
    padding: "0 5px",
    margin: "10px 0 5px"
  },
  booking: {
    width: "100%",
    borderRadius: 10,
    fontFamily: "Microsoft JhengHei"
  },
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

function Booking() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Grid item xs={12} className={classes.container}>
        <Grid item xs={12} className={classes.grid}>
          <input type="text" name="searchbar" className={classes.searchBar} />
          <div className={classes.searchIcon}>
            <Button className={classes.searchBtn}>
              <SearchIcon className={classes.icon} />
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            search word
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} className={classes.paperGrid}>
            <Paper className={classes.paperRoot}>
              <ul className={classes.detailList}>
                <li>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <span className={classes.title}>店家名稱 : </span>
                  <span className={classes.content}>麥當勞-中山誠品店</span>
                </li>
                <li>
                  <span className={classes.title}>地址 : </span>
                  <span className={classes.content}>台北市內湖區石潭路111號</span>
                </li>
                <li>
                  <span className={classes.title}>電話 : </span>
                  <span className={classes.content}>03-523-2152</span>
                </li>
                <li>
                  <span className={classes.title}>用餐時間 : </span>
                  <span className={classes.content}>09:00 ~ 20:00</span>
                </li>
                <li>
                  <span className={classes.title}>保留資訊 : </span>
                  <span className={classes.content}>將為您保留訂位10分鐘, 若10分鐘過後仍未到場, 即取消訂位!</span>
                </li>
                <li>
                  <span className={classes.title}>最低消費 : </span>
                  <span className={classes.content}>每位顧客最低消費為180元。</span>
                </li>
              </ul>
            </Paper>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="h2">
                  12345678900000000
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
                <Typography variant="body2" component="p">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
            <div className={classes.paperFooter}>
              <Button className={classes.booking}>確認訂位</Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}

export default Booking;
