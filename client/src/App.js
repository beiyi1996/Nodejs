/*jshint esversion: 6 */
import React, { useState, useEffect } from "react";
import productService from "./services/productService";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Header from "./partial/header";

const useStyles = makeStyles({
  "@global": {
    body: {
      margin: "0",
      padding: "0"
    },
    "*::-webkit-scrollbar": {
      width: "4em",
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
    fontFamily: "Microsoft JhengHei",
    padding: "0"
  },
  card: {
    // minWidth: 275
    position: "relative"
  },
  content: {
    padding: "0"
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
    fontSize: 14
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
  }
});

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
  name: {
    "&::before": {
      content: props => `${props}`
    }
  },
  card: {
    textAlign: "center"
  }
});

function App() {
  const [restaurant, setrestaurant] = useState(null);
  const classes = useStyles();
  const categoryClasses = categoryStyles();
  const [headerData, setData] = useState([]);

  useEffect(() => {
    if (!restaurant) {
      getRestaurant();
    }
  });

  useEffect(() => {
    setData(restaurant);
  }, [restaurant]);

  const getRestaurant = async () => {
    let res = await productService.getAll();
    console.log("app res", res);
    setrestaurant(res);
  };
  console.log("restaurant", restaurant);

  return (
    <Container maxWidth="md" className={classes.Container}>
      <Header data={headerData} />
      {restaurant ? (
        restaurant.distinctByKind.map((kind, idx) => {
          return (
            <Grid item xs={6} className={classes.item} key={idx}>
              <Card className={classes.card}>
                <CardContent className={classes.content}>
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
      <Grid item xs={12} className={classes.item}>
        <h4>猜你喜歡...</h4>
        <Grid item xs={12} className={categoryClasses.randomBlock}>
          {restaurant ? (
            restaurant.randomRestaurants.map(result => {
              // console.log(12345, result);
              return (
                <div key={result._id} className={categoryClasses.div}>
                  <Card className={categoryClasses.card}>
                    <img src="http://fakeimg.pl/100x100?text=image" />
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
    </Container>
  );
}

export default App;
