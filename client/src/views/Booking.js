import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Footer from "./Footer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import EventRoundedIcon from "@material-ui/icons/EventRounded";
import clsx from "clsx";
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";

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
    padding: "0 10px",
    fontFamily: "Microsoft JhengHei",

    "& > li": {
      margin: "5px 0",
      padding: "0 10px",
      position: "relative"
    }
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
    borderRadius: 5,
    width: "96%"
  },
  formControl: {
    width: "100%"
  },
  label: {
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
  calendarGrid: {
    border: "1px solid #DEDCCA",
    position: "absolute",
    display: "none",
    backgroundColor: "#fff",
    zIndex: 1,
    width: "90%",
    top: 43
  },
  week: {
    display: "inline-block",
    width: "calc(100% / 7)",
    textAlign: "center",
    color: "#606278",
    padding: "2px 0"
  },
  day: {
    display: "inline-block",
    width: "calc(100% / 7)",
    textAlign: "center",
    color: "#606278",
    padding: "2px 0",
    lineHeight: "30px",

    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#F4F1DE"
    }
  },
  weekDayDiv: {
    padding: 5,
    fontSize: 14
  },
  weekend: {
    color: "#E07A5F",
    padding: "2px 0",

    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#F4F1DE"
    }
  },
  calendarHeader: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F9F7ED",

    "& > button": {
      border: "none",
      background: "none",
      outline: "none",
      color: "#E5927C",
      padding: "3px 6px",

      "&:hover": {
        cursor: "pointer",
        backgroundColor: "#F4F1DE"
      },
      "&:disabled": {
        color: "#EDEDF0",
        "&:hover": {
          backgroundColor: "#F9F7ED",
          cursor: "default"
        }
      }
    }
  },
  month: {
    display: "inline-block",
    marginRight: 15
  },
  notThisMonth: {
    "&:hover": {
      cursor: "default",
      backgroundColor: "#fff"
    }
  },
  clicked: {
    backgroundColor: "#F4F1DE"
  },
  disabledDay: {
    color: "#EDEDF0",

    "&:hover": {
      backgroundColor: "#fff",
      cursor: "default"
    }
  },
  disabledToday: {
    color: "#F3CEC4",

    "&:hover": {
      backgroundColor: "#fff",
      cursor: "default"
    }
  },
  dateInput: {
    position: "relative",
    width: "95%",
    outline: "none",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "1px solid #3D405B",
    color: "#3D405B",
    fontSize: 16,
    fontFamily: "Microsoft JhengHei",
    letterSpacing: 2
  },
  show: {
    display: "block"
  }
}));

function Booking() {
  const classes = useStyles();
  const [time, setTime] = useState("");
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [disabledPrev, setDisabledPrev] = useState(true);
  const [disabledNext, setDisabledNext] = useState(false);
  const [isShowCalendar, setShowCalendar] = useState(false);
  const [notes, setNotes] = useState("");
  const inputRef = useRef(null);
  let [clickDate, setClickDate] = useState("");
  const weekend = ["日", "一", "二", "三", "四", "五", "六"];
  const monthEnName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemper",
    "October",
    "November",
    "December"
  ];
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

  const handleChangeNote = event => {
    setNotes(event.target.value);
  };

  const Calendar = () => {
    const handlePrevMonth = () => {
      const thisMonth = `${today.getFullYear()}${today.getMonth()}`;
      const changeMonth = `${year}${month}`;
      if (changeMonth === thisMonth) {
        setDisabledPrev(true);
      } else {
        setDisabledPrev(false);
        setDisabledNext(false);
        if (month === 0 && month + 11 === 11) {
          setMonth(month + 11);
          setYear(year - 1);
          setDisabledPrev(true);
        } else {
          setMonth(month - 1);
        }
      }
    };

    const handleNextMonth = () => {
      const todayMonth = today.getMonth() === 11 ? 0 : today.getMonth();
      if (month === 11) {
        setYear(year + 1);
        setMonth(0);
        setDisabledPrev(false);
      } else {
        setMonth(month + 1);
        if (year === today.getFullYear() + 1 && month + 1 === todayMonth + 1) {
          setDisabledNext(true);
        }
      }
    };

    const handleClickDate = (value, disabled, disabledToday) => {
      if (disabled || disabledToday) {
        return;
      } else {
        const clickedDate = `${year}/${month + 1}/${value}`;
        setClickDate(clickedDate);
        setShowCalendar(false);
      }
    };

    const createWeekDay = () => {
      const weekday = weekend.map((item, idx) => {
        return (
          <span key={idx} className={classes.week}>
            {item}
          </span>
        );
      });

      return weekday;
    };

    const createCalendar = (year, month) => {
      const days = new Date(year, month + 1, 0);
      const dayArray = [];
      let rows = [];
      let cells = [];
      let firstDay = new Date(year, month, 1).getDay();
      let lastDay = new Date(year, month, days.getDate()).getDay();
      for (let i = 1; i <= days.getDate(); i++) {
        const todayDay = new Date(year, month, i).getDay();
        dayArray.push([i, todayDay]);
      }
      while (firstDay !== 0) {
        cells.push([]);
        firstDay--;
      }
      dayArray.map((item, idx) => {
        if (item[1] % 6 !== 0 || item[1] === 0) {
          cells.push(item);
        } else {
          if (item[1] === 6) {
            cells.push(item);
          }
          rows.push(cells);
          cells = [];
        }
        if (idx === dayArray.length - 1) {
          while (lastDay !== 6) {
            cells.push([]);
            lastDay++;
          }
          rows.push(cells);
        }
        return true;
      });
      // console.log("rows", rows);
      const calendar = rows.map((item, idx) => {
        return (
          <div key={idx}>
            {item.map((item, idx) => {
              const isWeekend = item[1] === 0 || item[1] === 6 ? true : false;
              const notThisMonth = item.length === 0 ? true : false;
              const clicked = `${year}/${month + 1}/${item[0]}` === `${clickDate}` ? true : false;
              const disabled =
                year === today.getFullYear() && month === today.getMonth() && item[0] < today.getDate() ? true : false;
              const disabledToday =
                year === today.getFullYear() && month === today.getMonth() && item[0] === today.getDate()
                  ? true
                  : false;
              return (
                <span
                  className={clsx(classes.day, {
                    [classes.weekend]: isWeekend,
                    [classes.notThisMonth]: notThisMonth,
                    [classes.clicked]: clicked,
                    [classes.disabledDay]: disabled,
                    [classes.disabledToday]: disabledToday
                  })}
                  key={idx}
                  onClick={() => handleClickDate(item[0], disabled, disabledToday)}
                >
                  {item[0]}
                </span>
              );
            })}
          </div>
        );
      });

      return calendar;
    };

    useEffect(() => {
      if (isShowCalendar) {
        inputRef.current.focus();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShowCalendar]);

    const toggleShowCalendar = () => {
      setShowCalendar(!isShowCalendar);
    };

    return (
      <React.Fragment>
        <p className={classes.label}>日期</p>
        <input
          type="input"
          className={classes.dateInput}
          onClick={toggleShowCalendar}
          ref={inputRef}
          value={clickDate}
          readOnly
        />
        <FormHelperText>請選擇訂位日期!</FormHelperText>
        <div className={clsx(classes.calendarGrid, { [classes.show]: isShowCalendar })}>
          <div className={classes.calendarHeader}>
            <button onClick={handlePrevMonth} disabled={disabledPrev ? true : false}>
              <ArrowLeftRoundedIcon />
            </button>
            <div className={classes.header}>
              <span className={classes.month}>{monthEnName[month]}</span>
              <span>{year}</span>
            </div>
            <button onClick={handleNextMonth} disabled={disabledNext ? true : false}>
              <ArrowRightRoundedIcon />
            </button>
          </div>
          <div className={classes.weekDayDiv}>{createWeekDay()}</div>
          {createCalendar(year, month)}
        </div>
      </React.Fragment>
    );
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
            Reataurant Name..
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} className={classes.paperGrid}>
            <Paper className={classes.paperRoot}>
              <ul className={classes.detailList}>
                <li>
                  <Calendar />
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
                      <MenuItem value={12}>12:00</MenuItem>
                      <MenuItem value={13}>13:00</MenuItem>
                      <MenuItem value={14}>14:00</MenuItem>
                    </Select>
                    <FormHelperText>請選擇訂位時間!</FormHelperText>
                  </FormControl>
                </li>
                <li>
                  <p className={classes.label}>人數</p>
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
                  <textarea
                    name="notes"
                    id=""
                    cols="30"
                    rows="5"
                    className={classes.textArea}
                    onChange={handleChangeNote}
                  ></textarea>
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
                    日期 : <span>{clickDate}</span>
                  </li>
                  <li>
                    時間 : <span>{time ? `${time}:00` : ""}</span>
                  </li>
                  <li>
                    人數 :
                    <span>
                      &nbsp;
                      {adult} 位大人 {children} 位小孩
                    </span>
                  </li>
                  <li>
                    備註 : <span>{notes}</span>
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
