/*jshint esversion: 6 */
import React, { useState, useEffect, useRef } from "react";
import productService from "../services/productService";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import Fade from "@material-ui/core/Fade";

const drawerWidth = 180;

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      margin: "0",
      padding: "0"
    },
    "*::-webkit-scrollbar": {
      width: "0em",
      height: "8px"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(155, 208, 208, .5)",
      outline: "1px solid slategrey",
      borderRadius: "15px"
    }
  },
  Container: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
    fontFamily: "Microsoft JhengHei"
  },
  title: {
    fontSize: 18,
    flexGrow: 1
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
    // marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
    // marginLeft: "105px"
  },
  summary: {
    padding: "0 24px 0 16px"
  },
  details: {
    padding: "0"
  },
  list: {
    width: "100%"
  },
  orderContent: {
    marginTop: 15
  },
  orderTitle: {
    fontFamily: "Microsoft JhengHei"
  },
  button: {
    marginTop: 10,
    textAlign: "right",

    "& > button": {
      fontFamily: "Microsoft JhengHei"
    }
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
  counterTitle: {
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

function OrderDetails() {
  const classes = useStyles();
  const theme = useTheme();
  const [restaurant, setrestaurant] = useState(null);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [time, setTime] = useState("");
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const openU = Boolean(anchorEl);
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [disabledPrev, setDisabledPrev] = useState(true);
  const [disabledNext, setDisabledNext] = useState(false);
  const [isShowCalendar, setShowCalendar] = useState(false);
  const [notes, setNotes] = useState("");
  const [checked, setChecked] = React.useState(false);
  let [clickDate, setClickDate] = useState("");
  const inputRef = useRef(null);
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChangeNote = event => {
    setNotes(event.target.value);
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

  useEffect(() => {
    if (!restaurant) {
      getRestaurant();
    }
  });

  const getRestaurant = async () => {
    let res = await productService.getAll();
    console.log("app res", res);
    setrestaurant(res);
  };
  console.log("restaurant", restaurant);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = event => {
    setTime(event.target.value);
  };

  const Calendar = () => {
    const handlePrevMonth = () => {
      setChecked(true);
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
      setChecked(true);
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
        setChecked(prev => !prev);
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
      setChecked(prev => !prev);
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
          <Fade in={checked}>
            <div>
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
            </div>
          </Fade>
          <div className={classes.weekDayDiv}>{createWeekDay()}</div>
          {createCalendar(year, month)}
        </div>
      </React.Fragment>
    );
  };

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              Gourmand
            </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-list-grow"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-list-grow"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={openU}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>查詢訂單</MenuItem>
                <MenuItem onClick={handleClose}>登出</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<KeyboardArrowDownRoundedIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.summary}
            >
              <Typography className={classes.heading}>餐廳分類</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <List className={classes.list}>
                {restaurant ? (
                  restaurant.distinctByKind.map((kind, idx) => {
                    return (
                      <ListItem button key={idx}>
                        <ListItemText primary={kind} />
                      </ListItem>
                    );
                  })
                ) : (
                  <p>NONONO</p>
                )}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <List>
            {["查看訂單", "首頁", "聯絡我們"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <Grid item xs={12} className={classes.orderContent}>
            <Typography className={classes.orderTitle}>
              <span>訂單編號 : </span>
              <span>_idxxxxxxxxxxxxxxxxx</span>
            </Typography>
            <Typography className={classes.orderTitle}>
              <span>成立訂單 : </span>
              <span>2019/12/31 - 12:00</span>
            </Typography>
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
                      <span className={classes.counterTitle}>大人</span>
                      <div className={classes.btnGroup}>
                        <button onClick={handleClickMinusAdult}>-</button>
                        <input name="adult" type="text" value={adult} readOnly />
                        <button onClick={handleClickPlusAdult}>+</button>
                      </div>
                    </div>
                    <div className={classes.counter}>
                      <span className={classes.counterTitle}>小孩</span>
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
            <Grid item xs={12} className={classes.button}>
              <Button>取消</Button>
              <Button color="primary">儲存</Button>
            </Grid>
          </Grid>
        </main>
      </div>
    </Container>
  );
}

export default OrderDetails;
