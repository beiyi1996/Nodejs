import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productService from "../services/productService";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";

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

  useEffect(() => {
    if (!restaurant) {
      getRestaurant();
    }
  }, []);

  const getRestaurant = async () => {
    let res = await productService.getAll();
    console.log("app res", res);
    setrestaurant(res);
  };
  console.log("restaurant", restaurant);

  return (
    <Container maxWidth="sm">
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <main className={classes.content}>
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
                        <Link to={`/search?searchKeyWord=${kind}`}>
                          <Button size="small">Learn More</Button>
                        </Link>
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
                        <Badge color="secondary" overlap="circle" className={categoryClasses.badge} badgeContent={<span>{result.category.kind}</span>}></Badge>
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
