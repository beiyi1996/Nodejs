import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
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
  blockTitle: {
    fontFamily: "Microsoft JhengHei",
    color: "#3D405B"
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
    fontFamily: "Microsoft JhengHei",
    color: "#3D405B",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    boxShadow: "1px 5px 15px 0px #DBDCE1"
    // marginLeft: -drawerWidth
  },
  restaurants: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

const categoryStyles = makeStyles({
  randomBlock: {
    display: "flex",
    overflowX: "auto"
  },
  div: {
    padding: "10px 5px 10px",
    "&:hover": {
      cursor: "pointer",
      "& > div > img": {
        opacity: 0.5,
        transition: ".3s ease-in-out"
      }
    }
  },
  badge: {
    position: "absolute",
    top: "12px",
    right: "0",
    width: "100%",
    "& > span > span": {
      fontFamily: "Microsoft JhengHei"
    }
  },
  card: {
    textAlign: "center"
  }
});

function Home() {
  const [restaurant, setrestaurant] = useState(null);
  const classes = useStyles();
  const categoryClasses = categoryStyles();
  const history = useHistory();

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

  const handleClickRestaurant = (_id, name) => {
    console.log("handleClickRestaurant is working!!!");
    // /detail?name=test2&_id=5dc3d5eb4e48673b44ec995b
    history.push(`/detail?name=${name}&_id=${_id}`);
  };

  return (
    <Container maxWidth="sm">
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <main className={classes.content}>
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
              <p>Loading...</p>
            )}
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <h4 className={classes.blockTitle}>猜你喜歡...</h4>
            <Grid item xs={12} className={categoryClasses.randomBlock}>
              {restaurant ? (
                restaurant.randomRestaurants.map(result => {
                  // console.log(12345, result);
                  return (
                    <div
                      key={result._id}
                      className={categoryClasses.div}
                      onClick={() => handleClickRestaurant(result._id, result.name)}
                    >
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
                <p>Loading...</p>
              )}
            </Grid>
          </Grid>
        </main>
      </div>
    </Container>
  );
}

export default Home;
