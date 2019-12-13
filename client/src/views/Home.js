/*jshint esversion: 6 */
import React, { useState, useEffect } from "react";
import productService from "../services/productService";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
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
import AddIcon from "@material-ui/icons/Add";

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
  card: {
    position: "relative"
  },
  cardContent: {
    padding: 0
  },
  item: {
    padding: "10px",
    overflow: "hidden"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 18,
    flexGrow: 1
  },
  pos: {
    marginBottom: 12,
    textAlign: "right",
    position: "absolute",
    right: "10px",
    top: "5px",
    color: "snow",
    fontWeight: "bold",
    fontFamily: "Microsoft JhengHei"
  },
  guessItem: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    marginTop: "5px"
  },
  img: {
    width: "100%",
    height: "100%"
  },
  restaurantName: {
    width: "65%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical"
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
  restaurants: {
    display: "flex",
    flexWrap: "wrap"
  },
  summary: {
    padding: "0 24px 0 16px"
  },
  details: {
    padding: "0"
  },
  list: {
    width: "100%"
  }
}));

const categoryStyles = makeStyles({
  randomBlock: {
    display: "flex",
    overflowX: "auto"
  },
  div: {
    padding: "10px 5px 10px"
  },
  badge: {
    position: "absolute",
    top: "12px",
    right: "0",
    width: "100%"
  },
  card: {
    textAlign: "center"
  }
});

function Home() {
  const [restaurant, setrestaurant] = useState(null);
  const classes = useStyles();
  const categoryClasses = categoryStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openU = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!restaurant) {
      getRestaurant();
    }
  });

  // useEffect(() => {
  //   setData(restaurant);
  // }, [restaurant]);

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
              expandIcon={<AddIcon />}
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
          <Grid item xs={12} className={classes.restaurants}>
            {restaurant ? (
              restaurant.distinctByKind.map((kind, idx) => {
                return (
                  <Grid item xs={6} className={classes.item} key={idx}>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <Typography className={classes.pos} color="textSecondary">
                          {kind}
                        </Typography>
                        <Typography variant="body2" component="p">
                          <img src="http://fakeimg.pl/100x100?font=lobster" alt="" className={classes.img} />
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <p>NONONO KIND</p>
            )}
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <h4>猜你喜歡...</h4>
            <Grid item xs={12} className={categoryClasses.randomBlock}>
              {restaurant ? (
                restaurant.randomRestaurants.map(result => {
                  // console.log(12345, result);
                  return (
                    <div key={result._id} className={categoryClasses.div}>
                      <Card className={categoryClasses.card}>
                        <img src="http://fakeimg.pl/100x100?text=image" alt="" />
                      </Card>
                      <Grid item xs={12} className={classes.guessItem}>
                        <span className={classes.restaurantName}>{result.name}</span>
                        <Badge
                          color="secondary"
                          overlap="circle"
                          className={categoryClasses.badge}
                          badgeContent={<span>{result.category.kind}</span>}
                        ></Badge>
                      </Grid>
                    </div>
                  );
                })
              ) : (
                <p>NONONO</p>
              )}
            </Grid>
          </Grid>
        </main>
      </div>
    </Container>
  );
}

export default Home;
