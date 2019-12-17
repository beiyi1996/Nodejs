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
import CardContent from "@material-ui/core/CardContent";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "../../node_modules/@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import EventRoundedIcon from "@material-ui/icons/EventRounded";
import clsx from "clsx";

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
      margin: "5px 0",

      "&:not(:first-child)": {
        padding: "0 10px"
      }
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
    minWidth: 275,
    marginTop: 15,
    backgroundColor: "#F7F4E7"
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
    marginBottom: 5,
    color: "#606278",
    fontFamily: "Microsoft JhengHei",
    paddingLeft: 25,
    fontWeight: "bold"
  },
  textArea: {
    resize: "none",
    padding: 5,
    outline: "none",
    borderRadius: 5
  },
  formControl: {
    width: "100%"
  },
  count: {
    margin: "10px 0 3px",
    fontSize: 12
  },
  countContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 5
  },
  counter: {
    display: "flex",
    marginBottom: 8,
    alignItems: "baseline"
  },
  title: {
    fontSize: 14,
    width: "15%"
  },
  btnGroup: {
    width: "85%",
    display: "flex",
    justifyContent: "space-evenly",

    "& > button": {
      width: "20%",
      borderRadius: "50%",
      border: "none",
      fontSize: 20,
      color: "#7FABAB",
      background: "none",
      outline: "none",

      "&:hover": {
        cursor: "pointer",
        color: "#E07A5F"
      }
    },

    "& > input": {
      border: "none",
      borderBottom: "1px solid #3D405B",
      width: "35%",
      textAlign: "center",
      color: "#3D405B",
      fontSize: 16,
      outline: "none",

      "&:hover": {
        cursor: "default"
      }
    }
  },
  notes: {
    marginTop: 0,
    fontSize: 12
  },
  calendarIcon: {
    position: "absolute",
    left: 13,
    color: "#7FABAB"
  },
  orderDetail: {
    paddingLeft: 15,
    listStyleType: "circle",
    "& > li": {
      fontSize: 14,
      fontFamily: "Microsoft JhengHei"
    }
  },
  day: {
    display: "inline-block",
    width: "calc(100% / 7)",
    textAlign: "center",
    color: "#606278"
  },
  weekend: {
    color: "#E07A5F"
  }
}));

function Booking() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date("2014-08-18T21:11:54"));
  const [time, setTime] = React.useState("");
  const [adult, setAdult] = React.useState(0);
  const [children, setChildren] = React.useState(0);
  const weekend = ["日", "一", "二", "三", "四", "五", "六"];

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleChange = event => {
    setTime(event.target.value);
  };

  const handleClickPlusAdult = () => {
    if (adult === 10) {
      return;
    }
    setAdult(adult + 1);
  };

  const handleClickMinusAdult = () => {
    if (adult < 1) {
      return;
    }
    setAdult(adult - 1);
  };

  const handleClickPlusChildren = () => {
    if (children === 10) {
      return;
    }
    setChildren(children + 1);
  };

  const handleClickMinusChildren = () => {
    if (children < 1) {
      return;
    }
    setChildren(children - 1);
  };

  const renderCalendar = () => {
    const today = new Date();
    console.log("月份", today.getMonth());
    const days = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    console.log("天數", days.getDate());
    const dayArray = [];
    let rows = [];
    let cells = [];
    for (let i = 1; i <= days.getDate(); i++) {
      // console.log("i", i);
      // console.log("today.getFullYear()", today.getFullYear());
      // console.log("today.getMonth() + 1", today.getMonth());
      const todayDay = new Date(today.getFullYear(), today.getMonth(), i).getDay();
      // console.log("todayDay", todayDay);
      dayArray.push([i, todayDay]);
    }
    // console.log("dayArray", dayArray);
    dayArray.map((item, idx) => {
      // console.log("item", item[1]);
      if (item[1] % 6 !== 0 || item[1] === 0) {
        // console.log("???");
        cells.push(item);
      } else {
        if (item[1] === 6) {
          cells.push(item);
        }
        rows.push(cells);
        cells = [];
      }
      // console.log("dayArray.length", dayArray.length);
      if (idx === dayArray.length - 1) {
        rows.push(cells);
      }
    });
    console.log("rows", rows);

    const aa = rows.map((item, idx) => {
      console.log("idx", idx);
      console.log("item", item);
      return (
        <div>
          {item.map((item, idx) => {
            console.log("?????????", item);
            const isWeekend = item[1] === 0 || item[1] === 6 ? true : false;
            console.log("isWeekend", isWeekend);
            return (
              <span
                className={clsx(classes.day, {
                  [classes.weekend]: isWeekend
                })}
              >
                {item[0]}
              </span>
            );
          })}
        </div>
      );
    });

    return aa;
  };
  return (
    <Container maxWidth="sm" className={classes.root}>
      <div>
        {weekend.map((item, idx) => {
          return (
            <span key={idx} className={classes.day}>
              {item}
            </span>
          );
        })}
        <div>{renderCalendar()}</div>
      </div>
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
            Reataurant Name..
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} className={classes.paperGrid}>
            <Paper className={classes.paperRoot}>
              <ul className={classes.detailList}>
                <li>
                  <input type="text" onClick={renderCalendar} />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="日期"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </li>
                <li>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">時間</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={time}
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>12:00</MenuItem>
                      <MenuItem value={20}>13:00</MenuItem>
                      <MenuItem value={30}>14:00</MenuItem>
                    </Select>
                    <FormHelperText>請選擇訂位時間!</FormHelperText>
                  </FormControl>
                </li>
                <li>
                  <p className={classes.count}>人數</p>
                  <div className={classes.countContainer}>
                    <div className={classes.counter}>
                      <span className={classes.title}>大人</span>
                      <div className={classes.btnGroup}>
                        <button onClick={handleClickMinusAdult}>-</button>
                        <input name="adult" type="text" value={adult} readOnly />
                        <button onClick={handleClickPlusAdult}>+</button>
                      </div>
                    </div>
                    <div className={classes.counter}>
                      <span className={classes.title}>小孩</span>
                      <div className={classes.btnGroup}>
                        <button onClick={handleClickMinusChildren}>-</button>
                        <input name="children" type="text" value={children} readOnly />
                        <button onClick={handleClickPlusChildren}>+</button>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <p className={classes.notes}>備註</p>
                  <textarea name="notes" id="" cols="30" rows="5" className={classes.textArea}></textarea>
                </li>
              </ul>
            </Paper>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.pos} color="textSecondary">
                  <EventRoundedIcon className={classes.calendarIcon} />
                  <span>定位資訊</span>
                </Typography>
                <Typography variant="h5" component="h2">
                  restaurant name...
                </Typography>
                <ul className={classes.orderDetail}>
                  <li>
                    日期 : <span>2019/12/31</span>
                  </li>
                  <li>
                    時間 : <span>19:00</span>
                  </li>
                  <li>
                    人數 :
                    <span>
                      &nbsp;
                      {adult} 位大人 {children} 位小孩
                    </span>
                  </li>
                  <li>
                    備註 : <span>我是備註, 可有可無</span>
                  </li>
                </ul>
              </CardContent>
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
